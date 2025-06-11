import { ICharacterMovementControllerConstructorParams } from '@mmorpg/interfaces/controllers/character/ICharacterMovementController';
import PlayerCharacter from '@mmorpg/game-objects/characters/PlayerCharacter';

interface IPlayerCharacterMovementControllerConstructorParams extends ICharacterMovementControllerConstructorParams {
	characterInstance: PlayerCharacter;
}

export default IPlayerCharacterMovementControllerConstructorParams;
