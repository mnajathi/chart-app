'use client';

import {useState} from 'react';

import ContextMenuItem from './ContextMenuItem';

export type ItemType = {
	title: string;
	onClick: () => void;
};

type ContextMenuProps = {
	children: React.ReactNode;
	items: ItemType[];
};

const ContextMenu: React.FC<ContextMenuProps> = ({children, items}) => {
	const [contextMenuPos, setContextMenuPos] = useState({x: 0, y: 0});
	const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);

	const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
		e.preventDefault();
		setContextMenuPos({x: e.clientX, y: e.clientY});
		setIsContextMenuOpen(true);
	};

	const closeContextMenu = () => {
		setIsContextMenuOpen(false);
	};

	return (
		<div onContextMenu={handleContextMenu}>
			{children}
			{isContextMenuOpen && (
				<ContextMenuItem
					x={contextMenuPos.x}
					y={contextMenuPos.y}
					onClose={closeContextMenu}
					items={items}
				/>
			)}
		</div>
	);
};

export default ContextMenu;
