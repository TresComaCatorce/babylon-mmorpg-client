import IInventorySize from '@mmorpg/interfaces/game-objects/inventory/IInventorySize';
import ITEM_CATEGORIES from '@mmorpg/utils/constants/ITEM_CATEGORIES';

interface IItemDefinition {
	itemId: string;
	itemCategory: ITEM_CATEGORIES;
	itemDisplayNameText: string;
	itemDescriptionText: string;
	itemSize: IInventorySize;
	itemStackable: boolean;
	itemModelUrl: string;
	itemIconUrl: string;
	itemMaxStack?: number;
}

export default IItemDefinition;
