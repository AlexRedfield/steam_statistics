import { useStore } from './DataCenter';
import { observer } from 'mobx-react-lite'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import React from 'react';
import './BarChartWithHover.css'; // 导入样式文件


const genData = (data) => {
    const l = []
    for (let i = 0; i < data.length; i++) {
        const model = {
            id: data[i][0],
            name: data[i][1],
            time: data[i][2] / 60
        }
        l.push(model)
    }
    return l
}


function CustomXAxisLabel(props) {
    return (
        <g transform={`translate(${props.x},${props.y})`}>
            <image xlinkHref={
                `https://cdn.cloudflare.steamstatic.com/steam/apps/${props.payload.value}/capsule_sm_120.jpg`
            } x={-100} y={-20} height="31px" width="88px" textAnchor="middle" fill="#666" />
        </g>
    )
}

var tooltip
const CustomTooltip = ({ active, payload }) => {
    if (!active || !tooltip) return null
    for (const bar of payload)
        if (bar.dataKey === tooltip) {
            const url = `https://cdn.cloudflare.steamstatic.com/steam/apps/${bar.payload.id}/header.jpg`
            const [hour, min] = HourDetail(bar.value)

            return (<div className="custom-tooltip">
                <img src={url} alt="Tooltip" />
                <p className='name'>{bar.payload.name} </p>
                <p className='time'>游玩时间：{hour}小时{min}分钟</p>
            </div>);
        }
    //   <div>{ bar.payload.name }<br/>{ bar.value.toFixed(2) }</div>

    return null
}

// const MinToHour=(min)=>{
//     return  [parseInt(min/60),min%60]
// }

const HourDetail = (hour) => {
    return [Math.floor(hour), parseInt((hour - Math.floor(hour)) * 60)]
}

const ReHomePage = () => {
    const store = useStore()
    const dataL = store.replayTimeData.data
    const data = genData(dataL)
    return (

        <div style={{ maxWidth: "70%", height: 600, paddingLeft: '10%' }}>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={data}
                    layout="vertical"
                    margin={{
                        top: 5,
                        right: 30,
                        left: 100,
                        bottom: 0
                    }}
                    barSize={50}
                    barGap={'5%'}
                    onClick={(e) => { if (e != null) { store.sessionData.setSessionList(e.activePayload[0].payload['id']) } }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="id"
                        interval={0} tick={<CustomXAxisLabel />}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />

                    <Bar cursor={"pointer"} dataKey="time" fill="#8884d8"
                        onClick={(data) => store.sessionData.setSessionList(data['id'])}
                        onMouseOver={() => tooltip = "time"}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>

    );
}

export default observer(ReHomePage)