import { IPlayerCharacterGUIControllerConstructorParas } from '@mmorpg/interfaces/controllers/player/IPlayerCharacterGUIController';
import BaseCharacterController from '@mmorpg/controllers/character/BaseCharacterController';
// import InventoryPanelGUI from '@mmorpg/ui/panels/inventory-panel/InventoryPanelGUI';
// import MainBarGUI from '@mmorpg/ui/navbars/BaseNavbarGUI';

class PlayerCharacterGUIController extends BaseCharacterController {
	// private _mainBarGUI: MainBarGUI;
	// private _inventoryPanel: InventoryPanelGUI;

	constructor(params: IPlayerCharacterGUIControllerConstructorParas) {
		super(params);
		// this._createMainBarGUI();
		// this._createInventoryPanelGUI();
	}

	public dispose() {}

	private _createMainBarGUI() {
		// this._mainBarGUI = new MainBarGUI({elementName});
	}

	// private _createInventoryPanelGUI() {
	// 	this._inventoryPanel = new
	// }
}

export default PlayerCharacterGUIController;
