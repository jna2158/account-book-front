import { ResponsiveBar } from '@nivo/bar'
import { useEffect, useState } from 'react';

export default function GraphTopTags({ data }) {
  console.log('graphTopTags >> ');
  console.log(data);
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
			pay: Number(data.spending_top_ten[key]),
			color: "hsl(67, 70%, 50%)"
		}));

		const incomeArray = Object.keys(data.income_top_ten).map(key => ({
			content: key,
			pay: Number(data.income_top_ten[key]),
			color: "hsl(67, 70%, 50%)"
		}));

		const resultObject = {
      income_top_ten: incomeArray,
      spending_top_ten: spendingArray
    };
		console.log('resultObject >> ');
		console.log(resultObject);
    setList(resultObject);
    setLoding(true);
  }
  
  useEffect(() => {
    setLoding(true);
    setTimeout(() => {
      topTagFormat();
    }, 1000);
  }, []);

  return (
    <>
			<div>
				<label>
					<input
						type="radio"
						value="income_top_ten"
						checked={graphType === 'income_top_ten'}
						onChange={() => setGraphType('income_top_ten')}
					/>
					수입
				</label>
				<label>
					<input
						type="radio"
						value="spending_top_ten"
						checked={graphType === 'spending_top_ten'}
						onChange={() => setGraphType('spending_top_ten')}
					/>
					지출
				</label>
			</div>
			{
				list[`${graphType}`] && list[`${graphType}`].length
				? (
					loading && (
						<ResponsiveBar
								data={list.spending_top_ten}
								keys={[
										'pay'
								]}
								indexBy="content"
								margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
								padding={0.3}
								valueScale={{ type: 'linear' }}
								indexScale={{ type: 'band', round: true }}
								colors={{ scheme: 'nivo' }}
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
										tickSize: 5,
										tickPadding: 5,
										tickRotation: 0,
										legend: 'content',
										legendPosition: 'middle',
										legendOffset: 32,
										truncateTickAt: 0
								}}
								axisLeft={{
										tickSize: 5,
										tickPadding: 5,
										tickRotation: 0,
										legend: 'pay',
										legendPosition: 'middle',
										legendOffset: -40,
										truncateTickAt: 0
								}}
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
