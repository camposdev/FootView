import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { cn } from '@/lib/utils';
import { TaskCard } from './TaskCard';

type Props = {
  task: {
    id: string | number
    title: string
    description: string
  }
}

export const DraggableCard = ({ task }: Props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className={cn(isDragging && "opacity-70")}>
      <TaskCard task={task} />
    </div>
  )
}
