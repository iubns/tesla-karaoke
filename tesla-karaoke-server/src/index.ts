import express from "express"
import { Server } from "socket.io"
import cors from "cors"

const app = express()
const port = 3500
app.use(cors())

const server = app.listen(port, async () => {
  console.log("start server")
})

app.get("/", (req, res) => {
  res.send(Math.random().toString(36).substr(2, 11))
})

const io = new Server(server)
io.on("connection", (socket) => {
  console.log("a user connected")
})

//* 웹소켓 연결 시
io.on("connection", (socket) => {
  socket.on("room_id", (room_id) => {
    console.log(room_id)
    socket.on(room_id, (data) => {
      io.emit(room_id, data)
    })
  })

  //* 연결 종료 시
  socket.on("disconnect", () => {
    console.log("클라이언트 접속 해제", socket.id)
  })

  //* 에러 시
  socket.on("error", (error) => {
    console.error(error)
  })
})
