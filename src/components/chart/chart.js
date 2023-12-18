import DatePicker from "react-datepicker";
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
import Toast from "../toast/toast";

export const Chart = () => {
  const [startDate, setStartDate] = useState(new Date(new Date().setMonth(new Date().getMonth() - 3)));
  const [endDate, setEndDate] = useState(new Date());
  const [data, setData] = useState([]);
  const [selectedChart, setSelectedChart] = useState('remainByMonth');
  const [loading, setLoading] = useState(false);

  const [showToast, setShowToast] = useState(false);
  const [toastError, setToastError] = useState('');

  useEffect(() => {
    setLoading(true);
    getChartData();
  }, [startDate, endDate, selectedChart]);

  /* 날짜별로 차트 데이터 가져오기 */
  const getChartData = () => {
    setLoading(true);
    const headers = {}

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
      setLoading(false);
    })
    .catch(err => {
      if (err.response.data[0]) {
        setToastError(err.response.data[0]);
        setShowToast(true);
      }
      setLoading(false);
    })
  }

  const handleCloseToast = () => {
    setShowToast(false);
  };

  return (
    <section className="chart">
      <div className="chart_title">
        {JSON.parse(localStorage.getItem('user')).nickname}님 !
        <br />
        이번달 예산은 <strong>300,000원</strong> 남았습니다.
      </div>
      
      <div className="date_select">
        {
          selectedChart === 'remainByDay' ?
            <>
              <div className="date-label">
                <label>시작 날짜</label>
                <div className="date-picker-container">
                  <DatePicker
                    className="chart-calendar"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    dateFormat="yyyy-MM-dd"
                  />
                </div>
              </div>
              
              <div className="date-label">
                <label>끝나는 날짜</label>
                <div className="date-picker-container">
                  <DatePicker
                    className="chart-calendar"
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    dateFormat="yyyy-MM-dd"
                  />
                </div>
              </div>
            </> :
            <>
              <div className="date-label">
                <label>시작 날짜</label>
                <div className="date-picker-container">
                  <DatePicker
                    className="chart-calendar"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    dateFormat="yyyy-MM"
                  />
                </div>
              </div>
              
              <div className="date-label">
                <label>끝나는 날짜</label>
                <div className="date-picker-container">
                  <DatePicker
                    className="chart-calendar"
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    dateFormat="yyyy-MM"
                  />
                </div>
              </div>
            </>
        }
      </div>

      <section className="graph">
        <section className="tab-container">
          <div className="tab" onClick={() => setSelectedChart('remainByMonth')}>
            <span className="tab-text">월 단위 남은 예산</span>
          </div>
          <div className="tab" onClick={() => setSelectedChart('remainByDay')}>
            <span className="tab-text">일 단위 남은 예산</span>
          </div>
          <div className="tab" onClick={() => setSelectedChart('topTags')}>
            <span className="tab-text">태그 별 지출 금액</span>
          </div>
          <div className="tab" onClick={() => setSelectedChart('topPercentage')}>
            <span className="tab-text">태그 별 지출 비율</span>
          </div>
        </section>

        <section className="chart-graph">
          {
            loading ? (
              <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading...</p>
              </div>
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
      { showToast && <Toast message={toastError} onClose={handleCloseToast}/>}
    </section>
  )
}