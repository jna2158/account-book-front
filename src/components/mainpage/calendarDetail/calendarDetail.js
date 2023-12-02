import React, { useState } from 'react';
import CalendarContent from './calendarContent';
import CalendarSpendingContent from './calendarSpendingContent';
import CalendarIncomeContent from './calendarIncomeContent';
import './calendarDetail.css';

export const CalendarDetail = ({setSidebarOpen, date, editComplete, setEditComplete}) => {
  const [currentMode, setCurrentMode] = useState('content'); // content or spending or income
  const [spendList, setSpendList] = useState([]);
  const [idEditMode, setIsEditMode] = useState(false);

  return (
    <>
      <i className="fa-solid fa-angles-right" onClick={() => setSidebarOpen(false)}></i>
      {
        currentMode === 'content'
        ? <CalendarContent date={date} setCurrentMode={setCurrentMode} setIsEditMode={setIsEditMode} setEditComplete={setEditComplete} editComplete={editComplete}/>
        : currentMode === 'spending'
        ? <CalendarSpendingContent date={date.date} setCurrentMode={setCurrentMode} setSpendList={setSpendList}/>
        : <CalendarIncomeContent date={date.date} setCurrentMode={setCurrentMode} spendList={spendList} idEditMode={idEditMode}/>
      }
    </>
  )
}