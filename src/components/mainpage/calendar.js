import ReactCalendar from 'react-calendar';
import { CalendarDetail } from './calendarDetail/calendarDetail';
import 'react-calendar/dist/Calendar.css';
import './calendar.css';
import { useEffect, useState } from "react"
import moment from 'moment';
import dayjs from 'dayjs';
import { API_HOST } from '../../constant';
import axios from 'axios';

export const Calendar = () => {
  const [value, onChange] = useState(new Date());
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [date, setDate] = useState(null);
  const [dayList, setDayList] = useState([]);
  const [editComplete, setEditComplete] = useState(false);
  const [activeMonth, setActiveMonth] = useState(new Date().getFullYear() + '-' + (new Date().getMonth() + 1));

  useEffect(() => {
    const apiUrl = `${API_HOST}/api/budget/datesummary/`;
    const headers = {
      Authorization : `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
    }
    const requestBody = {
      date: activeMonth
    }
    axios.get(apiUrl, {
      headers: headers,
      params: requestBody
    })
    .then(res => {
      console.log(res);
      setDayList(res.data);
    })
    .catch(err => {
      console.log(err);
    })
  }, [editComplete, activeMonth]);

  /** 날짜 클릭 */
  const handleClickDay = (value) => {
    setSidebarOpen(true);
    const formatDate = dayjs(new Date(value)).format('YYYY-MM-DD');
    console.log('formatDate');
    console.log(formatDate);
    const item = dayList.find((x) => x.date === formatDate);
    item ? setDate(item) : setDate([ {date: formatDate} ]);
    console.log('item >> ');
    console.log(item);
    // setDate(item);
  }

  const getActiveMonth = (activeStartDate) => {
    const newActiveMonth = moment(activeStartDate).format('YYYY-MM');
    setActiveMonth(newActiveMonth);
  };


  return (
    <>
      {
        localStorage.getItem('user')
        ? <h3 className="calendar_title"> 환영합니다</h3>
        : <h3 className="calendar_title"> 환영합니다 로그인을 통해 지출 등록과 차트 분석을 해보세요</h3>
      }
      <div className="calendar">
        <ReactCalendar
          locale='en'
          next2Label={null}
          prev2Label={null}
          formatDay={(locale, date) => moment(date).format('D')}
          showNeighboringMonth={false}
          tileContent={({ date, view }) => {
            const item = dayList.find((x) => x.date === moment(date).format("YYYY-MM-DD"));
              return item && (
               <>
                 <div>
                  <span className='spending_summry'>
                    지출: <span>{item.spending_summary}</span>
                  </span>
                  <br />
                  <span className='income_summary'>
                   수입: <span>{item.income_summary}</span>
                  </span>
                 </div>
               </>
             );
          }}
          onChange={onChange}
          onClickDay={(event) => handleClickDay(event)}
          onActiveStartDateChange={({ activeStartDate }) => getActiveMonth(activeStartDate)}
          value={value}
        />
      </div>

      <section className={`sidebar ${sidebarOpen ? 'open' : 'close'}`}>
        {
          sidebarOpen && <CalendarDetail setSidebarOpen={setSidebarOpen} date={date} editComplete={editComplete} setEditComplete={setEditComplete}/>
        }
      </section>
    </>
  )
}