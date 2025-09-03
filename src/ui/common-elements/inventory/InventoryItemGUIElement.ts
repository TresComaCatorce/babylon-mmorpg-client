import { Container, Image } from '@babylonjs/gui';
import { Nullable } from '@babylonjs/core';

import { IInventoryItemGUIElementConstructorParams } from '@mmorpg/interfaces/ui/common-elements/inventory/IInventoryItemGUIElement';
import InventoryItemToolTipGUIElement from '@mmorpg/ui/common-elements/inventory/InventoryItemToolTipGUIElement';
import BaseInventoryItem from '@mmorpg/game-objects/inventory/items/base/BaseInventoryItem';
import BaseRectangleGUIElement from '@mmorpg/ui/base-elements/BaseRectangleGUIElement';
import GUI_ELEMENT_NAMES from '@mmorpg/utils/constants/GUI_ELEMENT_NAMES';
import MOUSE_CURSORS from '@mmorpg/utils/constants/MOUSE_CURSORS';
import ToolTipManager from '@mmorpg/ui/managers/ToolTipManager';
import GameController from '@mmorpg/controllers/GameController';
import GUIController from '@mmorpg/controllers/GUIController';

class InventoryItemGUIElement extends BaseRectangleGUIElement {
	private _itemObjectData: BaseInventoryItem;
	private _itemIcon: Image = new Image(`${this.elementName}${GUI_ELEMENT_NAMES.ICON}`);
	private _itemToolTipGuiElement!: InventoryItemToolTipGUIElement;
	private _isPickedUp: boolean = false;
	private _initialParentInstance: Nullable<Container> = null;

	constructor(params: IInventoryItemGUIElementConstructorParams) {
		super(params);
		this._itemObjectData = params.itemObject;
		this._itemToolTipGuiElement = new InventoryItemToolTipGUIElement({ owner: this, inventoryItemObjectData: this._itemObjectData });
		this._setupLookAndFeel();
		this._setupItemIcon();
		this._setupMousePointer();
		this._setupToolTip();
		this._setupMouseClick();
		this._onMouseMoveHandler = this._onMouseMoveHandler.bind(this);
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
			if (!this._isPickedUp) {
				this._setMouseOverStyle();
			}
		});
		this.onPointerOutObservable.add(() => {
			if (!this._isPickedUp) {
				this._setMouseDefaultStyle();
			}
		});
	}

	private _setMouseDefaultStyle() {
		document.body.style.cursor = MOUSE_CURSORS.DEFAULT;
		this.color = 'transparent';
	}

	private _setMouseOverStyle() {
		document.body.style.cursor = MOUSE_CURSORS.POINTER;
		this.color = 'rgba(255,255,255,0.7)';
	}

	private _setupToolTip() {
		ToolTipManager.getInstance().attach({ owner: this, content: this._itemToolTipGuiElement });
	}

	private _showToolTip() {
		ToolTipManager.getInstance().hide();
		this._itemToolTipGuiElement.isVisible = true;
	}

	private _hideToolTip() {
		this._itemToolTipGuiElement.isVisible = false;
		ToolTipManager.getInstance().hide();
	}

	private _setupMouseClick() {
		const canvasElement = GameController.getInstance().canvasElement;
		this.onPointerUpObservable.add(() => {
			if (this._isPickedUp) {
				this._isPickedUp = false;
				this.scaleX = 1;
				this.scaleY = 1;
				this.zIndex = 0;
				this._showToolTip();
				GUIController.getInstance().guiAdvanceDynamicTexture.rootContainer.removeControl(this);
				this._initialParentInstance?.addControl(this);
				this.leftInPixels = 0;
				this.topInPixels = 0;
				canvasElement.removeEventListener('mousemove', this._onMouseMoveHandler);
				console.log(`Item dropped: ${this._itemObjectData.name}`);
			} else {
				this._isPickedUp = true;
				this.scaleX = 1.2;
				this.scaleY = 1.2;
				this.zIndex = 9;
				this._hideToolTip();
				this._initialParentInstance = this.parent;
				this._initialParentInstance?.removeControl(this);
				GUIController.getInstance().guiAdvanceDynamicTexture.rootContainer.addControl(this);
				this.leftInPixels = 0;
				this.topInPixels = 0;
				this._setMouseDefaultStyle();
				canvasElement.addEventListener('mousemove', this._onMouseMoveHandler);
				console.log(`Item picked up: ${this._itemObjectData.name}`);
			}
		});
	}

	private _onMouseMoveHandler(event: MouseEvent) {
		const canvasElement = GameController.getInstance().canvasElement;
		const canvasPosition = canvasElement.getBoundingClientRect();
		const mouseX = event.clientX - canvasPosition.x - this.widthInPixels / 2;
		const mouseY = event.clientY - canvasPosition.y - this.heightInPixels / 2;

		this.leftInPixels = mouseX;
		this.topInPixels = mouseY;
	}
}

export default InventoryItemGUIElement;
