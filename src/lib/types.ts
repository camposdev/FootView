export type IPositions =
	| "RESERVE"
	| "KEEPER"
	| "DEFENDER"
	| "MIDFIELDER"
	| "FORWARD";

export interface IPlayer {
	id: number;
	name: string;
	tshirtNumber: string;
	position: IPositions;
}

export interface IPositionArea {
	id: IPositions;
	title: string;
	limit: number;
}
