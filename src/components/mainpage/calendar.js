import ReactCalendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calendar.css';
import { useState } from "react"
import moment from 'moment';

export const Calendar = () => {
  const [value, onChange] = useState(new Date());

  /**
   * 각 날짜에 들어갈 아이콘
   */
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


  return (
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
      />
    </div>
  )
}