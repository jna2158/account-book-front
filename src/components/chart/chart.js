import DatePicker from "react-datepicker";
import Multiselect from "multiselect-react-dropdown";
import { useState } from "react";
import "./chart.css";
import 'react-datepicker/dist/react-datepicker.css';
import GraphRemainByDay from './chartGraph/GraphRemainByDay';

export const Chart = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const state = {
    options: [{name: 'tag1', id: 1}, {name: 'tag2', id: 2}, {name: 'tag3', id: 3}]
  };

  const onSelect = (selectedList, selectedItem) => {
    console.log('a');
  }
  const onRemove = (selectedList, removedItem) => {
    console.log('a');
  }


  return (
    <section className="chart">
      <div className="chart_title">지원님 ! 이번달 예산은<br /><strong>300,000원</strong> 남았습니다.</div>
      
      <div className="date_select">
        <DatePicker
          className="chart-calendar"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          dateFormat="yyyy-MM-dd"
        />
        ~
        <DatePicker
          className="chart-calendar"
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          dateFormat="yyyy-MM-dd"
        />

        <Multiselect
          options={state.options}
          selectedValues={state.selectedValue}
          onSelect={onSelect()}
          onRemove={onRemove()}
          displayValue="name"
        />
      </div>
      <section className="graph">
        <section className="graph-select">
          <div className="tooltip">
            <div className="circle"></div>
            <span className="tooltiptext tooltip-right">월 단위 남은 재산</span>
          </div>
          <div className="tooltip">
            <div className="circle"></div>
            <span className="tooltiptext tooltip-right">일 단위 남은 재산</span>
          </div>
          <div className="tooltip">
            <div className="circle"></div>
            <span className="tooltiptext tooltip-right">소비가 큰 태그 순위 (상위 10개)</span>
          </div>
          <div className="tooltip">
            <div className="circle"></div>
            <span className="tooltiptext tooltip-right">나의 소비를 태그 %로 표현</span>
          </div>
          <div className="tooltip">
            <div className="circle"></div>
            <span className="tooltiptext tooltip-right">내 나이 또래의 가장 많은 소비 태그</span>
          </div>
          <div className="tooltip">
            <div className="circle"></div>
            <span className="tooltiptext tooltip-right">미정</span>
          </div>
        </section>

        <section className="chart-graph">
          <GraphRemainByDay startDate={startDate} endDate={endDate}/>
        </section>
      </section>
    </section>
  )
}