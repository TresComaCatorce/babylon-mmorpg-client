import BaseConsumableItem from '@mmorpg/game-objects/inventory/items/base/BaseConsumableItem';
import { IPotionItemConstructorParams } from '@mmorpg/interfaces/game-objects/inventory/items/consumables/IPotionItem';
import ITEM_CATEGORIES from '@mmorpg/utils/constants/ITEM_CATEGORIES';

class PotionItem extends BaseConsumableItem {
	constructor(params: IPotionItemConstructorParams) {
		super({ ...params, category: ITEM_CATEGORIES.POTION });
	}

	public update(): void {}
	protected _onMeshLoaded(): void {}
}

export default PotionItem;
