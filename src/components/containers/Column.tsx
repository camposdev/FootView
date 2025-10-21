import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { cn } from '@/lib/utils'
import { DraggableCard } from './DraggableCard'

type TaskProps = {
  id: string | number
  title: string
  description: string
  status: 'TODO' | 'DOING' | 'DONE'
}

type Props = {
  id: string | number
  title: string
  tasks: TaskProps[]
}

export const Column = ({ id, title, tasks }: Props) => {
  const { isOver, setNodeRef } = useSortable({
    id: id
  })

  return (
    <div ref={setNodeRef} className={cn(isOver ? "bg-blue-500" : "bg-slate-200", "p-4 rounded-md min-h-[calc(100dvh-200px)] transition-colors space-y-2")}>
      <h2>{title}</h2>
      <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
        {tasks.map(task => (
          <DraggableCard key={task.id} task={task} />
        ))}
      </SortableContext>
    </div>
  )
}
