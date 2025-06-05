import { AdvancedDynamicTexture, Control } from '@babylonjs/gui';

import BaseController from '@mmorpg/controllers/BaseController';
import BaseCharacter from '@mmorpg/entities/characters/BaseCharacter';
import { IAddUIElementParams, IRemoveUIElementParams } from '@mmorpg/interfaces/controllers/ui/IUIController';
import CharacterNameUIElement from '@mmorpg/ui/CharacterNameUIElement';
import GUI_ELEMENT_NAMES from '@mmorpg/utils/constants/GUI_ELEMENT_NAMES';

class UIController extends BaseController {
	/**
	 * @static
	 * @description Singleton instance of UIController.
	 * @access private
	 */
	private static _instance: UIController | undefined;
	private _guiTexture: AdvancedDynamicTexture;
	private _uiElements: Map<string, Control>;

	private constructor() {
		super();
		this._guiTexture = AdvancedDynamicTexture.CreateFullscreenUI('UITexture');
		this._uiElements = new Map<string, Control>();
	}

	/**
	 * @static
	 * @description Returns the singleton instance of UIController, creating it if necessary.
	 * @access public
	 * @returns {UIController} The singleton instance.
	 */
	public static getInstance(): UIController {
		if (UIController._instance === undefined) {
			UIController._instance = new UIController();
		}
		return UIController._instance;
	}

	public dispose() {}

	public addCharacterNameUIElement(characterInstance: BaseCharacter) {
		this._addUIElement({
			uiElementName: GUI_ELEMENT_NAMES.CHARACTER_NAME,
			uiElementInstance: new CharacterNameUIElement({ characterInstance: characterInstance }),
		});
	}

	private _addUIElement(params: IAddUIElementParams) {
		if (!this._uiElements.has(params.uiElementName)) {
			this._uiElements.set(params.uiElementName, params.uiElementInstance);
		}
	}

	private _removeUIElement(params: IRemoveUIElementParams) {
		this._uiElements.delete(params.uiElementName);
	}
}

export default UIController;
