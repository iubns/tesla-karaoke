"use client"

import axios from "axios"
import { useEffect, useRef } from "react"

export default function Home() {
  const player = useRef<YT.Player | null>(null)
  const roomId = useRef<string | null>(null)

  useEffect(() => {
    loadYoutubeApi()
    getRoomId()
  }, [])

  function getRoomId() {
    axios.get("http://localhost:3500").then((res) => {
      socket.emit("room_id", res.data)
      roomId.current = res.data
    })
  }

  function loadYoutubeApi() {
    const tag = document.createElement("script")
    tag.src = "https://www.youtube.com/player_api"
    const firstScriptTag = document.getElementsByTagName("script")[0]
    if (!firstScriptTag.parentNode) {
      return
    }
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
    function onYouTubePlayerAPIReady() {
      player.current = new YT.Player("ytplayer", {
        height: "360",
        width: "640",
        videoId: "M7lc1UVf-VE",
      })
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    global.onYouTubePlayerAPIReady = onYouTubePlayerAPIReady
    // 2. get player.playerInfo.currentTime
    window.onclick = () => {
      socket.emit(roomId.current, player.current?.playerInfo?.currentTime)
      socket.emit("reply", player.current?.playerInfo?.currentTime)
      player.current?.playVideo()
      player.current?.loadVideoById("AycijooNahI")
    }
  }
  return (
    <div>
      <div id="ytplayer"></div>
    </div>
  )
}
