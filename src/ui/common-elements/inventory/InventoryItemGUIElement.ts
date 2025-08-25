import { Image } from '@babylonjs/gui';

import { IInventoryItemGUIElementConstructorParams } from '@mmorpg/interfaces/ui/common-elements/inventory/IInventoryItemGUIElement';
import BaseInventoryItem from '@mmorpg/game-objects/inventory/items/base/BaseInventoryItem';
import BaseRectangleGUIElement from '@mmorpg/ui/base-elements/BaseRectangleGUIElement';
import GUI_ELEMENT_NAMES from '@mmorpg/utils/constants/GUI_ELEMENT_NAMES';

class InventoryItemGUIElement extends BaseRectangleGUIElement {
	private _itemObjectData: BaseInventoryItem;
	private _itemIcon: Image = new Image(`${this.elementName}${GUI_ELEMENT_NAMES.ICON}`);

	constructor(params: IInventoryItemGUIElementConstructorParams) {
		super(params);
		this._itemObjectData = params.itemObject;
		this._setupLookAndFeel();
		this._setupItemIcon();
	}

	private _setupLookAndFeel() {
		this.thickness = 0;
	}

	private _setupItemIcon() {
		this._itemIcon.source = this._itemObjectData.iconUrl;
		this.addControl(this._itemIcon);
	}
}

export default InventoryItemGUIElement;
