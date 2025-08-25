import BaseConsumableItem from '@mmorpg/game-objects/inventory/items/base/BaseConsumableItem';
import { IPotionItemConstructorParams } from '@mmorpg/interfaces/game-objects/inventory/items/consumables/IPotionItem';

class PotionItem extends BaseConsumableItem {
	constructor(params: IPotionItemConstructorParams) {
		super(params);
	}

	public update(): void {}
	protected _onMeshLoaded(): void {}
}

export default PotionItem;
