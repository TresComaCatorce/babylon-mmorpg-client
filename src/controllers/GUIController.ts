import { AdvancedDynamicTexture } from '@babylonjs/gui';

import BaseController from '@mmorpg/controllers/base/BaseController';
import ScenesController from '@mmorpg/controllers/ScenesController';
import ToolTipManager from '@mmorpg/ui/managers/ToolTipManager';

class GUIController extends BaseController {
	private static _instance: GUIController;
	private _guiAdvanceDynamicTexture: AdvancedDynamicTexture;

	/**
	 * @static
	 * @description Returns the singleton instance of GUIController, creating it if necessary.
	 * @access public
	 * @returns {GUIController} The singleton instance.
	 */
	public static getInstance(): GUIController {
		if (!GUIController._instance) {
			GUIController._instance = new GUIController();
		}
		return GUIController._instance;
	}

	/**
	 * @description Private constructor to enforce singleton pattern.
	 * @access private
	 */
	private constructor() {
		super();
		this._guiAdvanceDynamicTexture = this._createGuiAdvanceDynamicTexture();
	}

	/**
	 * @description Disposes of the current scene and stops the render loop.
	 * @access public
	 * @returns {void}
	 */
	public dispose(): void {
		this._disposeGuiAdvanceDynamicTexture();
	}

	public assignCurrentScene() {
		this._disposeGuiAdvanceDynamicTexture();
		this._guiAdvanceDynamicTexture = this._createGuiAdvanceDynamicTexture();
		this._initializeGuiManagers();
	}

	private _createGuiAdvanceDynamicTexture() {
		return AdvancedDynamicTexture.CreateFullscreenUI('Global GUI Texture', true, ScenesController.getInstance().currentSceneInstance);
	}

	private _disposeGuiAdvanceDynamicTexture() {
		this._guiAdvanceDynamicTexture.dispose();
	}

	private _initializeGuiManagers() {
		ToolTipManager.getInstance().initialize();
	}

	get guiAdvanceDynamicTexture(): AdvancedDynamicTexture {
		return this._guiAdvanceDynamicTexture;
	}
}

export default GUIController;
