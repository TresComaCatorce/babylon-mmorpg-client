import IItemDefinition from '@mmorpg/interfaces/game-objects/inventory/items/IItemDefinition';

interface IBaseItemConstructorParams extends IItemDefinition {
	currentStackQuantity?: number;
}

export { IBaseItemConstructorParams };
