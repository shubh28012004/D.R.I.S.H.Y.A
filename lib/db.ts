import mysql from "mysql2/promise"

const pool = mysql.createPool({
  host: "database-1.cp8meyc8q5hq.ap-south-1.rds.amazonaws.com",
  user: "admin",
  password: "shubh1234",
  database: "drishya",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

export default pool

