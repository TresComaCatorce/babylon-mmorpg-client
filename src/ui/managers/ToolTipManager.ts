import { AdvancedDynamicTexture, Rectangle, TextBlock, Control } from '@babylonjs/gui';

import GUI_ELEMENT_NAMES from '@mmorpg/utils/constants/GUI_ELEMENT_NAMES';
import GameController from '@mmorpg/controllers/GameController';

const DEFAULT_FONT_SIZE = 13;

class ToolTipManager {
	private static _toolTipContainer: Rectangle;
	private static _toolTipText: TextBlock;
	private static _guiLayer: AdvancedDynamicTexture;
	private static _initialized = false;

	private static _pointerX = 0;
	private static _pointerY = 0;

	public static initialize(ui: AdvancedDynamicTexture): void {
		if (this._initialized) return;
		this._guiLayer = ui;
		this._createToolTipContainer();
		this._createToolTipText();
		this._addToolTipToGUILayer();
		this._initialized = true;
		this._addToolTipMouseMoveEvent();
	}

	public static attach(control: Control, text: string): void {
		control.onPointerEnterObservable.add(() => {
			if (this._initialized) {
				const characterWidth = DEFAULT_FONT_SIZE * 0.5;
				this._toolTipText.text = text;
				this._toolTipText.widthInPixels = characterWidth * text.length;
				this._toolTipContainer.isVisible = true;
			}
		});

		control.onPointerOutObservable.add(() => {
			if (this._initialized) {
				this._toolTipContainer.isVisible = false;
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

	private static _createToolTipText() {
		this._toolTipText = new TextBlock(`${GUI_ELEMENT_NAMES.TOOLTIP}${GUI_ELEMENT_NAMES.TEXT}`, '');
		this._toolTipText.color = 'white';
		this._toolTipText.fontSize = DEFAULT_FONT_SIZE;
		this._toolTipText.textWrapping = true;
		this._toolTipText.resizeToFit = true;
		this._toolTipText.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
		this._toolTipText.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;
		this._toolTipText.paddingTopInPixels = 10;
		this._toolTipText.paddingBottomInPixels = 10;
	}

	private static _addToolTipToGUILayer() {
		this._toolTipContainer.addControl(this._toolTipText);
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
