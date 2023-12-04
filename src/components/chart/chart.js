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
import GraphRemainByMonth from "./chartGraph/GraphRemainByMonth";

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
  }, [startDate, endDate, selectedChart]);

  /* 날짜별로 차트 데이터 가져오기 */
  const getChartData = () => {
    console.log('getChartData > ');
    const headers = {
      Authorization : `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
    }

    let apiUrl = '';
    let requestBody = {};

    if (selectedChart === 'remainByDay') {
      apiUrl = `${API_HOST}/api/chart/datesummary/`;
      requestBody = {
        st_date: dayjs(startDate).format('YYYY-MM-DD'),
        ed_date: dayjs(endDate).format('YYYY-MM-DD')
      }
    } else {
      apiUrl = `${API_HOST}/api/chart/monthsummary/`;
      requestBody = {
        st_month: dayjs(startDate).format('YYYY-MM'),
        ed_month: dayjs(endDate).format('YYYY-MM')
      }
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
        {
          selectedChart === 'remainByDay' ?
            <>
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
            </> :
            <>
              <DatePicker
              className="chart-calendar"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="yyyy-MM"
              />
              ~
              <DatePicker
              className="chart-calendar"
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              dateFormat="yyyy-MM"
              />
            </>
        }
        

        <Multiselect
          options={state.options}
          selectedValues={state.selectedValue}
          onSelect={onSelect()}
          onRemove={onRemove()}
          displayValue="name"
        />
      </div>
      <section className="graph">
        <section className="tab-container">
          <div className="tab" data-chart="remainByMonth" onClick={() => setSelectedChart('remainByMonth')}>
            <span className="tab-text">월 단위 남은 재산</span>
          </div>
          <div className="tab" data-chart="remainByDay" onClick={() => setSelectedChart('remainByDay')}>
            <span className="tab-text">일 단위 남은 재산</span>
          </div>
          <div className="tab" data-chart="topTags" onClick={() => setSelectedChart('topTags')}>
            <span className="tab-text">소비가 큰 태그 순위 (상위 10개)</span>
          </div>
          <div className="tab" data-chart="percentage" onClick={() => setSelectedChart('percentage')}>
            <span className="tab-text">나의 소비를 태그 %로 표현</span>
          </div>
        </section>

        <section className="chart-graph">
          {(() => {
            switch (data.length && selectedChart) {
              case 'remainByMonth':
                return <GraphRemainByMonth data={data}/>
              case 'remainByDay':
                return <GraphRemainByDay data={data}/>;
              case 'topTags':
                return
              case 'percentage':
                return
              default:
                return <NoData />;
            }
          })()}
        </section>
      </section>
    </section>
  )
}