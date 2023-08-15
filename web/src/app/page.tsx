'use client';

import BarChart from '@/components/Home/BarChart';
import CategorizedScoreTables from '@/components/Home/CategorizedScoreTables';
import Container from '@/components/container';
import Box from '@/components/container/Box';

export default function Home() {
	return (
		<Container>
			<Box className="flex-col">
				<BarChart />
				<CategorizedScoreTables />
			</Box>
		</Container>
	);
}
