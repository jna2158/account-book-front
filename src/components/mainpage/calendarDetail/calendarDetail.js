import React, { useState } from 'react';
import CalendarContent from './calendarContent';
import CalendarSpendingContent from './calendarSpendingContent';
import CalendarIncomeContent from './calendarIncomeContent';
import './calendarDetail.css';

export const CalendarDetail = ({setSidebarOpen, date}) => {
  const [currentMode, setCurrentMode] = useState('content'); // content or spending or income

  return (
    <>
      <i className="fa-solid fa-angles-right" onClick={() => setSidebarOpen(false)}></i>
      {
        currentMode === 'content'
        ? <CalendarContent date={date} setCurrentMode={setCurrentMode}/>
        : currentMode === 'spending'
        ? <CalendarSpendingContent date={date} setCurrentMode={setCurrentMode}/>
        : <CalendarIncomeContent date={date} setCurrentMode={setCurrentMode}/>
      }
    </>
  )
}