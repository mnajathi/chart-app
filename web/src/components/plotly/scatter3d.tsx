'use client';

import React from 'react';
import dynamic from 'next/dynamic';
const Plot = dynamic(() => import('react-plotly.js'), {ssr: false});

interface Scatter3dProps {}

const linspaceFn = (
	startValue: number,
	stopValue: number,
	cardinality: number,
) => {
	var arr = [];
	var step = (stopValue - startValue) / (cardinality - 1);
	for (var i = 0; i < cardinality; i++) {
		arr.push(parseFloat((startValue + step * i).toFixed(3)));
	}
	return arr;
};
const t = linspaceFn(0, 20, 100);
const x = t.map((i) => Math.cos(i));
const y = t.map((i) => Math.sin(i));
const z = t;

const Scatter3d: React.FC<Scatter3dProps> = ({}) => {
	return (
		<Plot
			onClick={(data) => {
				console.log(data.points[0]);
			}}
			layout={{width: 720, height: 480, title: 'Scatter3d'}}
			data={[
				{
					x: x,
					y: y,
					z: z,
					mode: 'markers',
					type: 'scatter3d',
					marker: {
						size: 12,
						color: z,
						colorscale: 'Viridis',
						opacity: 0.8,
					},
				},
			]}
		/>
	);
};

export default Scatter3d;
