interface IHealthPointsBehaviour {
	currentHP: number;
	maxHP: number;
	addHP(pointsToAdd: number): void;
	decreaseHP(pointsToDecrease: number): void;
}

export default IHealthPointsBehaviour;
