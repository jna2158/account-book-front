import ReactCalendar from 'react-calendar';
import { CalendarDetail } from './calendarDetail/calendarDetail';
import 'react-calendar/dist/Calendar.css';
import './calendar.css';
import { useState } from "react"
import moment from 'moment';
import dayjs from 'dayjs';

export const Calendar = () => {
  const [value, onChange] = useState(new Date());
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [date, setDate] = useState(null);

  /** 각 날짜에 들어갈 아이콘 */
  const setContent = () => {
    // const addContent = ({ date }: any) => {
    //  해당 날짜(하루)에 추가할 컨텐츠의 배열
    //  const contents = [];
  
    //   if (dayList.find((day) => day === moment(date).format('YYYY-MM-DD'))) {
    //     contents.push(
    //       <>
    //         {/* <div className="dot"></div> */}
    //         <Image
    //           src="emotion/good.svg"
    //           className="diaryImg"
    //           width="26"
    //           height="26"
    //           alt="today is..."
    //         />
    //       </>
    //     );
    //   }
    //   return <div>{contents}</div>;
    // };
  }

  /** 날짜 클릭 */
  const handleClickDay = (value) => {
    setSidebarOpen(true);
    const formatDate = dayjs(new Date(value)).format('YYYY-MM-DD');
    console.log(formatDate);

    setDate(formatDate);
    console.log(date);
    // onChange(day);
    // console.log(value);

  }


  return (
    <>
      <h3 className="calendar_title"> 환영합니다 로그인을 통해 지출 등록과 차트 분석을 해보세요</h3>
      <div className="calendar">
        <ReactCalendar
          locale='en'
          next2Label={null}
          prev2Label={null}
          formatDay={(locale, date) => moment(date).format('D')}
          showNeighboringMonth={false}
          tileContent={setContent}
          onChange={onChange}
          value={value}
          onClickDay={(value) => handleClickDay(value)}
        />
      </div>

      <section className={`sidebar ${sidebarOpen ? 'open' : 'close'}`}>
        {
          sidebarOpen && <CalendarDetail setSidebarOpen={setSidebarOpen} date={date}/>
        }
      </section>
    </>
  )
}