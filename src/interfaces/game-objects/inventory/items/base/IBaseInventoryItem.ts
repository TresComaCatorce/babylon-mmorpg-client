import { IBaseItemConstructorParams } from '@mmorpg/interfaces/game-objects/inventory/items/base/IBaseItem';
import IInventorySize from '@mmorpg/interfaces/game-objects/inventory/IInventorySize';

interface IBaseInventoryItemConstructorParams extends IBaseItemConstructorParams {
	itemSize: IInventorySize;
}

export { IBaseInventoryItemConstructorParams };
