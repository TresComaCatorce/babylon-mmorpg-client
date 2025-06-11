import { IMainNavbarGUIConstructorParams } from '@mmorpg/interfaces/ui/navbars/main-navbar/IMainNavbarGUI';
import IPlayerCharacterRelated from '@mmorpg/interfaces/common-interfaces/IPlayerCharacterRelated';
import GUI_ELEMENT_NAMES from '@mmorpg/utils/constants/GUI_ELEMENT_NAMES';
import PlayerCharacter from '@mmorpg/game-objects/characters/PlayerCharacter';
import BaseNavbarGUI from '@mmorpg/ui/navbars/BaseNavbarGUI';

class MainNavbarGUI extends BaseNavbarGUI implements IPlayerCharacterRelated {
	private _characterInstance: PlayerCharacter;

	constructor(params: IMainNavbarGUIConstructorParams) {
		super({ elementName: GUI_ELEMENT_NAMES.MAIN_BAR });
		this._characterInstance = params.characterInstance;
	}

	get characterInstance(): PlayerCharacter {
		return this._characterInstance;
	}
}

export default MainNavbarGUI;
