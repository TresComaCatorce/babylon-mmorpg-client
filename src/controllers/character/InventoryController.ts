import Inventory from '@mmorpg/game-objects/inventory/Inventory';
import Item from '@mmorpg/game-objects/inventory/BaseItem';

interface IInventoryControllerParams {
	playerName: string;
	inventoryCapacity?: number;
}

class InventoryController {
	private _inventory: Inventory;
	private _playerName: string;

	constructor(params: IInventoryControllerParams) {
		this._playerName = params.playerName;
		this._inventory = new Inventory(params.inventoryCapacity ?? 30);
	}

	public openInventoryUI() {
		console.log(`[${this._playerName}] Inventario:`);
		this._inventory.listItems().forEach((slot, index) => {
			console.log(`Slot ${index + 1}: ${slot.item.name} x${slot.quantity}`);
		});
	}

	public addItem(item: Item, quantity: number = 1): boolean {
		const result = this._inventory.addItem(item, quantity);
		console.log(result ? `+ ${quantity}x ${item.name}` : `No hay espacio para ${item.name}`);
		return result;
	}

	public removeItem(itemId: string, quantity: number = 1): boolean {
		const result = this._inventory.removeItem(itemId, quantity);
		console.log(result ? `- ${quantity}x ${itemId}` : `No tienes ${itemId}`);
		return result;
	}

	public hasItem(itemId: string, quantity: number = 1): boolean {
		return this._inventory.hasItem(itemId, quantity);
	}

	// Si necesitas exponer los slots para alguna lógica externa
	public getSlots() {
		return this._inventory.listItems();
	}
}

export default InventoryController;
