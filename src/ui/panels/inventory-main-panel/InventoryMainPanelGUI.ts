import { Control } from '@babylonjs/gui';

import { InventoryMainPanelGUIConstructorParams } from '@mmorpg/interfaces/ui/panels/inventory-main-panel/IInventoryMainPanelGUI';
import IPlayerCharacterRelated from '@mmorpg/interfaces/common-interfaces/IPlayerCharacterRelated';
import PlayerCharacter from '@mmorpg/game-objects/characters/PlayerCharacter';
import GUI_ELEMENT_NAMES from '@mmorpg/utils/constants/GUI_ELEMENT_NAMES';
import BaseMainPanelGUI from '@mmorpg/ui/panels/BaseMainPanelGUI';

class InventoryMainPanelGUI extends BaseMainPanelGUI implements IPlayerCharacterRelated {
	private _characterInstance: PlayerCharacter;

	constructor(params: InventoryMainPanelGUIConstructorParams) {
		super({ elementName: GUI_ELEMENT_NAMES.INVENTORY_PANEL });
		this._characterInstance = params.characterInstance;
		this._configure();
	}

	private _configure() {
		this.width = '200px';
		this.height = '400px';
		this.background = 'black';
		this.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
		this.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
	}

	get characterInstance(): PlayerCharacter {
		return this._characterInstance;
	}
}

export default InventoryMainPanelGUI;
