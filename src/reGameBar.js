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
function Click(data) {
    console.log(data['id'])
    
}



const ReHomePage = () => {
    const store = useStore()
    const dataL = store.replayTimeData.data
    const data= genData(dataL)
    return (
        <BarChart
            width={1200}
            height={800}
            data={data}
            layout="vertical"
            margin={{
                top: 5,
                right: 30,
                left: 40,
                bottom: 5
            }}
            barSize={50}
            barGap={'5%'}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number"/>
            <YAxis  type="category" dataKey="name" />
            <Tooltip />
            <Legend />
            <Bar  cursor={"pointer"} dataKey="time" fill="#8884d8" 
                        onClick=  {(data)=>Click(data)}        
                        />
            {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
        </BarChart>
    );
}

export default observer(ReHomePage)