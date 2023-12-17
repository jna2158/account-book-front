import React, { useEffect, useState } from 'react';
import { useTable } from 'react-table';
import './calendarDetail.css';
import axios from 'axios';
import { API_HOST } from '../../../constant';

export default function CalendarContent({date, setCurrentMode, setIsEditMode, editComplete, setEditComplete}) {
  const [data, setData] = useState([]);

  const columns = [
    { Header: '시간', accessor: 'time' },
    { Header: '수입/지출', accessor: 'type' },
    { Header: '금액', accessor: 'pay' },
    { Header: '태그', accessor: 'tag' },
    { Header: '내용', accessor: 'content' },
  ];

  useEffect(() => {
    const apiUrl = `${API_HOST}/api/budget/datedetail/`;
    const requestBody = {
      date: date.date
    }
    axios.get(apiUrl, {
      params: requestBody
    })
    .then(res => {
      setIsEditMode(true);
      setEditComplete(!editComplete);
      // 시간을 원하는 형태로
      let result = res.data;
      result = result.filter(el => (el.income !== "0" && el.spending === "0") || (el.income === "0" && el.spending !== "0"));
      result.forEach(el => {
        el.time = el.time.slice(0, 2);
        if (el.income === "0" && el.spending !== "0") {
          el.type = "지출";
          el.pay = el.spending;
          el.tag = el.tag.join(', ');
        } else if (el.income !== "0" && el.spending === "0") {
          el.type = "수입";
          el.pay = el.income;
          el.tag = el.tag.join(', ');
        }
      })
      setData(result);
    })
    .catch(err => {
      console.log(err);
    })
  }, []);

  return (
    <section className='calendar_content_section'>
      <h3><span>{date.date}</span> 가계부</h3>
      <Table columns={columns} data={data} />
      <section className='summary_section'>
        {
          date && (date.income_summary || date.spending_summary) && (
            <>
              <div>수입: <span>{new Intl.NumberFormat('en-US').format(date.income_summary)} 원</span></div>
              <div>지출: <span>{new Intl.NumberFormat('en-US').format(date.spending_summary)} 원</span></div>
              <div>남은 총액: <span>{new Intl.NumberFormat('en-US').format(date.left_money)} 원</span></div>
            </>
          ) 
        }
        </section>
      <section className='content_button'>
        <button onClick={() => setCurrentMode('spending')}>오늘의 하루 작성 / 편집하기</button>
      </section>
    </section>
  )
}

const Table = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <table className='content_table' {...getTableProps()} style={{ borderCollapse: 'collapse', width: '100%' }}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th
                {...column.getHeaderProps()}
                style={{
                  border: '2px solid #ddd',
                  background: '#f2f2f2',
                  padding: '10px',
                }}
              >
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => (
                <td
                  {...cell.getCellProps()}
                  style={{
                    border: '1px solid #ddd',
                    padding: '10px',
                    textAlign: 'left',
                  }}
                >
                  {cell.render('Cell')}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};