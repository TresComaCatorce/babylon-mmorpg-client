import { TextBlock } from '@babylonjs/gui';

import { InventoryItemToolTipGUIElementConstructorParams } from '@mmorpg/interfaces/ui/common-elements/inventory/IInventoryItemToolTipGUIElement';
import BaseRectangleGUIElement from '@mmorpg/ui/base-elements/BaseRectangleGUIElement';
import GUI_ELEMENT_NAMES from '@mmorpg/utils/constants/GUI_ELEMENT_NAMES';

class InventoryItemToolTipGUIElement extends BaseRectangleGUIElement {
	constructor(params: InventoryItemToolTipGUIElementConstructorParams) {
		super({ elementName: `${params.owner.elementName}${GUI_ELEMENT_NAMES.TOOLTIP_CONTENT}` });
		const textblock = new TextBlock('cbftemp', params.inventoryItemObjectData.name);
		textblock.color = 'white';
		this.addControl(textblock);
	}
}

export default InventoryItemToolTipGUIElement;
