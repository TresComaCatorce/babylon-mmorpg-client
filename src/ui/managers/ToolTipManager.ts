import { AdvancedDynamicTexture, Rectangle, Control } from '@babylonjs/gui';

import { IToolTipManagerAttachParams, IToolTipManagerInitializeParams } from '@mmorpg/interfaces/ui/managers/IToolTipManager';
import GUI_ELEMENT_NAMES from '@mmorpg/utils/constants/GUI_ELEMENT_NAMES';
import GameController from '@mmorpg/controllers/GameController';

class ToolTipManager {
	private static _toolTipContainer: Rectangle;
	private static _toolTipContent: Control;
	private static _guiLayer: AdvancedDynamicTexture;
	private static _initialized = false;

	private static _pointerX = 0;
	private static _pointerY = 0;

	public static initialize(params: IToolTipManagerInitializeParams): void {
		if (this._initialized) return;
		this._guiLayer = params.guiTexture;
		this._createToolTipContainer();
		this._addToolTipToGUILayer();
		this._initialized = true;
		this._addToolTipMouseMoveEvent();
	}

	public static attach(params: IToolTipManagerAttachParams): void {
		params.owner.onPointerEnterObservable.add(() => {
			if (this._initialized) {
				this._toolTipContent = params.content;
				this._toolTipContainer.addControl(this._toolTipContent);
				this._toolTipContainer.isVisible = true;
			}
		});

		params.owner.onPointerOutObservable.add(() => {
			if (this._initialized) {
				this._toolTipContainer.isVisible = false;
				this._toolTipContainer.removeControl(this._toolTipContent);
			}
		});
	}

	public static hide(): void {
		this._toolTipContainer.isVisible = false;
	}

	private static _createToolTipContainer() {
		this._toolTipContainer = new Rectangle(GUI_ELEMENT_NAMES.TOOLTIP);
		this._toolTipContainer.isVisible = false;
		this._toolTipContainer.background = 'black';
		this._toolTipContainer.thickness = 0;
		this._toolTipContainer.alpha = 0.85;
		this._toolTipContainer.cornerRadius = 6;
		this._toolTipContainer.zIndex = 1000;
		this._toolTipContainer.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
		this._toolTipContainer.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
		this._toolTipContainer.adaptWidthToChildren = true;
		this._toolTipContainer.adaptHeightToChildren = true;
	}

	private static _addToolTipToGUILayer() {
		this._guiLayer.addControl(this._toolTipContainer);
	}

	private static _addToolTipMouseMoveEvent() {
		const canvasElement = GameController.getInstance().canvasElement;
		const canvasElementPosition = canvasElement.getBoundingClientRect();
		canvasElement.addEventListener('mousemove', (e: MouseEvent) => {
			this._pointerX = e.clientX;
			this._pointerY = e.clientY;

			if (this._toolTipContainer.isVisible) {
				this._toolTipContainer.leftInPixels = this._pointerX - canvasElementPosition.left + 10;
				this._toolTipContainer.topInPixels = this._pointerY - canvasElementPosition.top + 10;
			}
		});
	}
}

export default ToolTipManager;
