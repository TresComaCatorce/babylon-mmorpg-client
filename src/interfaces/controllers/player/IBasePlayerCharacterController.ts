import { IBaseCharacterControllerConstructorParams } from '@mmorpg/interfaces/controllers/character/IBaseCharacterController';
import PlayerCharacter from '@mmorpg/game-objects/characters/PlayerCharacter';

interface IBasePlayerCharacterControllerConstructorParams extends IBaseCharacterControllerConstructorParams {
	characterInstance: PlayerCharacter;
}

export { IBasePlayerCharacterControllerConstructorParams };
