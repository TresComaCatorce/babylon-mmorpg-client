import IItemDefinition from '@mmorpg/interfaces/game-objects/inventory/items/IItemDefinition';
import ITEM_CATEGORIES from '@mmorpg/utils/constants/ITEM_CATEGORIES';

const itemsDefinition: IItemDefinition[] = [
	{
		itemId: '1',
		itemCategory: ITEM_CATEGORIES.POTION,
		itemDisplayNameText: 'Small Health Potion',
		itemDescriptionText: 'Restores 1 health point.',
		itemStackable: true,
		itemMaxStack: 100,
		itemSize: {
			width: 1,
			height: 1,
		},
		itemIconUrl: 'assets/icons/items/hp_potion_small_icon.png',
		itemModelUrl: 'assets/models/items/potions/hp_potion_small.gltf',
		itemVendibleForGold: true,
		itemGoldBuyPrice: 10,
		itemGoldSellPrice: 5,
	},
];

export default itemsDefinition;
