import { IPlayerCharacterGUIControllerConstructorParas } from '@mmorpg/interfaces/controllers/player/IPlayerCharacterGUIController';
import IPlayerCharacterRelated from '@mmorpg/interfaces/common-interfaces/IPlayerCharacterRelated';
import InventoryMainPanelGUI from '@mmorpg/ui/panels/inventory-main-panel/InventoryMainPanelGUI';
import BasePlayerCharacterController from './BasePlayerCharacterController';
import PlayerCharacter from '@mmorpg/entities/characters/PlayerCharacter';
import MainNavbarGUI from '@mmorpg/ui/navbars/main-navbar/MainNavbarGUI';

class PlayerCharacterGUIController extends BasePlayerCharacterController implements IPlayerCharacterRelated {
	protected _characterInstance: PlayerCharacter;
	private _mainNavbar!: MainNavbarGUI;
	private _inventoryMainPanel!: InventoryMainPanelGUI;

	constructor(params: IPlayerCharacterGUIControllerConstructorParas) {
		super(params);
		this._characterInstance = params.characterInstance;
		this._createMainNavbarGUI();
		this._createInventoryPanelGUI();
	}

	public dispose() {}

	private _createMainNavbarGUI() {
		this._mainNavbar = new MainNavbarGUI({ characterInstance: this._characterInstance });
	}

	private _createInventoryPanelGUI() {
		this._inventoryMainPanel = new InventoryMainPanelGUI({ characterInstance: this._characterInstance });
	}

	get characterInstance(): PlayerCharacter {
		return this._characterInstance;
	}
}

export default PlayerCharacterGUIController;
