import { Loader, UserPlus } from "lucide-react";
import { useState } from "react";
import { withMask } from "use-mask-input";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

type Props = {
	onCreate: (name: string, tshirtNumber: string) => void;
	disabled?: boolean;
};

export const AddPlayerModal = ({ onCreate, disabled }: Props) => {
	const [isOpen, setIsOpen] = useState(false);
	const [name, setName] = useState("");
	const [tshirtNumber, setTshirtNumber] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (!name || !tshirtNumber) return;

		setIsLoading(true);
		setTimeout(() => {
			onCreate(name, tshirtNumber);
			setName("");
			setTshirtNumber("");
			setIsOpen(false);
			setIsLoading(false);
		}, 500);
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button disabled={disabled}>
					<UserPlus />
					Adicionar Jogador
				</Button>
			</DialogTrigger>
			<DialogContent aria-describedby={undefined}>
				<DialogHeader>
					<DialogTitle>Adicionar novo jogador</DialogTitle>
				</DialogHeader>

				<form className="grid gap-5" onSubmit={handleSubmit}>
					<div className="grid gap-1">
						<Label htmlFor="name">Nome</Label>
						<Input
							id="name"
							onChange={(event) => setName(event.target.value)}
							value={name}
							maxLength={15}
						/>
					</div>
					<div className="grid gap-1">
						<Label htmlFor="tshirtNumber">Número da camisa</Label>
						<Input
							id="tshirtNumber"
							onChange={(event) => setTshirtNumber(event.target.value)}
							value={tshirtNumber}
							placeholder="00"
							ref={withMask("99", {
								placeholder: "",
								showMaskOnHover: false,
							})}
						/>
					</div>

					<div className="text-right">
						<Button
							disabled={isLoading || !name || !tshirtNumber}
							type="submit"
						>
							{isLoading && <Loader className="animate-spin" />}
							Adicionar jogador
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
};
