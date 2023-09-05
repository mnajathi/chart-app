'use client';

import React from 'react';
import dynamic from 'next/dynamic';
const Plot = dynamic(() => import('react-plotly.js'), {ssr: false});

interface ScatterProps {}

const Scatter: React.FC<ScatterProps> = ({}) => {
	return (
		<Plot
			data={[
				{
					x: [1, 2, 3],
					y: [2, 6, 3],
					type: 'scatter',
					mode: 'lines+markers',
					marker: {color: 'red'},
				},
				{type: 'bar', x: [1, 2, 3], y: [2, 5, 3]},
			]}
			layout={{width: 720, height: 480, title: 'Scatter'}}
		/>
	);
};

export default Scatter;
