import { IBaseConsumableItemConstructorParams } from '@mmorpg/interfaces/game-objects/inventory/items/base/IBaseConsumableItem';

type IPotionItemConstructorParams = Omit<IBaseConsumableItemConstructorParams, 'category'>;

export { IPotionItemConstructorParams };
