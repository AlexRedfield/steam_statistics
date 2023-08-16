import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import ReactTooltip from 'react-tooltip';
import './App.css';
import SessionData from './DataCenter'
import { useEffect, useRef } from 'react'
import axios from 'axios'
const data1 = [
    { date: '2023-08-01', count: 5, detail: 'Details for 2023-08-01' },
    { date: '2023-08-02', count: 3, detail: 'Details for 2023-08-02' },
    { date: '2023-08-03', count: 0, detail: 'Details for 2023-08-03' },
  // Add more data here
];


const generateDataForYear = (year) => {
  const startDate = new Date(year, 0, 1);
  const endDate = new Date(year, 11, 31);
  const data = [];

  let currentDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 1);
  while (currentDate <= endDate) {
    const formattedDate = currentDate.toISOString().split('T')[0];
    const dataObj = {
      date: formattedDate,
      //count: Math.floor(Math.random() * 10), // Generating a random count for demonstration purposes
      count: 1,
      detail: `Details for ${formattedDate}`, // You can customize this as needed
    };
    data.push(dataObj);

    currentDate.setDate(currentDate.getDate() + 1);
  }
  return data;
};



const processData=(ori,raw)=>{

  let data=ori
  for(var i = 0; i < raw.length; i++){
    const dataObj = {
      date: raw[i][2].split(' ')[0],
      count:  raw[i][4], // Generating a random count for demonstration purposes
      detail: raw[i][1], // You can customize this as needed
    };
    data.push(dataObj);
  }
  console.log(raw.length)
  
  return data

}
//const data=generateDataForYear(2023)





const CalendarApp = () => {
  const [data, setData] = React.useState(generateDataForYear(2023));
  const [txt, setTxt] = React.useState('abc');
  // useEffect(()=>{
  //   const fetchData =async () => {
  //     const result = await axios(
  //       'http://localhost/session',
  //     );

  //     setData(processData(data,result.data));
  //     setTxt('after');
  //     //debugger
  //     console.log(data)
  // };
  // fetchData();
  // }, []);
  useEffect(() => {
    axios.get('http://localhost/session').then((response) => {
      setData(processData(data,response.data));
      setTxt('after');
    });
  }, []);
  data.push({ date: '2023-08-01', count: 5, detail: 'xxxx' })


    const handleCellClick = (value) => {

        if (value) {
          alert(`Date: ${value.date}\nCount: ${value.count}\nDetails: ${value.detail}`);
        }
      };

      
  const tooltipDataAttrs = (value) => {
  
    if (value.date) {
      return {
        'data-tip': `Date: ${value.date}\nCount: ${value.count}`,
      };
    }
    return{
        'data-tip': `Date: ${value.date}`,

    }
  };


  return (
    <div className="CalendarApp">
      <h1>'abc'</h1>
      <div className="heatmap-container">
        <CalendarHeatmap
          startDate={new Date('2022-12-31')}
          endDate={new Date('2023-12-31')}
          values={data}
          tooltipDataAttrs={tooltipDataAttrs}
          onClick={handleCellClick} // Add onClick handler to handle cell click
        
          showWeekdayLabels={true}
          showOutOfRangeDays={false}
          showMonthLabels={true}
          horizontal={true}
          color="YlOrRd"
          classForValue={(value) => {

            if (!value||value.count===0) {
              return 'color-empty';
            }
            else if (value.count<=3) {
              return `color-scale-1`;
            }
            else if (value.count<=5) {
              return `color-scale-3`;
            }
            
            return `color-scale-5`;
          }}
        />
      </div>
      <ReactTooltip multiline={true} />   
    </div>
  );
};

export default CalendarApp;
