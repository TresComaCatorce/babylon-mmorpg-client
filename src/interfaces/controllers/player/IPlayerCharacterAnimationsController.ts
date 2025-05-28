import { ICharacterAnimationsControllerConstructorParams } from '../character/ICharacterAnimationsController';
import PlayerCharacter from '@mmorpg/entities/characters/PlayerCharacter';

interface IPlayerCharacterAnimationsControllerConstructorParams extends ICharacterAnimationsControllerConstructorParams {
	characterInstance: PlayerCharacter;
}

interface IPlayAnimationConfigParam {
	playInLoop?: boolean;
	speedRatio?: number;
}

export { IPlayerCharacterAnimationsControllerConstructorParams, IPlayAnimationConfigParam };
