'use client';

import ContextMenuItem from './ContextMenuItem';
import {type ItemType} from '.';

type DynamicContextMenuProps = {
	items: ItemType[];
	contextMenuPos:
		| {
				x: number;
				y: number;
		  }
		| undefined;
	setContextMenuPos: ({x, y}: any) => void;
};

const DynamicContextMenu: React.FC<DynamicContextMenuProps> = ({
	items,
	contextMenuPos,
	setContextMenuPos,
}) => {
	const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
		e.preventDefault();
		setContextMenuPos({x: e.clientX, y: e.clientY});
	};

	const closeContextMenu = () => {
		setContextMenuPos(undefined);
	};

	return (
		<div onContextMenu={handleContextMenu}>
			{contextMenuPos && (
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

export default DynamicContextMenu;
