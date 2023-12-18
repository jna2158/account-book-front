import { ResponsiveBar } from '@nivo/bar'
import { useEffect, useState } from 'react';

export default function GraphTopTags({ data }) {
  const [list, setList] = useState([]);
  const [loading, setLoding] = useState(false);
	const [graphType, setGraphType] = useState('income_top_ten');

  /* 월 단위 Tag top tags format */
  const topTagFormat = () => {
    setLoding(true);

		if (!data) {
			return;
		}
		const spendingArray = Object.keys(data.spending_top_ten).map(key => ({
			content: key,
			금액: Number(data.spending_top_ten[key])
		}));

		const incomeArray = Object.keys(data.income_top_ten).map(key => ({
			content: key,
			금액: Number(data.income_top_ten[key])
		}));

		const resultObject = {
      income_top_ten: incomeArray,
      spending_top_ten: spendingArray
    };
    setList(resultObject);
    setLoding(true);
  }
  
  useEffect(() => {
    setLoding(true);
    setTimeout(() => {
      topTagFormat();
    }, 100);
  }, []);

	/* Tooltip */
	const customToolTip = (point) => {
		let cell = point;
    let styleValue = {
      width: 'auto',
      maxHeight:'250px',
      color: `${'#ffffff'}`,
      marginBottom: '20px',
      padding: '10px',
      border:`2px solid ${cell.color}`,
      borderRadius : '5px',
      backgroundColor: cell.color
    }
    var fontSize = {fontSize : '12px'}
    return (
      <div style={styleValue}>
        <strong>{cell.data.content}<span style={fontSize}></span></strong>
        <br />
        <strong> {cell.data.금액.toLocaleString()} <span style={fontSize}>원 </span></strong>
        <br />
      </div>
    )
  }

  return (
    <>
			<div className="radio-container">
				<label className="radio-label">
					<input
						type="radio"
						value="income_top_ten"
						checked={graphType === 'income_top_ten'}
						onChange={() => setGraphType('income_top_ten')}
						className="radio-input"
					/>
					수입
				</label>
				<label className="radio-label">
					<input
						type="radio"
						value="spending_top_ten"
						checked={graphType === 'spending_top_ten'}
						onChange={() => setGraphType('spending_top_ten')}
						className="radio-input"
					/>
					지출
				</label>
    	</div>
			{
				list[`${graphType}`] && list[`${graphType}`].length
				? (
					loading && (
						<ResponsiveBar
								data={list[`${graphType}`]}
								keys={[
										'금액'
								]}
								indexBy="content"
								margin={{ top: 50, right: 130, bottom: 70, left: 60 }}
								padding={0.3}
								valueScale={{ type: 'linear' }}
								indexScale={{ type: 'band', round: true }}
								colors={{ scheme: 'pastel2' }}
								defs={[
										{
												id: 'dots',
												type: 'patternDots',
												background: 'inherit',
												color: '#38bcb2',
												size: 4,
												padding: 1,
												stagger: true
										},
										{
												id: 'lines',
												type: 'patternLines',
												background: 'inherit',
												color: '#eed312',
												rotation: -45,
												lineWidth: 6,
												spacing: 10
										}
								]}
								borderColor={{
										from: 'color',
										modifiers: [
												[
														'darker',
														1.6
												]
										]
								}}
								axisTop={null}
								axisRight={null}
								axisBottom={{
										tickSize: 0,
										tickPadding: 5,
										tickRotation: 0,
										legend: null,
										legendPosition: 'middle',
										legendOffset: 32,
										truncateTickAt: 0
								}}
								axisLeft={null}
								labelSkipWidth={12}
								labelSkipHeight={12}
								labelTextColor={{
										from: 'color',
										modifiers: [
												[
														'darker',
														1.6
												]
										]
								}}
								legends={[
										{
												dataFrom: 'keys',
												anchor: 'bottom-right',
												direction: 'column',
												justify: false,
												translateX: 120,
												translateY: 0,
												itemsSpacing: 2,
												itemWidth: 100,
												itemHeight: 20,
												itemDirection: 'left-to-right',
												itemOpacity: 0.85,
												symbolSize: 20,
												effects: [
														{
																on: 'hover',
																style: {
																		itemOpacity: 1
																}
														}
												]
										}
								]}
								tooltip={(cell) => customToolTip(cell)}
								role="application"
								ariaLabel="Nivo bar chart demo"
								barAriaLabel={e=>e.id+": "+e.formattedValue+" in content: "+e.indexValue}
						/>
					)
				)
				: (
					<div>데이터가 없습니다</div>
				)
			}
    </>
  )
}
