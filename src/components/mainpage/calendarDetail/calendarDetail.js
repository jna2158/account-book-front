import React, { useState } from 'react';
import CalendarContent from './calendarContent';
import CalendarSpendingContent from './calendarSpendingContent';
import CalendarIncomeContent from './calendarIncomeContent';
import './calendarDetail.css';

export const CalendarDetail = ({setSidebarOpen, date}) => {
  const [currentMode, setCurrentMode] = useState('content'); // content or spending or income
  const [spendList, setSpendList] = useState([]);

  return (
    <>
      <i className="fa-solid fa-angles-right" onClick={() => setSidebarOpen(false)}></i>
      {
        currentMode === 'content'
        ? <CalendarContent date={date} setCurrentMode={setCurrentMode}/>
        : currentMode === 'spending'
        ? <CalendarSpendingContent date={date} setCurrentMode={setCurrentMode} setSpendList={setSpendList}/>
        : <CalendarIncomeContent date={date} setCurrentMode={setCurrentMode} spendList={spendList}/>
      }
    </>
  )
}