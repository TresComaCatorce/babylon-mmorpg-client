import BaseInventoryItem from '@mmorpg/game-objects/inventory/items/base/BaseInventoryItem';
import { IBaseRectangleGUIElementConstructorParams } from '@mmorpg/interfaces/ui/base-elements/IBaseRectangleGUIElement';

interface IInventoryItemGUIElementConstructorParams extends IBaseRectangleGUIElementConstructorParams {
	itemObject: BaseInventoryItem;
}

export { IInventoryItemGUIElementConstructorParams };
