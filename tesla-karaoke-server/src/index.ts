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
  socket.on("room_id", (data) => {
    socket.on(data, (data) => {
      console.log(data + "이게 찐")
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

  //* 클라이언트로부터 메시지 수신
  socket.on("reply", (data) => {
    // reply라는 이벤트로 송신오면 메세지가 data인수에 담김
    console.log(data + "잘 " + "받았습니다.")
  })

  //* 클라이언트로 메세지 송신
  socket.emit("news", "Hello Socket.IO") // news라는 이벤트로 문자열을 포함하여 송신
})
