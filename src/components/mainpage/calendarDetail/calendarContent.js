import React, { useEffect, useState } from 'react';
import { useTable } from 'react-table';
import './calendarDetail.css';

export default function CalendarContent({date, setCurrentMode}) {
  const data = [
    { id: 0, time: '09', type: '소비', pay: 15000, tag: 'tag', content: 'content'},
    { id: 1, time: '09', type: '소비', pay: 15000, tag: 'tag', content: 'content'},
    { id: 2, time: '09', type: '지출', pay: 15000, tag: 'tag', content: 'content'}
  ];

  const columns = [
    { Header: '시간', accessor: 'time' },
    { Header: '소비/지출', accessor: 'type' },
    { Header: '금액', accessor: 'pay' },
    { Header: '태그', accessor: 'tag' },
    { Header: '내용', accessor: 'content' },
  ];

  return (
    <section className='calendar_content_section'>
      <h3><span>{date}</span> 가계부</h3>
      <Table columns={columns} data={data} />
      <section className='summary_section'>
        <div className='summry_title'>요약</div>
        <div>수입: <span>0000원</span></div>
        <div>지출: <span>0000원</span></div>
        <div>남은 총액: <span>0000원</span></div>
      </section>
      <section className='content_button'>
        <button onClick={() => setCurrentMode('spending')}>오늘의 하루 작성/편집하기</button>
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