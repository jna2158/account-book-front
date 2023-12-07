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
import GraphTopPercentage from "./chartGraph/GraphTopPercentage";
import GraphTopTags from "./chartGraph/GraphTopTags";

export const Chart = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [data, setData] = useState([]);
  const [selectedChart, setSelectedChart] = useState('remainByDay');
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    getChartData();
  }, [startDate, endDate, selectedChart]);


  /* 일 단위 남은 재산 data format */
  const remainByDayFormat = (response) => {
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
  }

  /* 월 단위 Tag top ten % data format */
  const topPercentageFormat = (response ) => {
    const spendingArray = Object.entries(response.spending_top_ten).map(([id, value], index) => ({
      id,
      label: id,
      value,
      color: `hsl(191, 70%, 50%)`
    }));

    const incomeArray = Object.entries(response.income_top_ten).map(([id, value], index) => ({
      id,
      label: id,
      value,
      color: `hsl(191, 70%, 50%)`
    }));
    
    // 결과 객체 생성
    const resultObject = {
      income_top_ten: incomeArray,
      spending_top_ten: spendingArray
    };
    setData(resultObject);
  }


  /* 날짜별로 차트 데이터 가져오기 */
  const getChartData = () => {
    setLoading(true);
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
    }
    
    if (selectedChart === 'topPercentage' || selectedChart === 'topTags') {
      apiUrl = `${API_HOST}/api/chart/tagtopten/`;
      requestBody = {
        st_month: dayjs(startDate).format('YYYY-MM'),
        ed_month: dayjs(endDate).format('YYYY-MM')
      }
      headers.chart_datatype = 'percent';

      if (selectedChart === 'topTags') {
        headers.chartDataType = 'integer';
      }
    }
    
    if (selectedChart === 'remainByMonth') {
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
      setData(res.data);
      console.log('res.data >>>>');
      console.log(res.data);
      setLoading(false);
    })
    .catch(err => {
      console.log(err);
      setLoading(false);
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
          <div className="tab" data-chart="topPercentage" onClick={() => setSelectedChart('topPercentage')}>
            <span className="tab-text">나의 소비를 태그 %로 표현</span>
          </div>
        </section>

        <section className="chart-graph">
          {
            loading ? (
              <div>loading...</div>
            ) : (
              <>
                {(() => {
                  switch ((data.length || Object.keys(data).length) && selectedChart) {
                    case 'remainByMonth':
                      return <GraphRemainByMonth data={data}/>
                    case 'remainByDay':
                      return <GraphRemainByDay data={data}/>;
                    case 'topTags':
                      return <GraphTopTags data={data}/>
                    case 'topPercentage':
                      return <GraphTopPercentage data={data}/>;
                    default:
                      return <NoData />
                  }
                })()}
              </>
            )
          }
        </section>
      </section>
    </section>
  )
}