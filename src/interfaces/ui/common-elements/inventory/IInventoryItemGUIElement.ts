import { IBaseRectangleGUIElementConstructorParams } from '@mmorpg/interfaces/ui/base-elements/IBaseRectangleGUIElement';
import BaseInventoryItem from '@mmorpg/game-objects/inventory/items/base/BaseInventoryItem';
import IPosition2D from '@mmorpg/interfaces/common-interfaces/IPosition2D';

interface IInventoryItemGUIElementConstructorParams extends IBaseRectangleGUIElementConstructorParams {
	itemObject: BaseInventoryItem;
}

interface IInventoryItemGUIElementMoveToPositionParams {
	newPosition: IPosition2D;
}

export { IInventoryItemGUIElementConstructorParams, IInventoryItemGUIElementMoveToPositionParams };
