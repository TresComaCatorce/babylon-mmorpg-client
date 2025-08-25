import BaseInventoryItem from '@mmorpg/game-objects/inventory/items/base/BaseInventoryItem';
import IInventorySize from '@mmorpg/interfaces/game-objects/inventory/IInventorySize';

type IInventoryGrid = (BaseInventoryItem | null)[][];

interface IBaseInventoryConstructorParams {
	size: IInventorySize;
}

export { IInventoryGrid, IBaseInventoryConstructorParams };
