import {
	horizontalListSortingStrategy,
	SortableContext,
	useSortable,
} from "@dnd-kit/sortable";
import { cn } from "@/lib/utils";
import type { IPlayer } from "@/utils/types";
import { DraggableCard } from "./DraggableCard";

type Props = {
	id: string | number;
	title: string;
	players: IPlayer[];
	onRemove: (id: number) => void;
};

export const ReserveArea = ({ id, title, players, onRemove }: Props) => {
	const { setNodeRef } = useSortable({
		id: id,
		data: {
			reserve: true
		}
	});

	return (
		<div className="relative flex-1">
			<div className="absolute top-0 w-full text-center text-[10px] uppercase tracking-widest font-medium -translate-y-1/2 z-10 flex justify-center">
				<h2 className="bg-green-800 border border-green-700 px-4 pl-5 py-0.5 rounded-sm text-amber-200 relative z-10">
					{title}
				</h2>
				<div className="absolute top-1/2 h-[1px] w-full bg-linear-to-r from-transparent via-green-400 to-transparent"></div>
			</div>
			<div
				ref={setNodeRef}
				className={cn(
					"bg-linear-to-r from-transparent via-green-500/20 via-50% to-transparent p-4 transition-colors space-y-2 relative w-full h-[120px]",
				)}
			>
				<SortableContext
					items={players}
					strategy={horizontalListSortingStrategy}
				>
					<div className="flex justify-center items-center">
						{players.map((player) => (
							<DraggableCard
								key={player.id}
								player={player}
								onRemove={() => onRemove(player.id)}
								isReserve
							/>
						))}
					</div>
				</SortableContext>
			</div>
		</div>
	);
};
