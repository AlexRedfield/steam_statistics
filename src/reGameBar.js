import { useStore } from './DataCenter';
import { observer } from 'mobx-react-lite'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import React, { useState, PureComponent } from 'react';
import ReactEcharts from 'echarts-for-react';


const genData = (data)=>{
    const l=[]
    for(let i=0;i<data.length;i++){
        const model={
            id:data[i][0],
            name:data[i][1],
            time:data[i][2]
        }
        l.push(model)
    }
    return l
}

function CustomXAxisLabel (props) {
    console.log(props)
    return (
      <g transform={`translate(${props.x},${props.y})`}>
        <image xlinkHref={
            `https://cdn.cloudflare.steamstatic.com/steam/apps/${props.payload.value}/capsule_sm_120.jpg`
            } x={-100} y={-20} height="31px" width="88px" textAnchor="middle" fill="#666" />
      </g>
    )
  }



const ReHomePage = () => {
    const store = useStore()
    const dataL = store.replayTimeData.data
    const dataP=store.sessionData
    const data= genData(dataL)
    return (
        <BarChart
            width={1200}
            height={600}
            data={data}
            layout="vertical"
            margin={{
                top: 5,
                right: 30,
                left: 100,
                bottom: 5
            }}
            barSize={50}
            barGap={'5%'}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number"/>
            <YAxis  type="category" dataKey="id" 
                interval={0} tick={<CustomXAxisLabel/>}
                />
            <Tooltip />
            <Legend />
            <Bar  cursor={"pointer"} dataKey="time" fill="#8884d8" 
                onClick=  {(data)=> store.sessionData.setSessionList(data['id'])}        
            />
            {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
        </BarChart>
    );
}

export default observer(ReHomePage)