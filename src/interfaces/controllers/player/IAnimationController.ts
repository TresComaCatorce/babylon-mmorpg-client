import PlayerCharacter from '@mmorpg/entities/characters/PlayerCharacter';

interface IAnimationControllerConstructorParams {
	playerCharacter: PlayerCharacter;
}

interface IPlayAnimationConfigParam {
	playInLoop?: boolean;
	speedRatio?: number;
}

export { IAnimationControllerConstructorParams, IPlayAnimationConfigParam };
