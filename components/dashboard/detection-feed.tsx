"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, Play, Pause, RefreshCw, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"
import { Progress } from "@/components/ui/progress"

interface DetectionFeedProps {
  className?: string
}

export default function DetectionFeed({ className }: DetectionFeedProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadedVideo, setUploadedVideo] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  // Add these new state variables and refs at the top of the component
  const [isProcessing, setIsProcessing] = useState(false)
  const [isStreaming, setIsStreaming] = useState(false)
  const [processedFrames, setProcessedFrames] = useState<string[]>([])
  const [currentFrame, setCurrentFrame] = useState<string | null>(null)
  const [detectionCounts, setDetectionCounts] = useState<Record<string, number>>({})
  const wsRef = useRef<WebSocket | null>(null)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const { toast } = useToast()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Check if file is MP4
    if (file.type !== "video/mp4") {
      setError("Only MP4 video format is allowed")
      toast({
        title: "Invalid file format",
        description: "Please upload an MP4 video file",
        variant: "destructive",
      })
      return
    }

    setError(null)
    handleUpload(file)
  }

  const handleUpload = (file: File) => {
    setIsUploading(true)
    setUploadProgress(0)
    setError(null)

    // Create FormData for API upload
    const formData = new FormData()
    formData.append("file", file)

    // Simulate progress while uploading
    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 95) {
          clearInterval(progressInterval)
          return 95
        }
        return prev + 5
      })
    }, 200)

    // Send the video to the API
    fetch("https://9f2b-223-233-82-84.ngrok-free.app/upload_video/", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Upload failed with status: ${response.status}`)
        }
        return response.json()
      })
      .then((data) => {
        clearInterval(progressInterval)
        setUploadProgress(100)

        toast({
          title: "Upload complete",
          description: `${file.name} has been uploaded successfully`,
        })

        // Store the uploaded video info
        setUploadedVideo(URL.createObjectURL(file))

        // Connect to WebSocket for real-time processing
        connectToWebSocket()

        // Fetch detection counts
        fetchDetectionCounts()
      })
      .catch((error) => {
        clearInterval(progressInterval)
        setError(`Upload failed: ${error.message}`)
        setIsUploading(false)

        toast({
          title: "Upload failed",
          description: error.message,
          variant: "destructive",
        })
      })
  }

  const connectToWebSocket = () => {
    // Close existing connection if any
    if (wsRef.current) {
      wsRef.current.close()
    }

    // Create new WebSocket connection
    const connect = () => {
      const ws = new WebSocket("wss://9f2b-223-233-82-84.ngrok-free.app/ws/video_feed")
      wsRef.current = ws

      ws.onopen = () => {
        console.log("WebSocket connection established")
        setIsProcessing(true)
        setError(null)
      }

      ws.onmessage = (event) => {
        // The message contains a base64 encoded image
        const imageData = event.data
        if (imageData === "PROCESSING_COMPLETE") {
          console.log("Video processing completed")
          ws.close()
          setIsStreaming(false)
          fetchDetectionCounts()
          return
        }
        if (typeof imageData === "string" && imageData.startsWith("data:image")) {
          setProcessedFrames((prev) => [...prev, imageData].slice(-30)) // Keep last 30 frames
          setCurrentFrame(imageData)
          setIsProcessing(false)
          setIsStreaming(true)
        }
      }

      ws.onerror = (error) => {
        console.error("WebSocket error:", error)
        setError("Error connecting to video processing server. Retrying...")
        setTimeout(connect, 3000) // Retry after 3 seconds
      }

      ws.onclose = (event) => {
        console.log("WebSocket connection closed", event)
        setIsStreaming(false)
        if (!event.wasClean) {
          setError("WebSocket connection closed unexpectedly. Retrying...")
          setTimeout(connect, 3000) // Retry after 3 seconds
        }
      }
    }

    connect()

    const pingInterval = setInterval(() => {
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.send("ping")
      }
    }, 30000) // Send a ping every 30 seconds

    return () => {
      clearInterval(pingInterval)
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.close()
      }
    }
  }

  const fetchDetectionCounts = () => {
    fetch("https://9f2b-223-233-82-84.ngrok-free.app/detection_counts")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch detection counts: ${response.status}`)
        }
        const contentType = response.headers.get("content-type")
        if (contentType && contentType.includes("application/json")) {
          return response.json()
        } else {
          throw new Error("Invalid response format")
        }
      })
      .then((data) => {
        setDetectionCounts(data)
      })
      .catch((error) => {
        console.error("Error fetching detection counts:", error)
        setError(`Failed to fetch detection counts: ${error.message}`)
      })
  }

  const disconnectWebSocket = () => {
    if (wsRef.current) {
      wsRef.current.close()
      wsRef.current = null
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const file = e.dataTransfer.files?.[0]
    if (!file) return

    if (file.type !== "video/mp4") {
      setError("Only MP4 video format is allowed")
      toast({
        title: "Invalid file format",
        description: "Please upload an MP4 video file",
        variant: "destructive",
      })
      return
    }

    setError(null)
    handleUpload(file)
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const handlePlayPause = () => {
    if (!videoRef.current) return

    if (isPlaying) {
      videoRef.current.pause()
    } else {
      videoRef.current.play()
    }

    setIsPlaying(!isPlaying)
  }

  const resetUpload = () => {
    if (uploadedVideo) {
      URL.revokeObjectURL(uploadedVideo)
    }
    setUploadedVideo(null)
    setIsPlaying(false)
    setIsProcessing(false)
    setIsStreaming(false)
    setProcessedFrames([])
    setCurrentFrame(null)
    setDetectionCounts({})
    disconnectWebSocket()

    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  // Add this useEffect for cleanup when component unmounts
  useEffect(() => {
    return () => {
      if (uploadedVideo) {
        URL.revokeObjectURL(uploadedVideo)
      }
      if (wsRef.current) {
        wsRef.current.close()
      }
    }
  }, [uploadedVideo])

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle>🛡️ VisionGuard: AI-Powered Safety Detection</CardTitle>
          <CardDescription>🚀 Upload an MP4 video and let YOLOv8 do the magic! Our AI-powered system detects:
✅ 🦓 Zebra Crossings – Safer pedestrian navigation!
✅ 🚧 Traffic Symbols – Understand road signs in real time!
✅ 🗑️ Garbage Bins & Overflow – Monitor urban cleanliness!</CardDescription>
        </div>
        {uploadedVideo && (
          <div className="flex space-x-2">
            {isStreaming ? (
              <Button variant="outline" size="icon" onClick={fetchDetectionCounts} title="Refresh detection counts">
                <RefreshCw className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                variant="outline"
                size="icon"
                onClick={handlePlayPause}
                className={isPlaying ? "text-destructive" : "text-primary"}
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
            )}
            <Button variant="outline" size="icon" onClick={resetUpload}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative aspect-video bg-muted flex items-center justify-center">
          {isUploading ? (
            <div className="flex flex-col items-center justify-center p-6 w-full">
              <RefreshCw className="h-8 w-8 animate-spin mb-4 text-primary" />
              <Progress value={uploadProgress} className="w-full max-w-md mb-2" />
              <p className="text-sm text-muted-foreground">Uploading video... {uploadProgress}%</p>
            </div>
          ) : isProcessing ? (
            <div className="flex flex-col items-center justify-center p-6 w-full">
              <RefreshCw className="h-8 w-8 animate-spin mb-4 text-primary" />
              <p className="text-sm text-muted-foreground">Processing video with YOLOv8...</p>
            </div>
          ) : uploadedVideo && isStreaming && currentFrame ? (
            <div className="relative w-full h-full">
              <img
                src={currentFrame || "/placeholder.svg"}
                alt="Processed video frame"
                className="w-full h-full object-contain"
              />
              <div className="absolute top-2 right-2 bg-background/80 p-2 rounded text-xs max-w-[200px] max-h-[200px] overflow-auto">
                <h4 className="font-semibold mb-1">Detections:</h4>
                {Object.keys(detectionCounts).length > 0 ? (
                  <ul className="space-y-1">
                    {Object.entries(detectionCounts).map(([label, count]) => (
                      <li key={label} className="flex justify-between">
                        <span>{label}:</span>
                        <span className="font-medium">{count}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No objects detected</p>
                )}
              </div>
            </div>
          ) : uploadedVideo ? (
            <div className="relative w-full h-full">
              <video
                ref={videoRef}
                src={uploadedVideo}
                className="w-full h-full object-contain"
                controls={false}
                onEnded={() => setIsPlaying(false)}
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <Button onClick={connectToWebSocket} className="bg-primary text-primary-foreground">
                  Start YOLOv8 Processing
                </Button>
              </div>
            </div>
          ) : (
            <div
              className="flex flex-col items-center justify-center p-6 w-full h-full border-2 border-dashed border-muted-foreground/25 rounded-md"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="video/mp4" className="hidden" />
              <Upload className="h-12 w-12 mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">Upload a video for detection</h3>
              <p className="text-sm text-muted-foreground text-center mb-4">
                Drag and drop an MP4 video file here, or click to browse
              </p>
              {error && <p className="text-sm text-destructive mb-4">{error}</p>}
              <Button onClick={triggerFileInput}>
                <Upload className="h-4 w-4 mr-2" />
                Select MP4 Video
              </Button>
            </div>
          )}
          {error && (
            <div className="absolute bottom-2 left-2 right-2 bg-destructive/80 text-destructive-foreground p-2 rounded text-sm">
              {error}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

