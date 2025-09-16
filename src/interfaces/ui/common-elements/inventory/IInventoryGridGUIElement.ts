import { IBaseRectangleGUIElementConstructorParams } from '@mmorpg/interfaces/ui/base-elements/IBaseRectangleGUIElement';
import BaseInventory from '@mmorpg/game-objects/inventory/BaseInventory';

interface IInventoryGridGUIElementConstructorParams extends IBaseRectangleGUIElementConstructorParams {
	associatedInventory: BaseInventory;
}

export { IInventoryGridGUIElementConstructorParams };
