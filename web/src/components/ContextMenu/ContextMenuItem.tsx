'use client';

import {useCallback, useEffect, useRef, useState} from 'react';
import {type ItemType} from '.';

type ContextMenuItemProps = {
	x: number | undefined;
	y: number | undefined;
	onClose: () => void;
	items: ItemType[];
};

const ContextMenuItem: React.FC<ContextMenuItemProps> = ({
	x,
	y,
	onClose,
	items,
}) => {
	const [isVisible, setIsVisible] = useState<boolean>(true);
	const contextMenuRef = useRef<HTMLDivElement | null>(null);

	const handleClickOutside = useCallback(
		(event: MouseEvent) => {
			if (
				contextMenuRef.current &&
				!contextMenuRef.current.contains(event.target as Node)
			) {
				setIsVisible(false);
				onClose();
			}
		},
		[onClose],
	);

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [handleClickOutside]);

	console.log(y, x);

	return isVisible ? (
		<div
			ref={contextMenuRef}
			className="absolute bg-white rounded border border-gray-300 shadow-md p-2"
			style={{
				top: y,
				left: x,
				transform: `translate(${window.scrollX}px, ${window.scrollY}px)`,
			}}
		>
			<ul className="list-none p-0 m-0">
				{items.map(({title, onClick}: ItemType, idx: number) => (
					<li
						key={idx}
						className="cursor-pointer py-1 px-3 text-sm hover:bg-blue-200 rounded"
						onClick={() => {
							onClick();
							setIsVisible(false);
							onClose();
						}}
					>
						{title}
					</li>
				))}
			</ul>
		</div>
	) : null;
};

export default ContextMenuItem;
