import { Shirt, Trash2 } from "lucide-react";
import type { IPlayer } from "@/lib/types";
import { cn } from "@/lib/utils";

type Props = {
  player: IPlayer;
  isReserve?: boolean;
  onRemove?: () => void;
};

export const PlayerCard = ({ player, isReserve, onRemove }: Props) => {
  return (
    <div
      className={cn(
        "size-[100px] touch-none select-none relative hover:z-20 text-center flex items-center justify-center flex-col cursor-grab active:cursor-grabbing z-10 transition-transform text-slate-800 group",
        isReserve && "scale-75",
      )}
    >
      <h3 className="text-[24px] font-bold text-green-800">
        {player.tshirtNumber}
      </h3>
      <p className="text-xs absolute bg-green-950 text-primary px-3 py-0.5 rounded-sm bottom-0 left-1/2 -translate-x-1/2 truncate max-w-[120px]">
        {player.name}
      </p>

      <Shirt className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-20 fill-white text-white -z-10" />
      <div className="absolute inset-0 bg-black/5 blur-sm rounded-full -z-20 group-hover:bg-green-500/20 transition-all"></div>

      {isReserve && (
        <button
          type="button"
          onClick={onRemove}
          aria-label="Remove player"
          className="absolute top-0 right-0 flex items-center justify-center size-7 rounded-full bg-destructive text-white cursor-pointer transition-all opacity-0 group-hover:opacity-100"
        >
          <Trash2 className="size-4" />
        </button>
      )}
    </div>
  );
};
