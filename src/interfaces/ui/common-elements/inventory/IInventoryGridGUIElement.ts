import { IBaseRectangleGUIElementConstructorParams } from '@mmorpg/interfaces/ui/base-elements/IBaseRectangleGUIElement';
import IInventorySize from '@mmorpg/interfaces/game-objects/inventory/IInventorySize';
import BaseInventory from '@mmorpg/game-objects/inventory/BaseInventory';

interface IInventoryGridGUIElementConstructorParams extends IBaseRectangleGUIElementConstructorParams {
	associatedInventory: BaseInventory;
	slotSize?: IInventorySize;
}

export { IInventoryGridGUIElementConstructorParams };
