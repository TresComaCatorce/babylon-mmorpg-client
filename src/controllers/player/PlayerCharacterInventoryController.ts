import { IPlayerCharacterInventoryControllerConstructorParams } from '@mmorpg/interfaces/controllers/player/IPlayerCharacterInventoryController';
import BasePlayerCharacterController from '@mmorpg/controllers/player/BasePlayerCharacterController';
import Inventory from '@mmorpg/game-objects/inventory/Inventory';
import BaseItem from '@mmorpg/game-objects/inventory/BaseItem';

class PlayerCharacterInventoryController extends BasePlayerCharacterController {
	private _inventory: Inventory;

	constructor(params: IPlayerCharacterInventoryControllerConstructorParams) {
		super(params);
		this._inventory = new Inventory();
	}

	public dispose() {}

	public openInventoryUI() {
		console.log(`Inventario:`);
		this._inventory.listItems().forEach((slot, index) => {
			console.log(`Slot ${index + 1}: ${slot.item.name} x${slot.quantity}`);
		});
	}

	public addItem(item: BaseItem, quantity: number = 1): boolean {
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

export default PlayerCharacterInventoryController;
