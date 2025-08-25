import IItemDefinition from '@mmorpg/interfaces/game-objects/inventory/items/IItemDefinition';
import { ICreateParams } from '@mmorpg/interfaces/game-objects/inventory/items/IItemFactory';
import BaseInventoryItem from '@mmorpg/game-objects/inventory/items/base/BaseInventoryItem';
import PotionItem from '@mmorpg/game-objects/inventory/items/consumables/PotionItem';
import ITEM_CATEGORIES from '@mmorpg/utils/constants/ITEM_CATEGORIES';
import itemsDefinition from '@mmorpg/utils/mock/items/ITEMS_LIST';
import BaseFactory from '@mmorpg/factories/BaseFactory';

class ItemFactory extends BaseFactory {
	private static _instance: ItemFactory | undefined;

	private _definitionsMap: Map<string, IItemDefinition> = new Map();

	private constructor() {
		super();
		for (const def of itemsDefinition) {
			this._definitionsMap.set(def.itemId, def);
		}
	}

	/**
	 * @static
	 * @description Returns the singleton instance of ItemFactory, creating it if necessary.
	 * @access public
	 * @returns {ItemFactory} The singleton instance.
	 */
	public static getInstance(): ItemFactory {
		if (ItemFactory._instance === undefined) {
			ItemFactory._instance = new ItemFactory();
		}
		return ItemFactory._instance;
	}

	/**
	 * @description Disposes of the current scene and the Babylon.js engine, cleaning up resources.
	 * @access public
	 * @returns {void}
	 */
	public dispose(): void {}

	public create(params: ICreateParams): BaseInventoryItem {
		let returnValue: BaseInventoryItem | undefined;
		const def = this._definitionsMap.get(params.itemId);

		if (!def) {
			throw new Error(`Item ID '${params.itemId}' not found in definitions.`);
		}

		switch (def.itemCategory) {
			case ITEM_CATEGORIES.POTION:
				if (params.currentStackQuantity) {
					returnValue = new PotionItem({
						itemId: def.itemId,
						displayNameText: def.itemDisplayNameText,
						descriptionText: def.itemDescriptionText,
						itemSize: def.itemSize,
						stackable: def.itemStackable,
						currentStackQuantity: params.currentStackQuantity,
						maxStackQuantity: def.itemMaxStack,
						modelUrl: def.itemModelUrl,
						iconUrl: def.itemIconUrl,
					});
				}
				break;
			default:
				break;
		}

		if (!returnValue) throw new Error(`ItemFactory.ts | Error creating item: ${JSON.stringify(def)}`);

		return returnValue;
	}
}

export default ItemFactory;
