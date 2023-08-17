import React from 'react'
import { makeAutoObservable } from 'mobx'
import axios from 'axios'

class SessionData{
    sessionList=[]
    constructor(){
        makeAutoObservable(this)
        this.setSessionList()
    }
    
    setSessionList=async()=>{
        const res= await axios.get('http://localhost/session')
        this.sessionList=res.data
    }
}


class RootStore {
    constructor() {
      this.sessionData = new SessionData()
    }
  }
const rootStore = new RootStore()
// context机制的数据查找链  Provider如果找不到 就找createContext方法执行时传入的参数
const context = React.createContext(rootStore)
const useStore = () => React.useContext(context)

export { useStore }