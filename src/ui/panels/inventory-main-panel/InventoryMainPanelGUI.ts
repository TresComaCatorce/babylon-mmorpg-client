import { Nullable } from '@babylonjs/core';

import { IInventoryMainPanelGUIConstructorParams } from '@mmorpg/interfaces/ui/panels/inventory-main-panel/IInventoryMainPanelGUI';
import IPlayerCharacterRelated from '@mmorpg/interfaces/common-interfaces/IPlayerCharacterRelated';
import InventoryGridGUIElement from '@mmorpg/ui/common-elements/inventory/InventoryGridGUIElement';
import PlayerCharacter from '@mmorpg/game-objects/characters/PlayerCharacter';
import GUI_ELEMENT_NAMES from '@mmorpg/utils/constants/GUI_ELEMENT_NAMES';
import BaseMainPanelGUI from '@mmorpg/ui/panels/BaseMainPanelGUI';
import GameController from '@mmorpg/controllers/GameController';
import KEY_CODES from '@mmorpg/utils/constants/KEY_CODES';

class InventoryMainPanelGUI extends BaseMainPanelGUI implements IPlayerCharacterRelated {
	private _characterInstance: PlayerCharacter;
	private _inventoryGridInstance: Nullable<InventoryGridGUIElement> = null;

	constructor(params: IInventoryMainPanelGUIConstructorParams) {
		super({
			elementName: GUI_ELEMENT_NAMES.INVENTORY_PANEL,
			closePanel: () => {
				this._characterInstance.keyboardInputController?.simulateToggleKeyPressed(KEY_CODES.V);
			},
			title: `Inventory [${params.characterInstance.name}]`,
		});
		this._characterInstance = params.characterInstance;
		this._drawContent();
	}

	protected _setDefaultPosition() {
		const canvasElement = GameController.getInstance().canvasElement;
		this.leftInPixels = canvasElement.width - this.widthInPixels - canvasElement.width * 0.01;
		this.topInPixels = canvasElement.height / 2 - this.heightInPixels / 2;
	}

	protected _setSize() {
		this.widthInPixels = 25 * 14 + 4; // 25px * 14 inventory slots + 4px of border (2px * 2)
		this.heightInPixels = 25 * 28 + 35; // 25px * 28 inventory slots + height of panel title
	}

	protected _setupLookAndFeel() {
		this.background = 'black';
		this._dragControlArea.thickness = 0;
	}

	private _drawContent() {
		const inventoryController = this._characterInstance.inventoryController;
		if (inventoryController) {
			const inventory = inventoryController.inventory;
			if (inventory) {
				this._inventoryGridInstance = new InventoryGridGUIElement({
					elementName: `${GUI_ELEMENT_NAMES.INVENTORY_PANEL}${GUI_ELEMENT_NAMES.GRID}`,
					associatedInventory: inventory,
				});
				this._addToPanelContentContainer(this._inventoryGridInstance);
			} else {
				throw new Error('InventoryMainPanelGUI.ts | _drawContent | Error "inventory" doesn\'t exist');
			}
		} else {
			throw new Error('InventoryMainPanelGUI.ts | _drawContent | Error "inventoryController" doesn\'t exist');
		}
	}

	get characterInstance(): PlayerCharacter {
		return this._characterInstance;
	}

	get inventoryGridInstance(): Nullable<InventoryGridGUIElement> {
		return this._inventoryGridInstance;
	}
}

export default InventoryMainPanelGUI;
