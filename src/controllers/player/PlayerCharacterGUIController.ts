import { AdvancedDynamicTexture, Control } from '@babylonjs/gui';
import { Nullable, PointerEventTypes } from '@babylonjs/core';

import { IPlayerCharacterGUIControllerConstructorParams } from '@mmorpg/interfaces/controllers/player/IPlayerCharacterGUIController';
import BasePlayerCharacterController from '@mmorpg/controllers/base/BasePlayerCharacterController';
import InventoryItemGUIElement from '@mmorpg/ui/common-elements/inventory/InventoryItemGUIElement';
import InventorySlotGUIElement from '@mmorpg/ui/common-elements/inventory/InventorySlotGUIElement';
import InventoryGridGUIElement from '@mmorpg/ui/common-elements/inventory/InventoryGridGUIElement';
import InventoryMainPanelGUI from '@mmorpg/ui/panels/inventory-main-panel/InventoryMainPanelGUI';
import WarpMapsMainPanelGUI from '@mmorpg/ui/panels/warp-maps-main-panel/WarpMapsMainPanelGUI';
import KeyboardInputController from '@mmorpg/controllers/input/KeyboardInputController';
import { createControlsInfoHelper } from '@mmorpg/ui/helpers/controls-info-helper';
import MainNavbarGUI from '@mmorpg/ui/navbars/main-navbar/MainNavbarGUI';
import ScenesController from '@mmorpg/controllers/ScenesController';
import GUIController from '@mmorpg/controllers/GUIController';
import KEY_CODES from '@mmorpg/utils/constants/KEY_CODES';

class PlayerCharacterGUIController extends BasePlayerCharacterController {
	private _guiTexture: AdvancedDynamicTexture;
	private _kbInputController: Nullable<KeyboardInputController> = null;
	private _mainNavbarInstance: Nullable<MainNavbarGUI> = null;
	private _pickedUpItem: Nullable<InventoryItemGUIElement> = null;
	private _currentTargetSlot: InventorySlotGUIElement | null = null;

	// Inventory panel
	private _isInventoryMainPanelOpen: boolean = false;
	private _inventoryMainPanelInstance: Nullable<InventoryMainPanelGUI> = null;

	// Warp maps panel
	private _isWarpMapsMainPanelOpen: boolean = false;
	private _warpMapsMainPanelInstance: Nullable<WarpMapsMainPanelGUI> = null;

	constructor(params: IPlayerCharacterGUIControllerConstructorParams) {
		super(params);
		this._guiTexture = GUIController.getInstance().guiAdvanceDynamicTexture;
		this._kbInputController = this._characterInstance.keyboardInputController;
		this._onMouseMove = this._onMouseMove.bind(this);
		this._addToggleKeys();
		this._createMainNavBar();
		this._createInventoryMainPanel();
		this._createWarpMapsMainPanel();
		this._addElementToGuiTexture(createControlsInfoHelper());
	}

	public update() {
		this._mainNavbarInstance?.update();
	}

	public dispose() {
		this._kbInputController = null;
	}

	public setPickedUpItem(item: Nullable<InventoryItemGUIElement>) {
		const currentScene = ScenesController.getInstance().currentSceneInstance;
		this._pickedUpItem = item;

		if (item) {
			currentScene?.onPointerObservable.add(this._onMouseMove, PointerEventTypes.POINTERMOVE);
		} else {
			currentScene?.onPointerObservable.removeCallback(this._onMouseMove);
		}
	}

	private _onMouseMove() {
		if (this._pickedUpItem) {
			// Detect slot based on item position
			const targetSlot = this._detectTargetSlotForItem();

			if (targetSlot && targetSlot !== this._currentTargetSlot) {
				this._currentTargetSlot?.setAsEmpty();
				targetSlot.setAsPreview();
				this._currentTargetSlot = targetSlot;
			} else if (!targetSlot && this._currentTargetSlot) {
				this._currentTargetSlot?.setAsEmpty();
				this._currentTargetSlot = null;
			}
		}
	}

	private _detectTargetSlotForItem(): InventorySlotGUIElement | null {
		let returnValue = null;
		const currentScene = ScenesController.getInstance().currentSceneInstance;

		this._getVisibleInventoryGridInstances().forEach((inventoryGridInstance) => {
			inventoryGridInstance.slots.forEach((row) => {
				row.forEach((slot) => {
					if (slot.isEmpty) {
						if (currentScene) {
							const condition = slot.contains(currentScene.pointerX, currentScene.pointerY);
							if (condition) {
								returnValue = slot;
							}
						}
					}
				});
			});
		});

		return returnValue;
	}

	/**
	 * @method
	 * @access private
	 * @description Collects currently visible inventory grid GUI instances for the player.	 *
	 * @returns {InventoryGridGUIElement[]} Visible inventory grid instances (empty if none).
	 */
	private _getVisibleInventoryGridInstances(): InventoryGridGUIElement[] {
		const returnValue: InventoryGridGUIElement[] = [];

		if (this._isInventoryMainPanelOpen && this._inventoryMainPanelInstance?.inventoryGridInstance) {
			returnValue.push(this._inventoryMainPanelInstance.inventoryGridInstance);
		}

		return returnValue;
	}

	private _addElementToGuiTexture(elementToAdd: Control) {
		this._guiTexture.addControl(elementToAdd);
	}

	private _createMainNavBar() {
		this._mainNavbarInstance = new MainNavbarGUI({ characterInstance: this.characterInstance });
		this._addElementToGuiTexture(this._mainNavbarInstance);
	}

	private _createInventoryMainPanel() {
		this._inventoryMainPanelInstance = new InventoryMainPanelGUI({ characterInstance: this.characterInstance });
		this._inventoryMainPanelInstance.isVisible = false;
		this._addElementToGuiTexture(this._inventoryMainPanelInstance);
	}

	private _createWarpMapsMainPanel() {
		this._warpMapsMainPanelInstance = new WarpMapsMainPanelGUI({ characterInstance: this.characterInstance });
		this._warpMapsMainPanelInstance.isVisible = false;
		this._addElementToGuiTexture(this._warpMapsMainPanelInstance);
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
			this._inventoryMainPanelInstance.show();
		}
	}

	private _closeInventoryPanel() {
		if (this._inventoryMainPanelInstance) {
			this._isInventoryMainPanelOpen = false;
			this._inventoryMainPanelInstance.hide();
		}
	}

	private _openWarpMapsPanel() {
		if (this._warpMapsMainPanelInstance) {
			this._isWarpMapsMainPanelOpen = true;
			this._warpMapsMainPanelInstance.show();
		}
	}

	private _closeWarpMapsPanel() {
		if (this._warpMapsMainPanelInstance) {
			this._isWarpMapsMainPanelOpen = false;
			this._warpMapsMainPanelInstance.hide();
		}
	}

	get isInventoryMainPanelOpen(): boolean {
		return this._isInventoryMainPanelOpen;
	}
}

export default PlayerCharacterGUIController;
