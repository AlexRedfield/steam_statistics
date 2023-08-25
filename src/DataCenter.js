import React from 'react'
import { makeAutoObservable, runInAction } from 'mobx'
import axios from 'axios'

class SessionData {
  sessionList = []
  constructor() {
    makeAutoObservable(this)
    this.setSessionList()
  }


  setSessionList(id) {
    const url = id == undefined ? 'http://localhost/session' : `http://localhost/session?id=${id}`
    axios.get(url).then((response) => {
      runInAction(() => {
        this.sessionList = response.data
      })
    })
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

    runInAction(() => {
      this.dataL = res.data.slice()
      this.gameNameList = res.data[1]
      this.playTimeList = res.data[2]
      this.idList = res.data[0]
    })
  }
}

class RePlayTimeData {
  data = []
  constructor() {
    makeAutoObservable(this)
    this.setDataList()
  }

  setDataList = async () => {
    const res = await axios.get('http://localhost/re_playtime')
    runInAction(() => {
      this.data = res.data
    })
  }
}

class RootStore {
  constructor() {
    this.sessionData = new SessionData()
    this.playTimeData = new PlayTimeData()
    this.replayTimeData = new RePlayTimeData()
  }
}
const rootStore = new RootStore()
// context机制的数据查找链  Provider如果找不到 就找createContext方法执行时传入的参数
const context = React.createContext(rootStore)
const useStore = () => React.useContext(context)

export { useStore }