import InventoryItemGUIElement from '@mmorpg/ui/common-elements/inventory/InventoryItemGUIElement';
import BaseInventoryItem from '@mmorpg/game-objects/inventory/items/base/BaseInventoryItem';

interface InventoryItemToolTipGUIElementConstructorParams {
	owner: InventoryItemGUIElement;
	inventoryItemObjectData: BaseInventoryItem;
}

export { InventoryItemToolTipGUIElementConstructorParams };
