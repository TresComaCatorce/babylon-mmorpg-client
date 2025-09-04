import { Container, Image } from '@babylonjs/gui';
import { Nullable, PointerEventTypes } from '@babylonjs/core';

import { IInventoryItemGUIElementConstructorParams } from '@mmorpg/interfaces/ui/common-elements/inventory/IInventoryItemGUIElement';
import InventoryItemToolTipGUIElement from '@mmorpg/ui/common-elements/inventory/InventoryItemToolTipGUIElement';
import BaseInventoryItem from '@mmorpg/game-objects/inventory/items/base/BaseInventoryItem';
import BaseRectangleGUIElement from '@mmorpg/ui/base-elements/BaseRectangleGUIElement';
import GUI_ELEMENT_NAMES from '@mmorpg/utils/constants/GUI_ELEMENT_NAMES';
import ScenesController from '@mmorpg/controllers/ScenesController';
import MOUSE_CURSORS from '@mmorpg/utils/constants/MOUSE_CURSORS';
import ToolTipManager from '@mmorpg/ui/managers/ToolTipManager';
import GUIController from '@mmorpg/controllers/GUIController';

class InventoryItemGUIElement extends BaseRectangleGUIElement {
	private _itemObjectData: BaseInventoryItem;
	private _itemIcon: Image = new Image(`${this.elementName}${GUI_ELEMENT_NAMES.ICON}`);
	private _itemToolTipGuiElement!: InventoryItemToolTipGUIElement;
	private _initialParentInstance: Nullable<Container> = null;
	private _isPickedUp: boolean = false;
	private _justDropped: boolean = false;

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
				this._setMouseOverDefaultStyle();
			}
		});
	}

	private _setMouseOverDefaultStyle() {
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

	private _enableToolTip() {
		ToolTipManager.getInstance().hide();
		this._itemToolTipGuiElement.isVisible = true;
	}

	private _disableToolTip() {
		this._itemToolTipGuiElement.isVisible = false;
		ToolTipManager.getInstance().hide();
	}

	private _setupMouseClick() {
		const currentScene = ScenesController.getInstance().currentSceneInstance;
		// Handle the pointer down event to drop the item if it's picked up
		this.onPointerDownObservable.add(() => {
			if (currentScene && this._isPickedUp) {
				// Reset picked up state
				this._isPickedUp = false;
				this._justDropped = true;

				// Reset item scale and zIndex
				this.scaleX = 1;
				this.scaleY = 1;
				this.zIndex = 0;

				// Move the item back to its initial parent container
				GUIController.getInstance().guiAdvanceDynamicTexture.rootContainer.removeControl(this);
				this._initialParentInstance?.addControl(this);

				// Reset item position
				this.leftInPixels = 0;
				this.topInPixels = 0;

				// Stop listening to mouse move events
				currentScene?.onPointerObservable.removeCallback(this._onMouseMoveHandler);

				// Re-enable the tooltip after dropping the item
				this._enableToolTip();
			}
		});

		// Handle the pointer up event to pick up the item or finalize dropping it
		this.onPointerUpObservable.add(() => {
			// If the item is not picked up and is not a "pointer up" after dropping it
			if (currentScene && !this._justDropped && !this._isPickedUp) {
				// Set picked up state
				this._isPickedUp = true;

				// Add a zoom & zIndex to the picked up item
				this.scaleX = 1.5;
				this.scaleY = 1.5;
				this.zIndex = 99999;

				// Disable the tooltip while the item is picked up
				this._disableToolTip();

				// Move the item to the root container so it can be on top of everything
				this._initialParentInstance = this.parent;
				this._initialParentInstance?.removeControl(this);
				GUIController.getInstance().guiAdvanceDynamicTexture.rootContainer.addControl(this);

				this._setMouseOverDefaultStyle();

				// Move the item to the current mouse position
				this._moveToCurrentMousePosition();

				// Start listening to mouse move events to move the item
				currentScene?.onPointerObservable.add(this._onMouseMoveHandler, PointerEventTypes.POINTERMOVE);
			}

			// If the item was just dropped, check if the mouse is still over it to show the tooltip
			// This is needed because the "pointer up" event is fired after the "pointer out" event
			// when dropping the item, so the tooltip would not be shown if the mouse is still over the item
			// when dropping it.
			if (currentScene && !this._isPickedUp && this._justDropped && this.contains(currentScene.pointerX, currentScene.pointerY)) {
				ToolTipManager.getInstance().show();
				this._setMouseOverStyle();
			}

			// Reset the just dropped state after processing
			if (this._justDropped) {
				this._justDropped = false;
			}
		});
	}

	private _onMouseMoveHandler() {
		this._moveToCurrentMousePosition();
	}

	private _moveToCurrentMousePosition() {
		const currentScene = ScenesController.getInstance().currentSceneInstance;
		if (currentScene) {
			const mouseX = currentScene.pointerX - this.widthInPixels / 2;
			const mouseY = currentScene.pointerY - this.heightInPixels / 2;

			this.leftInPixels = mouseX;
			this.topInPixels = mouseY;
		}
	}
}

export default InventoryItemGUIElement;
