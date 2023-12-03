import DatePicker from "react-datepicker";
import Multiselect from "multiselect-react-dropdown";
import { useState } from "react";
import { useEffect } from 'react';
import { API_HOST } from '../../constant';
import axios from 'axios';
import dayjs from 'dayjs';
import "./chart.css";
import 'react-datepicker/dist/react-datepicker.css';
// graph
import GraphRemainByDay from './chartGraph/GraphRemainByDay';
import NoData from "./chartGraph/noData";

export const Chart = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [data, setData] = useState([]);
  const [selectedChart, setSelectedChart] = useState('remainByDay');

  /* 태그 option */
  const state = {
    options: [{name: 'tag1', id: 1}, {name: 'tag2', id: 2}, {name: 'tag3', id: 3}]
  };

  /* Tag */
  const onSelect = (selectedList, selectedItem) => {
    console.log('a');
  }
  /* Tag */
  const onRemove = (selectedList, removedItem) => {
    console.log('a');
  }

  useEffect(() => {
   getChartData();
  }, [startDate, endDate]);

  /* 날짜별로 차트 데이터 가져오기 */
  const getChartData = () => {
    const apiUrl = `${API_HOST}/api/chart/datesummary/`;
    const headers = {
      Authorization : `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
    }
    const requestBody = {
      st_date: dayjs(startDate).format('YYYY-MM-DD'),
      ed_date: dayjs(endDate).format('YYYY-MM-DD')
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
      if (response.length) {
        setData([{
          id: "지원",
          color: "hsl(125, 70%, 50%)",
          data: response
        }]);
      } else {
        setData([]);
      }
    })
    .catch(err => {
      console.log(err);
    })
  }

  return (
    <section className="chart">
      <div className="chart_title">{JSON.parse(localStorage.getItem('user')).nickname}님 ! 이번달 예산은<br /><strong>300,000원</strong> 남았습니다.</div>
      
      <div className="date_select">
        <DatePicker
          className="chart-calendar"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          dateFormat="yyyy-MM-dd"
        />
        ~
        <DatePicker
          className="chart-calendar"
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          dateFormat="yyyy-MM-dd"
        />

        <Multiselect
          options={state.options}
          selectedValues={state.selectedValue}
          onSelect={onSelect()}
          onRemove={onRemove()}
          displayValue="name"
        />
      </div>
      <section className="graph">
        <section className="graph-select">
          <div className="tooltip">
            <div className="circle"></div>
            <span className="tooltiptext tooltip-right">월 단위 남은 재산</span>
          </div>
          <div className="tooltip">
            <div className="circle"></div>
            <span className="tooltiptext tooltip-right">일 단위 남은 재산</span>
          </div>
          <div className="tooltip">
            <div className="circle"></div>
            <span className="tooltiptext tooltip-right">소비가 큰 태그 순위 (상위 10개)</span>
          </div>
          <div className="tooltip">
            <div className="circle"></div>
            <span className="tooltiptext tooltip-right">나의 소비를 태그 %로 표현</span>
          </div>
          <div className="tooltip">
            <div className="circle"></div>
            <span className="tooltiptext tooltip-right">내 나이 또래의 가장 많은 소비 태그</span>
          </div>
          <div className="tooltip">
            <div className="circle"></div>
            <span className="tooltiptext tooltip-right">미정</span>
          </div>
        </section>

        <section className="chart-graph">
        {(() => {
          switch (data.length && selectedChart) {
            case 'remainByDay':
              console.log('case 1');
              console.log(data);
              return <GraphRemainByDay data={data}/>;
            default:
              console.log('case 2');
              console.log(data);
              return <NoData />;
          }
        })()}
        </section>
      </section>
    </section>
  )
}