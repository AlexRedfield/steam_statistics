import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import ReactTooltip from 'react-tooltip';
import './App.css';

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
      count: Math.floor(Math.random() * 10), // Generating a random count for demonstration purposes
      detail: `Details for ${formattedDate}`, // You can customize this as needed
    };
    data.push(dataObj);

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return data;
};

const data = generateDataForYear(2023);

data.push({ date: '2023-08-04', count: 0, detail: 'Details for 2023-08-03' });

const CalendarApp = () => {
    const handleCellClick = (value) => {
        if (value) {
          alert(`Date: ${value.date}\nCount: ${value.count}\nDetails: ${value.detail}`);
        }
      };

      const customTooltip = (value) => {
        if (value) {
          return (
            <div>
              <p>Date: {value.date}</p>
              <p>Count: {value.count}</p>
            </div>
          );
        }
        return null;
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
      <h1>Github Activity</h1>
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