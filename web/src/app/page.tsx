'use client';

import BarChart from '@/components/home/BarChart';
import CategorizedScoreTables from '@/components/home/categorizedScoreTables';
import Container from '@/components/container';

export default function Home() {
	return (
		<Container>
			<BarChart />
			<CategorizedScoreTables />
		</Container>
	);
}
