import { InventoryMainPanelGUIConstructorParams } from '@mmorpg/interfaces/ui/panels/inventory-main-panel/IInventoryMainPanelGUI';
import IPlayerCharacterRelated from '@mmorpg/interfaces/common-interfaces/IPlayerCharacterRelated';
import GUI_ELEMENT_NAMES from '@mmorpg/utils/constants/GUI_ELEMENT_NAMES';
import BaseMainPanelGUI from '@mmorpg/ui/panels/BaseMainPanelGUI';
import PlayerCharacter from '@mmorpg/entities/characters/PlayerCharacter';

class InventoryMainPanelGUI extends BaseMainPanelGUI implements IPlayerCharacterRelated {
	private _characterInstance: PlayerCharacter;
	constructor(params: InventoryMainPanelGUIConstructorParams) {
		super({
			elementName: GUI_ELEMENT_NAMES.INVENTORY_PANEL,
		});
		this._characterInstance = params.characterInstance;
	}

	get characterInstance(): PlayerCharacter {
		return this._characterInstance;
	}
}

export default InventoryMainPanelGUI;
