import { AdvancedDynamicTexture, Control } from '@babylonjs/gui';
import { Nullable } from '@babylonjs/core';

import { IPlayerCharacterGUIControllerConstructorParams } from '@mmorpg/interfaces/controllers/player/IPlayerCharacterGUIController';
import BasePlayerCharacterController from '@mmorpg/controllers/player/BasePlayerCharacterController';
import KeyboardInputController from '@mmorpg/controllers/input/KeyboardInputController';
import MainNavbarGUI from '@mmorpg/ui/navbars/main-navbar/MainNavbarGUI';
import ScenesController from '@mmorpg/controllers/ScenesController';
import KEY_CODES from '@mmorpg/utils/constants/KEY_CODES';

class PlayerCharacterGUIController extends BasePlayerCharacterController {
	private _kbInputController: Nullable<KeyboardInputController> = null;
	private _isInventoryOpen: boolean = false;
	private _mainNavbarInstance: Nullable<MainNavbarGUI> = null;
	private _guiTexture: AdvancedDynamicTexture;

	constructor(params: IPlayerCharacterGUIControllerConstructorParams) {
		super(params);
		this._guiTexture = this._createGUITextureInstance();
		this._kbInputController = this._characterInstance.keyboardInputController;
		this._addToggleKeys();
		this._createMainNavBar();
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
		this._isInventoryOpen = true;
	}

	private _closeInventoryPanel() {
		this._isInventoryOpen = false;
	}
}

export default PlayerCharacterGUIController;
