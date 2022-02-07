import apiClient from "../services/apiClient"
import { makeAutoObservable } from "mobx"

const defaultURL = `http://${window.location.hostname}:3030/api/play/`
class AudioPlayer {
  audio = new Audio()
  audioSRC = ""
  isPlay = false
  volume = 0.5

  constructor() {
    makeAutoObservable(this)
  }

  setAudio(id: string) {
    this.audioSRC = id
    this.audio.src = `${defaultURL}?id=${id}`
    this.audio.volume = this.volume
    this.play()
  }
  setVolume(pwr: number) {
    this.volume = pwr
    this.audio.volume = pwr
  }

  play() {
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
