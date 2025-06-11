import { ICharacterAnimationsControllerConstructorParams } from '@mmorpg/interfaces/controllers/character/ICharacterAnimationsController';
import PlayerCharacter from '@mmorpg/game-objects/characters/PlayerCharacter';

interface IPlayerCharacterAnimationsControllerConstructorParams extends ICharacterAnimationsControllerConstructorParams {
	characterInstance: PlayerCharacter;
}

interface IPlayAnimationConfigParam {
	playInLoop?: boolean;
	speedRatio?: number;
}

export { IPlayerCharacterAnimationsControllerConstructorParams, IPlayAnimationConfigParam };
