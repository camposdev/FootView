import { Loader, Plus } from "lucide-react"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"

type Props = {
  onCreate: (title: string, description: string) => void
}

export const CreateTaskModal = ({ onCreate }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true)
    event.preventDefault()

    setTimeout(() => {
      onCreate(title, description)
      setTitle('')
      setDescription('')
      setIsOpen(false)
      setIsLoading(false)
    }, 500);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          Nova tarefa
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>

        <form className="grid gap-5" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <Label htmlFor="title">Título</Label>
            <Input id="title" onChange={(event) => setTitle(event.target.value)} value={title} />
          </div>
          <div className="grid gap-1">
            <Label htmlFor="description">Descrição</Label>
            <Input id="description" onChange={(event) => setDescription(event.target.value)} value={description} />
          </div>

          <div className="text-right">
            <Button disabled={isLoading}>
              {isLoading && <Loader className="animate-spin" />}
              Criar tarefa
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
