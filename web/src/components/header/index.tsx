import Link from 'next/link';
import Image from 'next/image';

import DateRangeFilter from './DateRangeFilter';
import DropDown from './DropDown';

type HeaderProps = Record<string, any>;

const Header: React.FC<HeaderProps> = () => (
	<header className="bg-gray-100 py-3 shadow-md">
		<div className="container mx-auto flex justify-between items-center">
			<div className="flex items-center space-x-6">
				<Link href="/" className="text-dark text-lg font-semibold">
					<Image
						src="https://qa02.prv-prodoscore.com/static/img/prodoscore.png"
						alt="Your Logo"
						width={30}
						height={30}
					/>
				</Link>

				<DateRangeFilter />
			</div>
			<DropDown />
		</div>
	</header>
);

export default Header;
