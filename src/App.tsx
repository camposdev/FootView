import { DndContext, type DragEndEvent, type DragOverEvent, DragOverlay, type DragStartEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, horizontalListSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import { useState } from "react";
import { Column } from "./components/containers/Column";
import { CreateTaskModal } from "./components/containers/CreateTaskModal";
import { TaskCard } from "./components/containers/TaskCard";

export type IStatus = 'TODO' | 'DOING' | 'DONE'

export interface ITask {
  id: string | number
  title: string
  description: string
  status: IStatus
}

export interface IColumn {
  id: IStatus
  title: string
}

const initialTasks: ITask[] = [
  {
    id: 1,
    title: 'Task 1',
    description: 'Description 1',
    status: 'TODO'
  },
  {
    id: 2,
    title: 'Task 2',
    description: 'Description 2',
    status: 'TODO'
  },
  {
    id: 3,
    title: 'Task 3',
    description: 'Description 3',
    status: 'TODO'
  }
]

const columns: IColumn[] = [
  {
    id: 'TODO',
    title: "A fazer"
  }, {
    id: 'DOING',
    title: "Em progresso"
  }, {
    id: 'DONE',
    title: "Concluído"
  }]

function App() {
  const [tasks, setTasks] = useState<ITask[]>(initialTasks)
  const [activeTask, setActiveTask] = useState<ITask | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const task = tasks.find((task) => task.id === event.active.id);
    setActiveTask(task || null);
  }

  const handleDragOver = ({ active, over }: DragOverEvent) => {
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const activeTask = tasks.find((task) => task.id === activeId);
    const overTask = tasks.find((task) => task.id === overId);

    if (!activeTask) return;

    if (columns.some((col) => col.id === overId)) {
      const newStatus = overId as IStatus;
      if (activeTask.status !== newStatus) {
        setTasks((tasks) =>
          tasks.map((task) =>
            task.id === activeId ? { ...task, status: newStatus } : task
          )
        );
      }
      return;
    }

    if (overTask && activeTask.status !== overTask.status) {
      setTasks((tasks) =>
        tasks.map((task) =>
          task.id === activeId ? { ...task, status: overTask.status } : task
        )
      );
    }
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over) {
      setActiveTask(null);
      return;
    }

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) {
      setActiveTask(null);
      return;
    }

    const activeTask = tasks.find((task) => task.id === activeId);
    const overTask = tasks.find((task) => task.id === overId);

    if (!activeTask) {
      setActiveTask(null);
      return;
    }

    if (columns.some((col) => col.id === overId)) {
      setActiveTask(null);
      return;
    }

    if (overTask && activeTask.status === overTask.status) {
      const currentColumnTasks = tasks.filter((task) => task.status === activeTask.status);
      const activeIndex = currentColumnTasks.findIndex((task) => task.id === activeId);
      const overIndex = currentColumnTasks.findIndex((task) => task.id === overId);

      if (activeIndex !== overIndex) {
        const reorderedTasks = arrayMove(currentColumnTasks, activeIndex, overIndex);
        const otherTasks = tasks.filter((task) => task.status !== activeTask.status);
        setTasks([...otherTasks, ...reorderedTasks]);
      }
    }

    setActiveTask(null);
  };

  const handleAddTask = (title: string, description: string) => {
    setTasks((prevTasks) => [
      ...prevTasks,
      {
        id: Date.now(),
        title,
        description,
        status: 'TODO'
      }
    ])
  }

  return (
    <main className="container mx-auto">
      <header className="flex justify-between items-center my-10">
        <h1 className="text-3xl font-bold">React Kanban</h1>
        <CreateTaskModal onCreate={handleAddTask} />
      </header>

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
          <div className="grid grid-cols-3 gap-5">
            {columns.map((column) => (
              <Column
                key={column.id}
                id={column.id}
                title={column.title}
                tasks={tasks.filter((task) => task.status === column.id)}
              />
            ))}
          </div>
        </SortableContext>

        <DragOverlay>
          {activeTask && (
            <TaskCard task={activeTask} />
          )}
        </DragOverlay>
      </DndContext>
    </main>
  );
}

export default App;
