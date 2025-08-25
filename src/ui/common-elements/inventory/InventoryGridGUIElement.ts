import { IInventoryGridGUIElementConstructorParams } from '@mmorpg/interfaces/ui/common-elements/inventory/IInventoryGridGUIElement';
import BaseRectangleGUIElement from '@mmorpg/ui/base-elements/BaseRectangleGUIElement';
import IInventorySize from '@mmorpg/interfaces/game-objects/inventory/IInventorySize';
import BaseInventory from '@mmorpg/game-objects/inventory/BaseInventory';
import InventorySlotGUIElement from './InventorySlotGUIElement';
import ItemFactory from '@mmorpg/factories/ItemFactory';

const DEFAULT_SLOT_SIZE_IN_PIXELS = {
	width: 25,
	height: 25,
};

class InventoryGridGUIElement extends BaseRectangleGUIElement {
	private _asociatedInventory: BaseInventory;
	private _slotsGrid: InventorySlotGUIElement[][] = [];
	private _slotSize: IInventorySize;

	constructor(params: IInventoryGridGUIElementConstructorParams) {
		super(params);
		this._asociatedInventory = params.associatedInventory;
		this._slotSize = params.slotSize ? params.slotSize : DEFAULT_SLOT_SIZE_IN_PIXELS;
		this._createInventorySlots();
	}

	private _createInventorySlots() {
		const size = this._asociatedInventory.size;
		for (let i = 0; i < size.height; i++) {
			const row: InventorySlotGUIElement[] = [];
			const rowNumber = i + 1;
			for (let j = 0; j < size.width; j++) {
				const slotPositionInRow = j + 1;
				const slotCreated = new InventorySlotGUIElement({
					elementName: `InventorySlot-${rowNumber}-${slotPositionInRow}`,
					size: this._slotSize,
					offSet: { x: j * this._slotSize.width, y: i * this._slotSize.height },
				});
				if (rowNumber === 2 && slotPositionInRow === 2) {
					slotCreated.setContent({ contentToAdd: ItemFactory.getInstance().create({ itemId: '1', currentStackQuantity: 1 }) });
				}
				row.push(slotCreated);
				this.addControl(slotCreated);
			}
			this._slotsGrid.push(row);
		}
	}
}

export default InventoryGridGUIElement;
