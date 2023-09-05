import Container from '@/components/container';
import Scatter from '@/components/plotly/scatter';
import Scatter3d from '@/components/plotly/scatter3d';

interface PageProps {}

const Page: React.FC<PageProps> = ({}) => {
	return (
		<Container>
			<Scatter />
			<Scatter3d />
		</Container>
	);
};

export default Page;
