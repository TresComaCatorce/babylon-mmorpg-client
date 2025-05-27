import { ICharacterMovementControllerConstructorParams } from '@mmorpg/interfaces/controllers/character/ICharacterMovementController';
import PlayerCharacter from '@mmorpg/entities/characters/PlayerCharacter';

interface IPlayerCharacterMovementControllerConstructorParams extends ICharacterMovementControllerConstructorParams {
	characterInstance: PlayerCharacter;
}

export default IPlayerCharacterMovementControllerConstructorParams;
