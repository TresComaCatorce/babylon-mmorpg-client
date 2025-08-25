import { IBaseConsumableItemConstructorParams } from '@mmorpg/interfaces/game-objects/inventory/items/base/IBaseConsumableItem';
import BaseInventoryItem from '@mmorpg/game-objects/inventory/items/base/BaseInventoryItem';

abstract class BaseConsumableItem extends BaseInventoryItem {
	constructor(params: IBaseConsumableItemConstructorParams) {
		super(params);
	}
}

export default BaseConsumableItem;
