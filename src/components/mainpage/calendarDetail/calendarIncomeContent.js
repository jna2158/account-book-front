import React, { useEffect, useState } from 'react';
import { useTable } from 'react-table';
import './calendarDetail.css';

export default function CalendarIncomeContent({date, setCurrentMode}) {

  const [data, setData] = useState([
    { id: 0, time: '01', pay: 35000, tag: 'tag___', content: 'content___'},
    { id: 1, time: '01', pay: 35000, tag: 'tag___', content: 'content___'},
    { id: 2, time: '01', pay: 35000, tag: 'tag___', content: 'content___'},
    { id: 3, time: '01', pay: 35000, tag: 'tag___', content: 'content___'},
    { id: 4, time: '01', pay: 35000, tag: 'tag___', content: 'content___'}
  ]);

  const columns = [
    { Header: '시간', accessor: 'time' },
    { Header: '금액', accessor: 'pay' },
    { Header: '태그', accessor: 'tag' },
    { Header: '내용', accessor: 'content' },
  ];

  const addRow = () => {
    setData([
      ...data, {
        id: data.length,
        time: '',
        pay: '',
        tag: '',
        content: ''
      }
    ]);
  }

  const removeRow = (id) => {
    setData(data.filter(el => el.id !== id));
  }

  return (
    <>
      <section className='calendar_content_section'>
        <h3><span>{date}</span> 수입 목록</h3>
        <Table columns={columns} data={data} setData={setData}/>
        <section className='row_button'>
          <i class="fa-solid fa-circle-plus" onClick={() => addRow()}></i>
          <i class="fa-solid fa-circle-minus" onClick={() => removeRow(data[data.length - 1].id)}></i>
        </section>
      </section>
      <section className='spend_button'>
        <button onClick={() => setCurrentMode('spending')}>이전</button>
        <button onClick={() => setCurrentMode('income')}>다음 (수입 작성하기)</button>
      </section>
    </>
  )
}

const Table = ({ columns, data, setData }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  const handleChangeContent = (event, cell) => {
    const updatedData = [...data];
    const updatedRow = { ...updatedData[cell.row.index] };
    updatedRow[cell.column.id] = event.target.value;
    updatedData[cell.row.index] = updatedRow;
    setData(updatedData);
  };

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
                    height: '45px'
                  }}
                >
                  <input type="text" value={cell.value} onChange={(event) => handleChangeContent(event, cell)} />
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};