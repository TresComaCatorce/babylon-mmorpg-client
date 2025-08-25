import { IPlayerCharacterInventoryConstructorParams } from '@mmorpg/interfaces/game-objects/inventory/IPlayerCharacterInventory';
import ICharacterRelated from '@mmorpg/interfaces/common-interfaces/ICharacterRelated';
import BaseInventory from '@mmorpg/game-objects/inventory/BaseInventory';
import PlayerCharacter from '../characters/PlayerCharacter';

class PlayerCharacterInventory extends BaseInventory implements ICharacterRelated {
	protected _characterInstance: PlayerCharacter;

	constructor(params: IPlayerCharacterInventoryConstructorParams) {
		super({ size: { width: 8, height: 26 } });
		this._characterInstance = params.characterInstance;
	}

	get characterInstance(): PlayerCharacter {
		return this._characterInstance;
	}
}

export default PlayerCharacterInventory;
