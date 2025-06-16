interface IManaPointsBehaviour {
	currentMP: number;
	maxMP: number;
	addMP(pointsToAdd: number): void;
	decreaseMP(pointsToDecrease: number): void;
}

export default IManaPointsBehaviour;
