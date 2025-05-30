import { IBaseCharacterControllerConstructorParams } from '@mmorpg/interfaces/controllers/character/IBaseCharacterController';
import PlayerCharacter from '@mmorpg/entities/characters/PlayerCharacter';

interface IBasePlayerCharacterControllerConstructorParams extends IBaseCharacterControllerConstructorParams {
	characterInstance: PlayerCharacter;
}

export { IBasePlayerCharacterControllerConstructorParams };
