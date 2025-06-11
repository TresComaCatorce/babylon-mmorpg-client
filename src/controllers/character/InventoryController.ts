import Inventory from '@mmorpg/entities/inventory/Inventory';
import Item from '@mmorpg/entities/inventory/BaseItem';

interface IInventoryControllerParams {
	inventory: Inventory;
	playerName: string;
}

class InventoryController {
	private _inventory: Inventory;
	private _playerName: string;

	constructor(params: IInventoryControllerParams) {
		this._inventory = params.inventory;
		this._playerName = params.playerName;
	}

	public openInventoryUI() {
		console.log(`[${this._playerName}] Abriendo inventario...`);
		this._inventory.listItems().forEach((slot, index) => {
			console.log(`Slot ${index + 1}: ${slot.item.name} x${slot.quantity}`);
		});
	}

	public addItemToInventory(item: Item, quantity: number = 1): boolean {
		const result = this._inventory.addItem(item, quantity);
		console.log(result ? `Añadido ${quantity}x ${item.name} al inventario` : `No hay espacio para ${item.name}`);
		return result;
	}

	public removeItemFromInventory(itemId: string, quantity: number = 1): boolean {
		const result = this._inventory.removeItem(itemId, quantity);
		console.log(result ? `Removido ${quantity}x ${itemId} del inventario` : `No tienes ese ítem en el inventario`);
		return result;
	}

	public hasItem(itemId: string, quantity: number = 1): boolean {
		return this._inventory.hasItem(itemId, quantity);
	}
}

export default InventoryController;
