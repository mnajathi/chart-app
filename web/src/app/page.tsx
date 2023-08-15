'use client';

import BarChart from '@/components/home/BarChart';
import CategorizedScoreTables from '@/components/home/categorizedScoreTables';
import Container from '@/components/container';
import Box from '@/components/container/Box';

export default function Home() {
	return (
		<Container>
			<BarChart />
			<CategorizedScoreTables />
		</Container>
	);
}
