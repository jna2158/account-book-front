import { ResponsivePie } from '@nivo/pie';
import { useEffect, useState } from 'react';

export default function GraphTopPercentage({ data }) {
  console.log('graphTopPercentage >> ');
  console.log(data);
  const [list, setList] = useState([]);
  const [loading, setLoding] = useState(false);
	const [graphType, setGraphType] = useState('income_top_ten');

  /* 월 단위 Tag top ten % data format */
  const topPercentageFormat = () => {
    setLoding(true);
    const spendingArray = Object.entries(data.spending_top_ten).map(([id, value], index) => ({
      id,
      label: id,
      value,
      color: `hsl(191, 70%, 50%)`
    }));
  
    const incomeArray = Object.entries(data.income_top_ten).map(([id, value], index) => ({
      id,
      label: id,
      value,
      color: `hsl(191, 70%, 50%)`
    }));
    
    // 결과 객체 생성
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
      topPercentageFormat();
    }, 100);
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
						<ResponsivePie
							data={list[`${graphType}`]}
							margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
							innerRadius={0.5}
							padAngle={0.7}
							cornerRadius={3}
							activeOuterRadiusOffset={8}
							borderWidth={1}
							borderColor={{
									from: 'color',
									modifiers: [
											[
													'darker',
													0.2
											]
									]
							}}
							arcLinkLabelsSkipAngle={10}
							arcLinkLabelsTextColor="#333333"
							arcLinkLabelsThickness={2}
							arcLinkLabelsColor={{ from: 'color' }}
							arcLabelsSkipAngle={10}
							arcLabelsTextColor={{
									from: 'color',
									modifiers: [
											[
													'darker',
													2
											]
									]
							}}
							defs={[
									{
											id: 'dots',
											type: 'patternDots',
											background: 'inherit',
											color: 'rgba(255, 255, 255, 0.3)',
											size: 4,
											padding: 1,
											stagger: true
									},
									{
											id: 'lines',
											type: 'patternLines',
											background: 'inherit',
											color: 'rgba(255, 255, 255, 0.3)',
											rotation: -45,
											lineWidth: 6,
											spacing: 10
									}
							]}
							fill={[
									{
											match: {
													id: 'ruby'
											},
											id: 'dots'
									},
									{
											match: {
													id: 'c'
											},
											id: 'dots'
									},
									{
											match: {
													id: 'go'
											},
											id: 'dots'
									},
									{
											match: {
													id: 'python'
											},
											id: 'dots'
									},
									{
											match: {
													id: 'scala'
											},
											id: 'lines'
									},
									{
											match: {
													id: 'lisp'
											},
											id: 'lines'
									},
									{
											match: {
													id: 'elixir'
											},
											id: 'lines'
									},
									{
											match: {
													id: 'javascript'
											},
											id: 'lines'
									}
							]}
							legends={[
									{
											anchor: 'bottom',
											direction: 'row',
											justify: false,
											translateX: 0,
											translateY: 56,
											itemsSpacing: 0,
											itemWidth: 100,
											itemHeight: 18,
											itemTextColor: '#999',
											itemDirection: 'left-to-right',
											itemOpacity: 1,
											symbolSize: 18,
											symbolShape: 'circle',
											effects: [
													{
															on: 'hover',
															style: {
																	itemTextColor: '#000'
															}
													}
											]
									}
							]}
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
