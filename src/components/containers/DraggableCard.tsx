import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";
import type { IPlayer } from "@/utils/types";
import { PlayerCard } from "./PlayerCard";

type Props = {
	player: IPlayer;
	onRemove?: () => void;
	isReserve?: boolean;
};

export const DraggableCard = ({ player, isReserve, onRemove }: Props) => {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({ id: player.id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	return (
		<div
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
			className={cn(isDragging && "opacity-70")}
		>
			<PlayerCard player={player} isReserve={isReserve} onRemove={onRemove} />
		</div>
	);
};
