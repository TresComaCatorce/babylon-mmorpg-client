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
import WarpMapsMainPanelGUI from '@mmorpg/ui/panels/warp-maps-main-panel/WarpMapsMainPanelGUI';

class PlayerCharacterGUIController extends BasePlayerCharacterController {
	private _guiTexture: AdvancedDynamicTexture;
	private _kbInputController: Nullable<KeyboardInputController> = null;
	private _mainNavbarInstance: Nullable<MainNavbarGUI> = null;

	// Inventory panel
	private _isInventoryMainPanelOpen: boolean = false;
	private _inventoryMainPanelInstance: Nullable<InventoryMainPanelGUI> = null;

	// Warp maps panel
	private _isWarpMapsMainPanelOpen: boolean = false;
	private _warpMapsMainPanelInstance: Nullable<WarpMapsMainPanelGUI> = null;

	constructor(params: IPlayerCharacterGUIControllerConstructorParams) {
		super(params);
		this._guiTexture = this._createGUITextureInstance();
		this._kbInputController = this._characterInstance.keyboardInputController;
		this._addToggleKeys();
		this._createMainNavBar();
		this._createInventoryMainPanel();
		this._createWarpMapsMainPanel();
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
		this._inventoryMainPanelInstance = new InventoryMainPanelGUI({ characterInstance: this.characterInstance });
		this._inventoryMainPanelInstance.isVisible = false;
		this._addElementToGUITexture(this._inventoryMainPanelInstance);
	}

	private _createWarpMapsMainPanel() {
		this._warpMapsMainPanelInstance = new WarpMapsMainPanelGUI({ characterInstance: this.characterInstance });
		this._warpMapsMainPanelInstance.isVisible = false;
		this._addElementToGUITexture(this._warpMapsMainPanelInstance);
	}

	private _addToggleKeys() {
		this._addInventoryPanelToggleKey();
		this._addWarpMapsPanelToggleKey();
	}

	private _addInventoryPanelToggleKey() {
		this._kbInputController?.addToggleKey(
			KEY_CODES.V,
			{
				onSwitchON: () => this._openInventoryPanel(),
				onSwitchOFF: () => this._closeInventoryPanel(),
			},
			'Inventory Panel',
		);
	}

	private _addWarpMapsPanelToggleKey() {
		this._kbInputController?.addToggleKey(
			KEY_CODES.M,
			{
				onSwitchON: () => this._openWarpMapsPanel(),
				onSwitchOFF: () => this._closeWarpMapsPanel(),
			},
			'Warp Maps Panel',
		);
	}

	private _openInventoryPanel() {
		if (this._inventoryMainPanelInstance) {
			this._isInventoryMainPanelOpen = true;
			this._inventoryMainPanelInstance.isVisible = true;
		}
	}

	private _closeInventoryPanel() {
		if (this._inventoryMainPanelInstance) {
			this._isInventoryMainPanelOpen = false;
			this._inventoryMainPanelInstance.isVisible = false;
		}
	}

	private _openWarpMapsPanel() {
		if (this._warpMapsMainPanelInstance) {
			this._isWarpMapsMainPanelOpen = true;
			this._warpMapsMainPanelInstance.isVisible = true;
		}
	}

	private _closeWarpMapsPanel() {
		if (this._warpMapsMainPanelInstance) {
			this._isWarpMapsMainPanelOpen = false;
			this._warpMapsMainPanelInstance.isVisible = false;
		}
	}
}

export default PlayerCharacterGUIController;
