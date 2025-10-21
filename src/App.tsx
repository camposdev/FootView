import {
  DndContext,
  type DragEndEvent,
  type DragOverEvent,
  DragOverlay,
  type DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import { Trophy } from "lucide-react";
import { useState } from "react";
import { FieldLines } from "./components/common/FieldLines";
import { AddPlayerModal } from "./components/containers/AddPlayerModal";
import { Column } from "./components/containers/Column";
import { PlayerCard } from "./components/containers/PlayerCard";
import { ReserveArea } from "./components/containers/ReserveArea";
import { initialPlayers } from "./utils/mock";
import type { IPlayer, IPositionArea, IPositions } from "./utils/types";

const columns: IPositionArea[] = [
  {
    id: "RESERVE",
    title: "Reserva",
    limit: 11,
  },
  {
    id: "KEEPER",
    title: "Gol",
    limit: 1,
  },
  {
    id: "DEFENDER",
    title: "Defesa",
    limit: 4,
  },
  {
    id: "MIDFIELDER",
    title: "Meio campo",
    limit: 4,
  },
  {
    id: "FORWARD",
    title: "Ataque",
    limit: 4,
  },
];

function App() {
  const [players, setPlayers] = useState<IPlayer[]>(initialPlayers);
  const [activePlayer, setActivePlayer] = useState<IPlayer | null>(null);

  const isFull = players.filter((player) => player.position === "RESERVE").length >= 11;

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
  );

  const handleDragStart = (event: DragStartEvent) => {
    const task = players.find((player) => player.id === event.active.id);
    setActivePlayer(task || null);
  };

  const handleDragOver = ({ active, over }: DragOverEvent) => {
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const activePlayer = players.find((player) => player.id === activeId);
    const overPlayer = players.find((player) => player.id === overId);

    if (!activePlayer) return;

    const totalPlayersInPosition = players.filter(
      (player) => player.position === overId,
    ).length;
    const limitCurrentPosition = columns.find((col) => col.id === overId)?.limit || 0;

    if (totalPlayersInPosition >= limitCurrentPosition) return;

    if (columns.some((col) => col.id === overId)) {
      const newPosition = overId as IPositions;
      if (activePlayer.position !== newPosition) {
        setPlayers((players) =>
          players.map((player) =>
            player.id === activeId
              ? { ...player, position: newPosition }
              : player,
          ),
        );
      }
      return;
    }

    if (overPlayer && activePlayer.position !== overPlayer.position) {
      setPlayers((players) =>
        players.map((player) =>
          player.id === activeId
            ? { ...player, position: overPlayer.position }
            : player,
        ),
      );
    }
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over) {
      setActivePlayer(null);
      return;
    }

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) {
      setActivePlayer(null);
      return;
    }

    const activePlayer = players.find((task) => task.id === activeId);
    const overPlayer = players.find((task) => task.id === overId);

    if (!activePlayer) {
      setActivePlayer(null);
      return;
    }

    if (columns.some((col) => col.id === overId)) {
      setActivePlayer(null);
      return;
    }

    if (overPlayer && activePlayer.position === overPlayer.position) {
      const currentColumnPlayers = players.filter(
        (player) => player.position === activePlayer.position,
      );
      const activeIndex = currentColumnPlayers.findIndex(
        (player) => player.id === activeId,
      );
      const overIndex = currentColumnPlayers.findIndex(
        (player) => player.id === overId,
      );

      if (activeIndex !== overIndex) {
        const reorderedPlayers = arrayMove(
          currentColumnPlayers,
          activeIndex,
          overIndex,
        );
        const otherPlayers = players.filter(
          (task) => task.position !== activePlayer.position,
        );
        setPlayers([...otherPlayers, ...reorderedPlayers]);
      }
    }

    setActivePlayer(null);
  };

  const handleAddTask = (name: string, tshirtNumber: string) => {
    setPlayers((prev) => [
      ...prev,
      {
        id: Date.now(),
        name,
        tshirtNumber,
        position: "RESERVE",
      },
    ]);
  };

  const handleRemovePlayer = (playerId: number) => {
    setPlayers((prev) => prev.filter((player) => player.id !== playerId));
  };

  return (
    <main className="container mx-auto max-w-6xl lg:px-10">
      <header className="flex flex-col md:flex-row gap-5 justify-between items-center my-5 px-5">
        <h1 className="text-4xl font-light flex items-center gap-3">
          <Trophy className="size-7 text-primary" />
          FootView
        </h1>
        <AddPlayerModal onCreate={handleAddTask} disabled={isFull} />
      </header>

      <div className="overflow-auto">
        <div className="min-w-4xl p-4">
          <DndContext
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
            sensors={sensors}
          >
            <SortableContext
              items={columns}
              strategy={horizontalListSortingStrategy}
            >
              <div className="rounded-2xl flex gap-5 items-center justify-center">
                {columns
                  .filter((col) => col.id === "RESERVE")
                  .map((column) => (
                    <ReserveArea
                      key={column.id}
                      id={column.id}
                      title={column.title}
                      players={players.filter(
                        (player) => player.position === column.id,
                      )}
                      onRemove={handleRemovePlayer}
                    />
                  ))}
              </div>

              <div className="w-full max-w-6xl mx-auto aspect-[16/9] bg-radial from-green-600 from-40% to-green-800 rounded-2xl px-10 relative border-8 border-white overflow-hidden shadow-2xl z-0">
                <div className="grid grid-cols-5 gap-22 items-stretch h-full">
                  {columns
                    .filter((col) => col.id !== "RESERVE")
                    .map((column) => (
                      <Column
                        key={column.id}
                        id={column.id}
                        title={column.title}
                        players={players.filter(
                          (player) => player.position === column.id,
                        )}
                      />
                    ))}
                </div>

                <FieldLines />
              </div>
            </SortableContext>

            <DragOverlay>
              {activePlayer && <PlayerCard player={activePlayer} />}
            </DragOverlay>
          </DndContext>
        </div>
      </div>
    </main>
  );
}

export default App;
