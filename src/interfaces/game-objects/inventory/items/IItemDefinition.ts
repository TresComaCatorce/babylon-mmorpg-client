import IInventorySize from '@mmorpg/interfaces/game-objects/inventory/IInventorySize';
import ITEM_CATEGORIES from '@mmorpg/utils/constants/ITEM_CATEGORIES';

interface IItemDefinition {
	itemId: string;
	itemCategory: ITEM_CATEGORIES;
	itemDisplayNameText: string;
	itemDescriptionText: string;
	itemSize: IInventorySize;
	itemStackable: boolean;
	itemMaxStack?: number;
	itemModelUrl: string;
	itemIconUrl: string;
	itemVendibleForGold: boolean;
	itemGoldBuyPrice?: number;
	itemGoldSellPrice?: number;
}

export default IItemDefinition;
