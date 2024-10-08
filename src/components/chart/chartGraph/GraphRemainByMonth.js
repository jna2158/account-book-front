import { ResponsiveLine } from '@nivo/line';
import { useEffect, useState } from 'react';

export default function GraphRemainByMonth({ data }) {
  const [list, setList] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      remainByMonthFormat();
    }, 100);
  }, [])

  /* Tooltip */
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

  /* 월 단위 남은 재산 data format */
  const remainByMonthFormat = () => {

    for(let idx in data) {
      if (data[idx].hasOwnProperty('date')) {
          data[idx].x = data[idx].date;
          data[idx].y = data[idx].left_money;
          delete data[idx].date;
          delete data[idx].left_money;
      }
    }
    if (data.length) {
      setList([{
        id: JSON.parse(localStorage.getItem('user')).nickname,
        data: data
      }]);
    } else {
      setList([]);
    }
  }
  
  return (
    <ResponsiveLine
    data={list}
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
        legend: '날짜 (월)',
        legendOffset: 36,
        legendPosition: 'middle',
    }}
    axisLeft={null}
    pointSize={10}
    pointColor={{ theme: 'background' }}
    pointBorderWidth={2}
    pointBorderColor={{ from: 'serieColor' }}
    pointLabelYOffset={-12}
    useMesh={true}
    colors={{ scheme: 'accent' }}
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
