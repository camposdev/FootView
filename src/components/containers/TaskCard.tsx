import { cn } from '@/lib/utils';

type Props = {
  task: {
    id: string | number
    title: string
    description: string
  }
}

export const TaskCard = ({ task }: Props) => {

  return (
    <div className={cn("bg-white p-4 rounded-md touch-none relative hover:shadow-lg hover:z-10")}>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
    </div>
  )
}
