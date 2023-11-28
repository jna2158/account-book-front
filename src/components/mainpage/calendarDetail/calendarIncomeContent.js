import React, { useEffect, useState } from 'react';
import { useTable } from 'react-table';
import './calendarDetail.css';
import { API_HOST } from '../../../constant';
import axios from "axios";

export default function CalendarIncomeContent({date, setCurrentMode, spendList, idEditMode}) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const columns = [
    { Header: '시간', accessor: 'time' },
    { Header: '금액', accessor: 'income' },
    { Header: '태그', accessor: 'tag' },
    { Header: '내용', accessor: 'content' },
  ];
  const [tag, setTag] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    const apiUrl = `${API_HOST}/api/budget/datedetail/`;
    const headers = {
      Authorization : `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
    }
    const requestBody = {
      date: date
    }
    axios.get(apiUrl, {
      headers: headers,
      params: requestBody
    })
    .then(res => {
      // 시간을 원하는 형태로
      let result = res.data;
      result = result.filter(el => (el.income !== "0" && el.spending === "0") || (el.income === "0" && el.spending !== "0"));
      result.forEach(el => {
        el.time = Number(el.time.slice(0, 2));
        if (el.income === "0" && el.spending !== "0") {
          el.type = "지출";
          el.pay = el.spending;
        } else if (el.income !== "0" && el.spending === "0") {
          el.type = "수입";
          el.pay = el.income;
        }
      })
      result = result.filter(el => el.type === "수입");
      const tagArr = [];
      result.forEach((el, idx) => {
        el.id = idx;
        tagArr.push(el.tag);
      });

      setTag(tagArr);
      setData(result);
      setIsLoading(false);
    })
    .catch(err => {
      console.log(err);
      setIsLoading(false);
    })
  }, []);

  /** row 한 줄 추가 */
  const addRow = () => {
    setData([
      ...data, {
        id: data.length,
        time: '',
        income: '',
        tag: [],
        content: ''
      }
    ]);
    setTag([
      ...tag,
      []
    ]);
  }

  /** row 한 줄 삭제
   * 
   * @param id 삭제 대상
  */
  const removeRow = (id) => {
    setData(data.filter(el => el.id !== id));
    setTag(tag.filter((el, idx) => idx !== tag.length - 1));
  }

  const btnClick = () => {
    data.forEach((el, idx) => {
      data[idx].tag = tag[idx];
    });
    const result = spendList.concat(data);
    result.forEach(el => {
      el.date = date;
      // el.spending !== "0" ? el.income = "0" : el.spending = "0";
      if (!el.spending) {
        el.spending = "0";
      }
      
      if (!el.income) {
        el.income = "0";
      }

      el.time = Number(el.time);
      delete el.id;
    });

    if (result.length === 0) {
      result.push(
        {
          date: date,   
          tag: [""],
          time: "00",          
          income: "0",    
          spending: "0",       
          content: ""
        });
    }

    saveContent(result);
  }

  const saveContent = (result) => {
    console.log('saveContent >>> ');
    console.log(result);

    const apiUrl = `${API_HOST}/api/budget/datedetail/`;
    const headers = {
      Authorization : `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
    }

    if (idEditMode) {
      axios.put(apiUrl, result, {
        headers
      })
      .then(res => {
        setCurrentMode('content')
      })
      .catch(err => {})
    } else {
      axios.post(apiUrl, result, {
        headers
      })
      .then(res => {
        setCurrentMode('content')
      })
      .catch(err => {})
    }
  }

  return (
    <>
      {
        !isLoading && (
          <>
          <section className='calendar_content_section'>
            <h3><span>{date}</span> 수입 목록</h3>
            <Table columns={columns} data={data} setData={setData} tag={tag} setTag={setTag}/>
            <section className='row_button'>
              <i className="fa-solid fa-circle-plus" onClick={() => addRow()}></i>
              <i className="fa-solid fa-circle-minus" onClick={() => removeRow(data[data.length - 1].id)}></i>
            </section>
          </section>
          <section className='spend_button'>
            <button onClick={() => setCurrentMode('content')}>취소</button>
            <button onClick={() => btnClick()}>저장</button>
          </section>
          </>
        )
      }
    </>
  )
}

const Table = ({ columns, data, setData, tag, setTag }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  /** input 영역에 내용 입력했을 때 */
  const handleChangeContent = (event, cell) => {
    const updatedData = [...data];
    const updatedRow = { ...updatedData[cell.row.index] };
    updatedRow[cell.column.id] = event.target.value;
    updatedData[cell.row.index] = updatedRow;
    setData(updatedData);
  };

  /** 태그 입력하고 enter 눌렀을 때 추가 */
  const handleChangeTagContent = (event, cell) => {
    if (event.key !== 'Enter' || event.target.value.trim() === '') {
      return;
    }
  
    const updatedData = [...data];
    const updatedRow = { ...updatedData[cell.row.index] };
    const indexToUpdate = updatedRow.id;
    const newItem = event.target.value;

    console.log('여기여기 > ');
    console.log(updatedRow);
    console.log(indexToUpdate);

    setTag(prevArr => {
      const newArr = [...prevArr];
      newArr[indexToUpdate] = [...newArr[indexToUpdate], newItem];
      return newArr;
    });
    event.target.value = '';
  };

  const getRandomColor = () => {
    return '#'+Math.floor(Math.random()*16777215).toString(16);
  }

  const [selectedValue, setSelectedValue] = useState('');

  const handleDropdownChange = (event) => {
    setSelectedValue(event.target.value);
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
        {rows.map((row, idx) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td
                  {...cell.getCellProps()}
                  style={{
                    border: '1px solid #ddd',
                    padding: '10px',
                    textAlign: 'left',
                    height: '50px'
                  }}
                >
                  {
                    cell.column.Header === '태그'
                    ? (
                      <>
                        <input disabled={tag[idx] && tag[idx].length >= 5} type="text" className="tag_input" placeholder="입력 후 Enter" onChange={(event) => handleChangeContent(event, cell)} onKeyPress={(event) => handleChangeTagContent(event, cell)}/>
                        <div>
                          {
                            tag[idx] && tag[idx].map((value, key) => <span key={key} className="tag">{value}</span>)
                          }
                        </div>
                      </>
                    )
                    :
                    cell.column.Header === '시간'
                    ? (
                      <select id="dropdown" value={data.time} onChange={(event) => handleChangeContent(event, cell)}>
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                        <option value="13">13</option>
                        <option value="14">14</option>
                        <option value="15">15</option>
                        <option value="16">16</option>
                        <option value="17">17</option>
                        <option value="18">18</option>
                        <option value="19">19</option>
                        <option value="20">20</option>
                        <option value="21">21</option>
                        <option value="22">22</option>
                        <option value="23">23</option>
                      </select>
                    )
                    :  <input type="text" value={cell.value} onChange={(event) => handleChangeContent(event, cell)} />
                  }
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};