import IInventorySize from '@mmorpg/interfaces/game-objects/inventory/IInventorySize';
import ITEM_CATEGORIES from '@mmorpg/utils/constants/ITEM_CATEGORIES';

interface IItemDefinition {
	id: string;
	category: ITEM_CATEGORIES;
	displayNameText: string;
	descriptionText: string;
	modelUrl: string;
	iconUrl: string;
	size: IInventorySize;
	stackable: boolean;
	maxStack?: number;
	vendibleForGold: boolean;
	goldBuyPrice?: number;
	goldSellPrice?: number;
}

export default IItemDefinition;
