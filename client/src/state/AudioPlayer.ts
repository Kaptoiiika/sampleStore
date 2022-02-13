import apiClient from "../services/apiClient"
import { makeAutoObservable } from "mobx"

const defaultURL = `/api/play/`

class AudioPlayer {
  audio = new Audio()
  audioId = ""
  isPlay = false
  volume = 0.3

  context = new AudioContext()
  analyser = this.context.createAnalyser()

  constructor() {
    makeAutoObservable(this)

    this.audio.crossOrigin = "anonymous"
    this.audio.volume = this.volume
    this.audio.preload = "auto"
    this.analyser.fftSize = 512
    const src = this.context.createMediaElementSource(this.audio)
    src.connect(this.analyser)
    this.analyser.connect(this.context.destination)
  }

  setAudio(id: string) {
    if (this.audioId === id) return this.play()
    this.pause()
    this.audioId = id
    this.audio.src = `${defaultURL}?id=${id}`
    this.audio.crossOrigin = "anonymous"
    this.audio.volume = this.volume

    this.audio.load()
    this.play()
  }

  setVolume(pwr: number) {
    
    this.volume = pwr
    this.audio.volume = pwr
  }

  play() {
    this.context.resume()

    this.audio.play()
    this.isPlay = true
  }

  pause() {
    this.audio.pause()
    this.isPlay = false
  }

  duration() {
    return this.audio.duration
  }

  currentTime() {
    return this.audio.currentTime
  }
}

export default new AudioPlayer()
