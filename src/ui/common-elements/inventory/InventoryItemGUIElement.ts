import { Image } from '@babylonjs/gui';

import { IInventoryItemGUIElementConstructorParams } from '@mmorpg/interfaces/ui/common-elements/inventory/IInventoryItemGUIElement';
import BaseInventoryItem from '@mmorpg/game-objects/inventory/items/base/BaseInventoryItem';
import BaseRectangleGUIElement from '@mmorpg/ui/base-elements/BaseRectangleGUIElement';
import GUI_ELEMENT_NAMES from '@mmorpg/utils/constants/GUI_ELEMENT_NAMES';
import MOUSE_CURSORS from '@mmorpg/utils/constants/MOUSE_CURSORS';

class InventoryItemGUIElement extends BaseRectangleGUIElement {
	private _itemObjectData: BaseInventoryItem;
	private _itemIcon: Image = new Image(`${this.elementName}${GUI_ELEMENT_NAMES.ICON}`);

	constructor(params: IInventoryItemGUIElementConstructorParams) {
		super(params);
		this._itemObjectData = params.itemObject;
		this._setupLookAndFeel();
		this._setupItemIcon();
		this._setupMousePointer();
	}

	private _setupLookAndFeel() {
		this.cornerRadius = 3;
		this.thickness = 1;
		this.color = 'transparent';
	}

	private _setupItemIcon() {
		this._itemIcon.source = this._itemObjectData.iconUrl;
		this.addControl(this._itemIcon);
	}

	private _setupMousePointer() {
		this.onPointerEnterObservable.add(() => {
			document.body.style.cursor = MOUSE_CURSORS.POINTER;
			this.color = 'rgba(255,255,255,0.7)';
		});
		this.onPointerOutObservable.add(() => {
			document.body.style.cursor = MOUSE_CURSORS.DEFAULT;
			this.color = 'transparent';
		});
	}
}

export default InventoryItemGUIElement;
