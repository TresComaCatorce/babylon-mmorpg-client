import { PointerEventTypes, Vector2 } from '@babylonjs/core';
import { Control, Rectangle } from '@babylonjs/gui';

import BaseRectangleGUIElement from '@mmorpg/ui/base-elements/BaseRectangleGUIElement';
import {
	IBaseDraggableRectangleGUIElementConstructorParams,
	percentageArea2D,
} from '@mmorpg/interfaces/ui/base-elements/IBaseDraggableRectangleGUIElement';
import GUI_ELEMENT_NAMES from '@mmorpg/utils/constants/GUI_ELEMENT_NAMES';
import ScenesController from '@mmorpg/controllers/ScenesController';
import MOUSE_CURSORS from '@mmorpg/utils/constants/MOUSE_CURSORS';
import GameController from '@mmorpg/controllers/GameController';

abstract class BaseDraggableRectangleGUIElement extends BaseRectangleGUIElement {
	private _isDragging: boolean = false;
	private _pointerPositionWhenStartDragging: Vector2 = new Vector2();
	private _lastValidPosition: Vector2 = new Vector2();
	protected _dragControlArea: Rectangle = new Rectangle(`${this.elementName}${GUI_ELEMENT_NAMES.DRAGGABLE_CONTROL}`);

	constructor(params: IBaseDraggableRectangleGUIElementConstructorParams) {
		super(params);
		this._configureDragControlArea(params.dragControlAreaPercentage);
		this._initializeDragEvents();
	}

	private _configureDragControlArea(dragControlAreaPercentage?: percentageArea2D) {
		this._setupDragControlResizeEvent(dragControlAreaPercentage);
		this._setupDragControlAreaMousePointer();
		this._setupDragControlAreaAlignments();
		this.addControl(this._dragControlArea);
	}

	private _setupDragControlResizeEvent(dragControlAreaPercentage?: percentageArea2D) {
		this.onResizeObservable.add(({ width, height }) => {
			const horizontalPercentage = dragControlAreaPercentage ? dragControlAreaPercentage.horizontalPercentage : 100;
			const verticalPercentage = dragControlAreaPercentage ? dragControlAreaPercentage.verticalPercentage : 100;
			this._dragControlArea.widthInPixels = width * (horizontalPercentage / 100);
			this._dragControlArea.heightInPixels = height * (verticalPercentage / 100);
		});
	}

	private _setupDragControlAreaMousePointer() {
		this._dragControlArea.onPointerEnterObservable.add(() => {
			document.body.style.cursor = MOUSE_CURSORS.GRAB;
		});
		this._dragControlArea.onPointerOutObservable.add(() => {
			document.body.style.cursor = MOUSE_CURSORS.DEFAULT;
		});
	}

	private _setupDragControlAreaAlignments() {
		this._dragControlArea.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
		this._dragControlArea.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
	}

	private _initializeDragEvents() {
		this._initializeDragPointerDownEvent();
		this._initializeDragPointerUpEvent();
		this._initializeDragPointerMoveEvent();
	}

	private _initializeDragPointerDownEvent() {
		const currentScene = ScenesController.getInstance().currentSceneInstance;
		this._dragControlArea.onPointerDownObservable.add((pointerInfo) => {
			this._isDragging = true;
			this._pointerPositionWhenStartDragging.x = pointerInfo.x - this.leftInPixels;
			this._pointerPositionWhenStartDragging.y = pointerInfo.y - this.topInPixels;
			currentScene?.activeCamera.turnOffMovementControls();
		});
	}

	private _initializeDragPointerUpEvent() {
		const currentScene = ScenesController.getInstance().currentSceneInstance;
		this._dragControlArea.onPointerUpObservable.add(() => {
			this._isDragging = false;
			currentScene?.activeCamera.turnOnMovementControls();
		});
	}

	private _initializeDragPointerMoveEvent() {
		const currentScene = ScenesController.getInstance().currentSceneInstance;
		currentScene?.onPointerObservable.add((pointerInfo) => {
			// Ignore if element is not being dragged
			if (!this._isDragging) return;

			// Get canvas position to calculate correct movement
			const canvasPosition = GameController.getInstance().canvasElement.getBoundingClientRect();

			// Move the draggable element
			const auxLeftInPixels = pointerInfo.event.clientX - canvasPosition.left - this._pointerPositionWhenStartDragging.x;
			const auxTopInPixels = pointerInfo.event.clientY - canvasPosition.top - this._pointerPositionWhenStartDragging.y;

			const validation = this._panelIsOnScreen({ leftInPixels: auxLeftInPixels, topInPixels: auxTopInPixels }, canvasPosition);

			// Update X axis only if is valid
			if (validation.xIsValid) {
				this.leftInPixels = auxLeftInPixels;
				this._lastValidPosition.x = Math.trunc(auxLeftInPixels);
			} else {
				this.leftInPixels = this._lastValidPosition.x;
			}

			// Update Y axis only if valid
			if (validation.yIsValid) {
				this.topInPixels = auxTopInPixels;
				this._lastValidPosition.y = Math.trunc(auxTopInPixels);
			} else {
				this.topInPixels = this._lastValidPosition.y;
			}
		}, PointerEventTypes.POINTERMOVE);
	}

	private _panelIsOnScreen(positionToCheck: { leftInPixels: number; topInPixels: number }, canvasPosition: DOMRect) {
		const panelLeft = Math.trunc(positionToCheck.leftInPixels);
		const panelTop = Math.trunc(positionToCheck.topInPixels);
		const panelRight = Math.trunc(positionToCheck.leftInPixels + this.widthInPixels);
		const panelBottom = Math.trunc(positionToCheck.topInPixels + this.heightInPixels);

		const canvasMaxX = canvasPosition.width;
		const canvasMaxY = canvasPosition.height;

		const xIsValid = panelLeft >= 0 && panelRight <= canvasMaxX;
		const yIsValid = panelTop >= 0 && panelBottom <= canvasMaxY;

		return { xIsValid, yIsValid };
	}
}

export default BaseDraggableRectangleGUIElement;
