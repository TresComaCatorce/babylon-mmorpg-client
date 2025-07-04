import { PointerEventTypes, Vector2 } from '@babylonjs/core';
import { Control, Rectangle } from '@babylonjs/gui';

import BaseRectangleUIElement from '@mmorpg/ui/base-elements/BaseRectangleUIElement';
import {
	IBaseDraggableRectangleUIElementConstructorParams,
	percentageArea2D,
} from '@mmorpg/interfaces/ui/base-elements/IBaseDraggableRectangleUIElement';
import GUI_ELEMENT_NAMES from '@mmorpg/utils/constants/GUI_ELEMENT_NAMES';
import ScenesController from '@mmorpg/controllers/ScenesController';
import MOUSE_CURSORS from '@mmorpg/utils/constants/MOUSE_CURSORS';
import GameController from '@mmorpg/controllers/GameController';

abstract class BaseDraggableRectangleUIElement extends BaseRectangleUIElement {
	private _isDragging: boolean = false;
	private _pointerPositionWhenStartDragging: Vector2 = new Vector2();
	private _dragControlArea: Rectangle = new Rectangle(`${this.elementName}${GUI_ELEMENT_NAMES.DRAGGABLE_CONTROL}`);

	constructor(params: IBaseDraggableRectangleUIElementConstructorParams) {
		super(params);
		this._configureDragControlArea(params.dragControlAreaPercentage);
		this._initializeDragEvents();
	}

	private _configureDragControlArea(dragControlAreaPercentage?: percentageArea2D) {
		this._setupDragControlResizeEvent(dragControlAreaPercentage);
		this._setupDragControlAreaMousePointer();
		this._setupDragControlAreaAlignments();
		this._dragControlArea.background = 'blue';
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
			document.body.style.cursor = MOUSE_CURSORS.MOVE;
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
			// Ignore all events except "POINTERMOVE" event type
			if (!this._isDragging || pointerInfo.type !== PointerEventTypes.POINTERMOVE) return;

			// Get canvas position to calculate correct movement
			const canvasPosition = GameController.getInstance().canvasElement.getBoundingClientRect();

			// Move the draggable element
			this.leftInPixels = pointerInfo.event.clientX - canvasPosition.left - this._pointerPositionWhenStartDragging.x;
			this.topInPixels = pointerInfo.event.clientY - canvasPosition.top - this._pointerPositionWhenStartDragging.y;
		});
	}
}

export default BaseDraggableRectangleUIElement;
