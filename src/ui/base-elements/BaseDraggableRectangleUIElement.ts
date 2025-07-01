import { PointerEventTypes, Vector2 } from '@babylonjs/core';

import { IBaseDraggableRectangleUIElementConstructorParams } from '@mmorpg/interfaces/ui/base-elements/IBaseDraggableRectangleUIElement';
import BaseRectangleUIElement from '@mmorpg/ui/base-elements/BaseRectangleUIElement';
import ScenesController from '@mmorpg/controllers/ScenesController';
import GameController from '@mmorpg/controllers/GameController';

abstract class BaseDraggableRectangleUIElement extends BaseRectangleUIElement {
	private _isDragging: boolean = false;
	private _pointerPositionWhenStartDragging: Vector2 = new Vector2();

	constructor(params: IBaseDraggableRectangleUIElementConstructorParams) {
		super(params);
		this._initializeDragEvents();
	}

	private _initializeDragEvents(): void {
		const currentScene = ScenesController.getInstance().currentSceneInstance;
		this.onPointerDownObservable.add((pointerInfo) => {
			this._isDragging = true;
			this._pointerPositionWhenStartDragging.x = pointerInfo.x - this.leftInPixels;
			this._pointerPositionWhenStartDragging.y = pointerInfo.y - this.topInPixels;
			console.log(`pointerDown | pointerInfo x=${pointerInfo.x} y=${pointerInfo.y}`);
			currentScene?.activeCamera.turnOffMovementControls();
		});

		this.onPointerUpObservable.add(() => {
			this._isDragging = false;
			currentScene?.activeCamera.turnOnMovementControls();
		});

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
