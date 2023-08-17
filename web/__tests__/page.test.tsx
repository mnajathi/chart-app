import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

import Card from '@/components/card';

describe('get Card Component title', () => {
	it('renders a heading', () => {
		render(<Card title="Managers Prodoscore" />);

		const heading = screen.getByRole('contentinfo');
		expect(heading).toHaveTextContent('Managers Prodoscore');

		const heading2 = screen.getByText(/Managers Prodoscore/i);
		expect(heading2).toBeInTheDocument();
	});
});
