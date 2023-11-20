import React, { useEffect, useState } from 'react';
import { useTable } from 'react-table';
import './calendarDetail.css';

export const CalendarDetail = ({setSidebarOpen, date}) => {
  const [data, setData] = useState([
    { id: 0, time: '09', type: '소비', pay: 15000, tag: 'tag', content: 'content'},
    { id: 1, time: '09', type: '소비', pay: 15000, tag: 'tag', content: 'content'},
    { id: 2, time: '09', type: '지출', pay: 15000, tag: 'tag', content: 'content'}
  ]);

  const columns = [
    { Header: '시간', accessor: 'time' },
    { Header: '소비/지출', accessor: 'type' },
    { Header: '금액', accessor: 'pay' },
    { Header: '태그', accessor: 'tag' },
    { Header: '내용', accessor: 'content' },
  ];

  useEffect(() => {
    console.log('useEfdedt');
  }, [data]);

  const addRow = () => {
    setData([
      ...data, {
        id: data.length,
        time: '',
        type: '',
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
    <section className='calendar_detail_section'>
      <i className="fa-solid fa-angles-right" onClick={() => setSidebarOpen(false)}></i>
      <h3>{date}</h3>
      <Table columns={columns} data={data} />
      <button onClick={() => addRow()}>플러스</button>
      <button onClick={() => removeRow(data[data.length - 1].id)}>마이너스</button>
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
    <table {...getTableProps()} style={{ borderCollapse: 'collapse', width: '100%' }}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th
                {...column.getHeaderProps()}
                style={{
                  borderBottom: '2px solid #ddd',
                  background: '#f2f2f2',
                  padding: '8px',
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
          console.log('row >> ');
          console.log(row);
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => (
                <td
                  {...cell.getCellProps()}
                  style={{
                    border: '1px solid #ddd',
                    padding: '8px',
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