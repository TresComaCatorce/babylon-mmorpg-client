import { IBaseRectangleGUIElementConstructorParams } from '@mmorpg/interfaces/ui/base-elements/IBaseRectangleGUIElement';
import BaseInventoryItem from '@mmorpg/game-objects/inventory/items/base/BaseInventoryItem';

interface IInventoryItemGUIElementConstructorParams extends IBaseRectangleGUIElementConstructorParams {
	itemObject: BaseInventoryItem;
}

export { IInventoryItemGUIElementConstructorParams };
