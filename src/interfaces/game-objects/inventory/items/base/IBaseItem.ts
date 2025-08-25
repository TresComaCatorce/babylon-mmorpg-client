// Item Types
// 1 -> Consumables

interface IBaseItemConstructorParams {
	itemId: string;
	displayNameText: string;
	descriptionText: string;
	modelUrl: string;
	iconUrl: string;
	stackable?: boolean;
	currentStackQuantity?: number;
	maxStackQuantity?: number;
}

export { IBaseItemConstructorParams };
