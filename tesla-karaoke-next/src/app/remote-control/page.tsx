"use client"

import { useSearchParams } from "next/navigation"
import { useEffect } from "react"

let roomId
export default function RemoteControlPage() {
  const params = useSearchParams()

  useEffect(() => {
    roomId = params.get("room_id")
    console.log(roomId)
    socket.emit("room_id", roomId)
  }, [])

  function addMusic() {
    const data = { type: "add_music", data: "2apr6E9iOWw" }
    socket.emit(roomId, data)
  }

  return (
    <div>
      <h1>Remote Control Page</h1>
      <button onClick={addMusic}>Add Music</button>
    </div>
  )
}
