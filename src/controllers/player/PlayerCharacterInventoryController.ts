import { IPlayerCharacterInventoryControllerConstructorParams } from '@mmorpg/interfaces/controllers/player/IPlayerCharacterInventoryController';
import BasePlayerCharacterController from '@mmorpg/controllers/base/BasePlayerCharacterController';
import PlayerCharacterInventory from '@mmorpg/game-objects/inventory/PlayerCharacterInventory';
import { IInventoryGrid } from '@mmorpg/interfaces/game-objects/inventory/IBaseInventory';

class PlayerCharacterInventoryController extends BasePlayerCharacterController {
	private _inventory: PlayerCharacterInventory;

	constructor(params: IPlayerCharacterInventoryControllerConstructorParams) {
		super(params);
		this._inventory = new PlayerCharacterInventory({ characterInstance: this.characterInstance });
	}

	public dispose() {}

	get inventory(): PlayerCharacterInventory {
		return this._inventory;
	}

	get inventoryGrid(): IInventoryGrid {
		return this._inventory.grid;
	}
}

export default PlayerCharacterInventoryController;
