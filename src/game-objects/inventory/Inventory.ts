import InventorySlot from '@mmorpg/game-objects/inventory/InventorySlot';
import Item from '@mmorpg/game-objects/inventory/BaseItem';

class Inventory {
	private _slots: InventorySlot[] = [];
	private _capacity: number;

	constructor() {
		this._capacity = 30;
	}

	public addItem(item: Item, quantity: number = 1): boolean {
		// Si es stackable y ya existe en inventario
		if (item.stackable) {
			const slot = this._slots.find((s) => s.item.id === item.id);
			if (slot) {
				slot.increase(quantity);
				return true;
			}
		}

		// Nuevo slot si hay espacio
		if (this._slots.length < this._capacity) {
			this._slots.push(new InventorySlot(item, quantity));
			return true;
		}

		return false; // Inventario lleno
	}

	public removeItem(itemId: string, quantity: number = 1): boolean {
		const slot = this._slots.find((s) => s.item.id === itemId);
		if (!slot) return false;

		slot.decrease(quantity);
		if (slot.quantity <= 0) {
			this._slots = this._slots.filter((s) => s !== slot);
		}
		return true;
	}

	public listItems(): InventorySlot[] {
		return this._slots;
	}

	public hasItem(itemId: string, quantity: number = 1): boolean {
		const slot = this._slots.find((s) => s.item.id === itemId);
		return slot ? slot.quantity >= quantity : false;
	}

	get capacity(): number {
		return this._capacity;
	}

	get usedSlots(): number {
		return this._slots.length;
	}
}

export default Inventory;
