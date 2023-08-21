import React, { useState } from 'react';
import ReactEcharts from 'echarts-for-react';
import { useStore } from './DataCenter';
import { observer } from 'mobx-react-lite'


const HomePage = () => {
    // const [sales, setSales] = useState([5, 20, 36, 10, 10, 20]);
    // const [stores, setStores] = useState([15, 120, 36, 110, 110, 20]);
    const store = useStore()
    const dataL=store.playTimeData.dataL
    const gameName = store.playTimeData.gameNameList
    const playTime = store.playTimeData.playTimeList
    const gameId = store.playTimeData.idList
debugger
    // 配置对象
    const option = {
        tooltip: {},
        legend: {},
        xAxis: {

        },
        yAxis: {
            data: dataL[1]

        },
        series: [{
            name: "Time",
            type: "bar",
            data: dataL[2],
            legendHoverLink: true,
            backgroundStyle: {

            }
        }]
    }
    return (
        <div>
            {/* <Row gutter={24}>
                <Col span={14}> */}

                <ReactEcharts option={option} />

            {/* </Col>
            </Row> */}
        </div>
    )
}

export default observer(HomePage)