import React from 'react';

import Container from '@/components/container';
import CropTime from '@/components/cropTime';

interface PageProps {
	[key: string]: unknown;
}

const Page: React.FC<PageProps> = ({}) => {
	return (
		<Container>
			<CropTime />
		</Container>
	);
};

export default Page;
