import React from 'react'
import { makeAutoObservable } from 'mobx'
import axios from 'axios'

class SessionData {
  sessionList = []
  constructor() {
    makeAutoObservable(this)
    this.setSessionList()
  }

  setSessionList = async () => {
    const res = await axios.get('http://localhost/session')
    this.sessionList = res.data
  }
}
class PlayTimeData {
  dataL = []
  playTimeList = []
  gameNameList = []
  idList = []

  constructor() {
    makeAutoObservable(this)
    this.setPlayTimeList()
  }

  setPlayTimeList = async () => {
    const res = await axios.get('http://localhost/playtime')
    this.dataL = res.data
    this.gameNameList = res.data[1]
    this.playTimeList = res.data[2]
    this.idList = res.data[0]

  }
}

class RootStore {
  constructor() {
    this.sessionData = new SessionData()
    this.playTimeData = new PlayTimeData()
  }
}
const rootStore = new RootStore()
// context机制的数据查找链  Provider如果找不到 就找createContext方法执行时传入的参数
const context = React.createContext(rootStore)
const useStore = () => React.useContext(context)

export { useStore }