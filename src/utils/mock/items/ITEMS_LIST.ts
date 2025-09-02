import IItemDefinition from '@mmorpg/interfaces/game-objects/inventory/items/IItemDefinition';
import ITEM_CATEGORIES from '@mmorpg/utils/constants/ITEM_CATEGORIES';

const itemsDefinition: IItemDefinition[] = [
	{
		id: '1',
		category: ITEM_CATEGORIES.POTION,
		displayNameText: 'Small Health Potion',
		descriptionText: 'Restores 1 health point.',
		stackable: true,
		maxStack: 100,
		size: {
			width: 1,
			height: 1,
		},
		iconUrl: 'assets/icons/items/hp_potion_small_icon.png',
		modelUrl: 'assets/models/items/potions/hp_potion_small.gltf',
		vendibleForGold: true,
		goldBuyPrice: 10,
		goldSellPrice: 5,
	},
];

export default itemsDefinition;
