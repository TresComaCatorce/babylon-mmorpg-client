import { Camera, Nullable, Vector3 } from '@babylonjs/core';

import IBasicMovementControllerConstructorParams from '@mmorpg/interfaces/controllers/player/IBasicMovementController';
import KeyboardInputController from '@mmorpg/controllers/input/KeyboardInputController';
import PlayerCharacter from '@mmorpg/entities/characters/PlayerCharacter';
import MOVEMENT_STATES from '@mmorpg/utils/constants/MOVEMENT_STATES';
import ScenesController from '../ScenesController';

class BasicMovementController {
	private _playerCharacterInstance: PlayerCharacter;
	private _kbInputController: Nullable<KeyboardInputController> = null;
	private _camera: Nullable<Camera> = null;
	private _movementState: string;
	private _movementDirection: Vector3 = Vector3.Zero();
	private _isMovingForward: boolean = false;
	private _isMovingBackward: boolean = false;
	private _isMovingLeft: boolean = false;
	private _isMovingRight: boolean = false;
	private _isMoving: boolean = false;

	constructor(params: IBasicMovementControllerConstructorParams) {
		this._playerCharacterInstance = params.playerCharacter;
		this._movementState = MOVEMENT_STATES.IDLE;
		this._setKeyboardInputController();
		this._setCamera();
		this._addGlowSwitch();
	}

	public update() {
		this._setMovingVariables();
		this._calculateMoveDirection();
		this._setMovementState();
	}

	private _setKeyboardInputController() {
		this._kbInputController = this._playerCharacterInstance.keyboardInputController;
	}

	private _setCamera() {
		const currentScene = ScenesController.getInstance().currentSceneInstance;
		if (currentScene?.activeCamera) {
			this._camera = currentScene?.activeCamera;
		}
	}

	private _setMovingVariables() {
		this._isMovingForward = this._kbInputController?.isKeyPressed('w') ?? false;
		this._isMovingBackward = this._kbInputController?.isKeyPressed('s') ?? false;
		this._isMovingLeft = this._kbInputController?.isKeyPressed('a') ?? false;
		this._isMovingRight = this._kbInputController?.isKeyPressed('d') ?? false;
		this._isMoving = this._isMovingForward || this._isMovingBackward || this._isMovingLeft || this._isMovingRight;
	}

	private _calculateMoveDirection() {
		if (this._isMoving) {
			// Forward direction of the camera, projected to the XZ plane
			const cameraForward = this._camera?.getForwardRay().direction;
			const forwardXZ = new Vector3(cameraForward?.x, 0, cameraForward?.z).normalize();

			// Base rotated on the Y axis
			const cameraRight = Vector3.Cross(forwardXZ, Vector3.Up()).normalize();

			if (this._isMovingForward) this._movementDirection = this._movementDirection.add(forwardXZ);
			if (this._isMovingBackward) this._movementDirection = this._movementDirection.subtract(forwardXZ);
			if (this._isMovingLeft) this._movementDirection = this._movementDirection.add(cameraRight);
			if (this._isMovingRight) this._movementDirection = this._movementDirection.subtract(cameraRight);

			this._movementDirection.normalize();
		} else {
			this._movementDirection = Vector3.Zero();
		}
	}

	private _setMovementState() {
		if (this._isMoving) {
			this._movementState = MOVEMENT_STATES.WALKING;
		} else {
			this._movementState = MOVEMENT_STATES.IDLE;
		}
	}

	private _addGlowSwitch() {
		this._kbInputController?.addToggleKey('g', {
			onSwitchON: () => this._playerCharacterInstance.addGlow(),
			onSwitchOFF: () => this._playerCharacterInstance.removeGlow(),
		});
	}

	get movementState(): string {
		return this._movementState;
	}

	get movementDirection(): Vector3 {
		return this._movementDirection;
	}
}

export default BasicMovementController;
