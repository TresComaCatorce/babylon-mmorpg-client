import { Nullable } from '@babylonjs/core';
import { Control, Image } from '@babylonjs/gui';

import InventoryItemGUIElement from '@mmorpg/ui/common-elements/inventory/InventoryItemGUIElement';
import BaseInventoryItem from '@mmorpg/game-objects/inventory/items/base/BaseInventoryItem';
import BaseRectangleGUIElement from '@mmorpg/ui/base-elements/BaseRectangleGUIElement';
import IInventorySize from '@mmorpg/interfaces/game-objects/inventory/IInventorySize';
import {
	IInventorySlotGUIElementConstructorParams,
	IInventorySlotGUIElementAddContentParams,
	INVENTORY_SLOT_STATES,
} from '@mmorpg/interfaces/ui/common-elements/inventory/IInventorySlotGUIElement';
import GUI_ELEMENT_NAMES from '@mmorpg/utils/constants/GUI_ELEMENT_NAMES';
import IOffsetGUI from '@mmorpg/interfaces/ui/IOffsetGUI';

const SLOT_IMAGES_URLS = {
	DRAGGING_ITEM: 'assets/gui/inventory/inventory_slot_dragging_item.png', // Slot occupied but the item is being dragged
	EMPTY: 'assets/gui/inventory/inventory_slot_empty.png', // Empty slot
	PREVIEW: 'assets/gui/inventory/inventory_slot_preview.png', // Empty slot preview to be occupied
	NOT_EMPTY: 'assets/gui/inventory/inventory_slot_not_empty.png', // Occupied slot by a item
	BLOCKED: 'assets/gui/inventory/inventory_slot_blocked.png', // Slot is not available to be used
};

const DEFAULT_SLOT_SIZE_IN_PIXELS = {
	width: 25,
	height: 25,
};

const DEFAULT_OFFSET_IN_PIXELS = {
	x: 0,
	y: 0,
};

class InventorySlotGUIElement extends BaseRectangleGUIElement {
	private _state: INVENTORY_SLOT_STATES = INVENTORY_SLOT_STATES.EMPTY;
	private _content: Nullable<BaseInventoryItem> = null;
	private _slotSizeInPixels: IInventorySize;
	private _offset: IOffsetGUI;
	private _inventorySlotImageGuiElement: Image = new Image(`${this.elementName}${GUI_ELEMENT_NAMES.BACKGROUND}`, SLOT_IMAGES_URLS.EMPTY);
	private _inventoryItemGuiElement: Nullable<InventoryItemGUIElement> = null;

	public setContent(params: IInventorySlotGUIElementAddContentParams) {
		if (params.contentToAdd === null) {
			this._setState(INVENTORY_SLOT_STATES.EMPTY);
		} else {
			this._setState(INVENTORY_SLOT_STATES.NOT_EMPTY);
		}
		this._content = params.contentToAdd;
		this._createInventoryItemGUIElement(params.contentToAdd);
	}

	constructor(params: IInventorySlotGUIElementConstructorParams) {
		super(params);
		this._slotSizeInPixels = params.size ? params.size : DEFAULT_SLOT_SIZE_IN_PIXELS;
		this._offset = params.offSet ? params.offSet : DEFAULT_OFFSET_IN_PIXELS;
		this._setupLookAndFeel();
		this._setupImageGuiElement();
	}

	private _setupImageGuiElement() {
		this._inventorySlotImageGuiElement.widthInPixels = this._slotSizeInPixels.width;
		this._inventorySlotImageGuiElement.heightInPixels = this._slotSizeInPixels.height;
		this._inventorySlotImageGuiElement.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
		this._inventorySlotImageGuiElement.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
		this.addControl(this._inventorySlotImageGuiElement);
	}

	private _createInventoryItemGUIElement(itemObjectToCreate: Nullable<BaseInventoryItem>) {
		if (!itemObjectToCreate) return;

		this._inventoryItemGuiElement = new InventoryItemGUIElement({
			elementName: `${this.elementName}${GUI_ELEMENT_NAMES.ITEM}`,
			itemObject: itemObjectToCreate,
		});
		this._inventoryItemGuiElement.widthInPixels = this._slotSizeInPixels.width;
		this._inventoryItemGuiElement.heightInPixels = this._slotSizeInPixels.height;
		this._inventoryItemGuiElement.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
		this._inventoryItemGuiElement.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
		this.addControl(this._inventoryItemGuiElement);
	}

	private _setupLookAndFeel() {
		this.thickness = 0;
		this.widthInPixels = this._slotSizeInPixels.width;
		this.heightInPixels = this._slotSizeInPixels.height;
		this.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
		this.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
		this.leftInPixels = this._offset.x;
		this.topInPixels = this._offset.y;
	}

	private _setState(newValue: INVENTORY_SLOT_STATES) {
		this._state = newValue;
		this._setSourceByState();
	}

	private _setSourceByState() {
		let newSource: string;
		switch (this._state) {
			case INVENTORY_SLOT_STATES.EMPTY:
				newSource = SLOT_IMAGES_URLS.EMPTY;
				break;
			case INVENTORY_SLOT_STATES.NOT_EMPTY:
				newSource = SLOT_IMAGES_URLS.NOT_EMPTY;
				break;
			case INVENTORY_SLOT_STATES.DRAGGING_ITEM:
				newSource = SLOT_IMAGES_URLS.DRAGGING_ITEM;
				break;
			case INVENTORY_SLOT_STATES.PREVIEW:
				newSource = SLOT_IMAGES_URLS.PREVIEW;
				break;
			case INVENTORY_SLOT_STATES.BLOCKED:
				newSource = SLOT_IMAGES_URLS.PREVIEW;
				break;
		}

		this._inventorySlotImageGuiElement.source = newSource;
	}

	get isEmpty(): boolean {
		return this._state === INVENTORY_SLOT_STATES.EMPTY;
	}

	get isNotEmpty(): boolean {
		return this._state === INVENTORY_SLOT_STATES.NOT_EMPTY;
	}

	get isPreEmpty(): boolean {
		return this._state === INVENTORY_SLOT_STATES.DRAGGING_ITEM;
	}

	get isPreNotEmpty(): boolean {
		return this._state === INVENTORY_SLOT_STATES.PREVIEW;
	}

	get isBlocked(): boolean {
		return this._state === INVENTORY_SLOT_STATES.BLOCKED;
	}

	get content(): Nullable<BaseInventoryItem> {
		return this._content;
	}
}

export default InventorySlotGUIElement;
