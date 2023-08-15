import { makeAutoObservable } from 'mobx'
import axios from 'axios'

class SessionData{
    sessionList=[]
    constructor(){
        makeAutoObservable(this)
    }

    setSessionList=async()=>{
        const res= await axios.get('http://localhost/session')
        this.sessionList=res.data
    }
}
const sessionData=new SessionData()
export default sessionData