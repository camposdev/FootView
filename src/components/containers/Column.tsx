import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import type { IPlayer } from "@/lib/types";
import { DraggableCard } from "./DraggableCard";

type Props = {
  id: string | number;
  title: string;
  players: IPlayer[];
};

export const Column = ({ id, title, players }: Props) => {
  const { setNodeRef } = useSortable({
    id: id,
  });

  return (
    <div className="relative">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 -rotate-90 text-center text-[10px] uppercase tracking-widest font-medium z-10 flex justify-center">
        <h2 className="bg-green-800 border border-green-700 px-4 pl-5 py-0.5 rounded-sm text-amber-200 relative z-10 whitespace-nowrap">
          {title}
        </h2>
      </div>
      <div
        ref={setNodeRef}
        className="bg-linear-to-b from-transparent via-black/20 to-transparent p-4 rounded-md h-full transition-colors space-y-2 w-[100px] xl:w-[150px] relative"
      >
        <SortableContext items={players} strategy={verticalListSortingStrategy}>
          <div className="flex flex-col justify-evenly items-center h-full">
            {players.map((player) => (
              <DraggableCard key={player.id} player={player} />
            ))}
          </div>
        </SortableContext>
      </div>
    </div>
  );
};
