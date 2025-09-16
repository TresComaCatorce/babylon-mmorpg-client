import { Nullable } from '@babylonjs/core';

import { IBaseRectangleGUIElementConstructorParams } from '@mmorpg/interfaces/ui/base-elements/IBaseRectangleGUIElement';
import BaseInventoryItem from '@mmorpg/game-objects/inventory/items/base/BaseInventoryItem';
import IOffsetGUI from '@mmorpg/interfaces/ui/IOffsetGUI';

interface IInventorySlotGUIElementConstructorParams extends IBaseRectangleGUIElementConstructorParams {
	offSet?: IOffsetGUI;
}

interface IInventorySlotGUIElementAddContentParams {
	contentToAdd: Nullable<BaseInventoryItem>;
}

enum INVENTORY_SLOT_STATES {
	'DRAGGING_ITEM', // Slot occupied but the item is being dragged
	'EMPTY', // Empty slot
	'PREVIEW', // Empty slot preview to be occupied
	'NOT_EMPTY', // Occupied slot by a item
	'BLOCKED', // Slot is not available to be used
}

export { IInventorySlotGUIElementConstructorParams, IInventorySlotGUIElementAddContentParams, INVENTORY_SLOT_STATES };
