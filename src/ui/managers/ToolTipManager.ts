import { AdvancedDynamicTexture, Rectangle, Control } from '@babylonjs/gui';

import { IToolTipManagerAttachParams } from '@mmorpg/interfaces/ui/managers/IToolTipManager';
import GUI_ELEMENT_NAMES from '@mmorpg/utils/constants/GUI_ELEMENT_NAMES';
import GameController from '@mmorpg/controllers/GameController';
import GUIController from '@mmorpg/controllers/GUIController';

class ToolTipManager {
	private static _instance: ToolTipManager;
	private _toolTipContainer!: Rectangle;
	private _toolTipContent!: Control;
	private _guiLayer!: AdvancedDynamicTexture;
	private _initialized = false;
	private _pointerX = 0;
	private _pointerY = 0;

	public static getInstance() {
		if (!ToolTipManager._instance) {
			ToolTipManager._instance = new ToolTipManager();
		}
		return ToolTipManager._instance;
	}

	private constructor() {
		this._addToolTipMouseMoveEvent();
	}

	public initialize(): void {
		if (this._initialized) {
			this.dispose();
		}
		this._guiLayer = GUIController.getInstance().guiAdvanceDynamicTexture;
		this._createToolTipContainer();
		this._addToolTipToGUILayer();
		this._initialized = true;
	}

	public dispose() {
		this._initialized = false;
		this._toolTipContent?.dispose();
		this._toolTipContainer?.dispose();
	}

	public attach(params: IToolTipManagerAttachParams): void {
		params.owner.onPointerEnterObservable.add(() => {
			if (this._initialized) {
				this._toolTipContent = params.content;
				this._toolTipContent.shadowBlur = 10;
				this._toolTipContent.shadowOffsetX = 10;
				this._toolTipContent.shadowOffsetY = 10;
				this._toolTipContent.shadowColor = 'black';
				this._toolTipContainer.addControl(this._toolTipContent);
				this._toolTipContainer.isVisible = true;
			}
		});

		params.owner.onPointerOutObservable.add(() => {
			if (this._initialized) {
				this.hide();
			}
		});
	}

	public hide(): void {
		this._toolTipContainer.isVisible = false;
		if (this._toolTipContent) {
			this._toolTipContainer.removeControl(this._toolTipContent);
		}
	}

	private _createToolTipContainer() {
		this._toolTipContainer = new Rectangle(GUI_ELEMENT_NAMES.TOOLTIP);
		this._toolTipContainer.isVisible = false;
		this._toolTipContainer.thickness = 0;
		this._toolTipContainer.zIndex = 1000;
		this._toolTipContainer.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
		this._toolTipContainer.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
		this._toolTipContainer.adaptWidthToChildren = true;
		this._toolTipContainer.adaptHeightToChildren = true;
		this._toolTipContainer.shadowColor = 'black';
		this._toolTipContainer.shadowOffsetX = 5;
		this._toolTipContainer.shadowOffsetY = 5;
		this._toolTipContainer.shadowBlur = 8;
	}

	private _addToolTipToGUILayer() {
		this._guiLayer.addControl(this._toolTipContainer);
	}

	private _addToolTipMouseMoveEvent() {
		const canvasElement = GameController.getInstance().canvasElement;

		canvasElement.addEventListener('mousemove', (event: MouseEvent) => {
			const canvasElementPosition = canvasElement.getBoundingClientRect();

			this._pointerX = event.clientX;
			this._pointerY = event.clientY;

			if (this._toolTipContainer.isVisible) {
				console.log(`Pointer x:${this._pointerX} y:${this._pointerY} | canvas: `, canvasElementPosition);
				this._toolTipContainer.leftInPixels = this._pointerX - canvasElementPosition.left + 15;
				this._toolTipContainer.topInPixels = this._pointerY - canvasElementPosition.top + 15;
			}
		});
	}
}

export default ToolTipManager;
