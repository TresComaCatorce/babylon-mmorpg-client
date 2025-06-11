import PlayerCharacter from '@mmorpg/game-objects/characters/PlayerCharacter';
import ICharacterRelated from '@mmorpg/interfaces/common-interfaces/ICharacterRelated';

interface IPlayerCharacterRelated extends ICharacterRelated {
	characterInstance: PlayerCharacter;
}

export default IPlayerCharacterRelated;
