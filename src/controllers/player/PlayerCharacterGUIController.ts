import { AdvancedDynamicTexture, Control } from '@babylonjs/gui';
import { Nullable } from '@babylonjs/core';

import { IPlayerCharacterGUIControllerConstructorParams } from '@mmorpg/interfaces/controllers/player/IPlayerCharacterGUIController';
import BasePlayerCharacterController from '@mmorpg/controllers/base/BasePlayerCharacterController';
import InventoryMainPanelGUI from '@mmorpg/ui/panels/inventory-main-panel/InventoryMainPanelGUI';
import KeyboardInputController from '@mmorpg/controllers/input/KeyboardInputController';
import { createControlsInfoHelper } from '@mmorpg/ui/helpers/controls-info-helper';
import MainNavbarGUI from '@mmorpg/ui/navbars/main-navbar/MainNavbarGUI';
import ScenesController from '@mmorpg/controllers/ScenesController';
import KEY_CODES from '@mmorpg/utils/constants/KEY_CODES';

class PlayerCharacterGUIController extends BasePlayerCharacterController {
	private _guiTexture: AdvancedDynamicTexture;
	private _kbInputController: Nullable<KeyboardInputController> = null;
	private _isInventoryOpen: boolean = false;
	private _mainNavbarInstance: Nullable<MainNavbarGUI> = null;
	private _inventoryMainPanelIntance: Nullable<InventoryMainPanelGUI> = null;

	constructor(params: IPlayerCharacterGUIControllerConstructorParams) {
		super(params);
		this._guiTexture = this._createGUITextureInstance();
		this._kbInputController = this._characterInstance.keyboardInputController;
		this._addToggleKeys();
		this._createMainNavBar();
		this._createInventoryMainPanel();
		this._addElementToGUITexture(createControlsInfoHelper());
	}

	public update() {
		this._mainNavbarInstance?.update();
	}

	public dispose() {
		this._kbInputController = null;
	}

	private _createGUITextureInstance(): AdvancedDynamicTexture {
		return AdvancedDynamicTexture.CreateFullscreenUI('Player Character GUI Texture', true, ScenesController.getInstance().currentSceneInstance);
	}

	private _addElementToGUITexture(elementToAdd: Control) {
		this._guiTexture.addControl(elementToAdd);
	}

	private _createMainNavBar() {
		this._mainNavbarInstance = new MainNavbarGUI({ characterInstance: this.characterInstance });
		this._addElementToGUITexture(this._mainNavbarInstance);
	}

	private _createInventoryMainPanel() {
		this._inventoryMainPanelIntance = new InventoryMainPanelGUI({ characterInstance: this.characterInstance });
		this._inventoryMainPanelIntance.isVisible = false;
		this._addElementToGUITexture(this._inventoryMainPanelIntance);
	}

	private _addToggleKeys() {
		this._addInventoryToggleKey();
	}

	private _addInventoryToggleKey() {
		this._kbInputController?.addToggleKey(
			KEY_CODES.V,
			{
				onSwitchON: () => this._openInventoryPanel(),
				onSwitchOFF: () => this._closeInventoryPanel(),
			},
			'Inventory UI',
		);
	}

	private _openInventoryPanel() {
		if (this._inventoryMainPanelIntance) {
			this._isInventoryOpen = true;
			this._inventoryMainPanelIntance.isVisible = true;
		}
	}

	private _closeInventoryPanel() {
		if (this._inventoryMainPanelIntance) {
			this._isInventoryOpen = false;
			this._inventoryMainPanelIntance.isVisible = false;
		}
	}
}

export default PlayerCharacterGUIController;
