import { ResponsiveLine } from '@nivo/line'
import { useEffect } from 'react';
import { API_HOST } from '../../../constant';
import axios from 'axios';
import { useState } from 'react';

export default function GraphRemainByDay({startDate, endDate}) {
  const [data, setData] = useState([]);
  useEffect(() => {
    const apiUrl = `${API_HOST}/api/chart/datesummary/`;
    const headers = {
      Authorization : `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
    }
    const requestBody = {
      st_date: startDate,
      ed_date: endDate
    }
    axios.get(apiUrl, {
      headers: headers,
      params: requestBody
    })
    .then(res => {
      const response = res.data;
      for(let idx in response) {
        if (response[idx].hasOwnProperty('date')) {
            response[idx].x = response[idx].date;
            response[idx].y = response[idx].left_money;
            delete response[idx].date;
            delete response[idx].left_money;
        }
      }
      setData([{
        id: "지원",
        color: "hsl(125, 70%, 50%)",
        data: response
      }]
    );
    })
    .catch(err => {
      console.log(err);
    })
  }, []);
  
  const customToolTip = (point) => {
    let cell = point.point;
    let styleValue = {
      width: 'auto',
      maxHeight:'250px',
      color: `${'#ffffff'}`,
      marginBottom: '20px',
      padding: '10px',
      border:`2px solid ${cell.borderColor}`,
      borderRadius : '5px',
      backgroundColor: cell.borderColor
    }
    var fontSize = {fontSize : '12px'}
    return (
      <div style={styleValue}>
        <strong>{cell.data.x}<span style={fontSize}></span></strong>
        <br />
        <span style={fontSize}>남은 예산 </span>
        <strong> {cell.data.y.toLocaleString()} <span style={fontSize}>원 </span></strong>
        <br />
      </div>
    )
  }
  
  return (
    <ResponsiveLine
    data={data}
    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
    xScale={{ type: 'point' }}
    yScale={{
        type: 'linear',
        min: 'auto',
        max: 'auto',
        stacked: true,
        reverse: false
    }}
    yFormat=" >-.2f"
    axisTop={null}
    axisRight={null}
    axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'date',
        legendOffset: 36,
        legendPosition: 'middle',
    }}
    axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Left Money',
        legendOffset: -40,
        legendPosition: 'middle'
    }}
    pointSize={10}
    pointColor={{ theme: 'background' }}
    pointBorderWidth={2}
    pointBorderColor={{ from: 'serieColor' }}
    pointLabelYOffset={-12}
    useMesh={true}
    legends={[
        {
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: 'left-to-right',
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: 'circle',
            symbolBorderColor: 'rgba(0, 0, 0, .5)',
            effects: [
                {
                    on: 'hover',
                    style: {
                        itemBackground: 'rgba(0, 0, 0, .03)',
                        itemOpacity: 1
                    }
                }
            ]
        }
    ]}
    tooltip={(cell) => customToolTip(cell)}
/> 
  )
  }
