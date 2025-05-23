import { AbstractMesh, Camera, Nullable, Vector3 } from '@babylonjs/core';

import IBasicMovementControllerConstructorParams from '@mmorpg/interfaces/controllers/player/IBasicMovementController';
import KeyboardInputController from '@mmorpg/controllers/input/KeyboardInputController';
import PlayerCharacter from '@mmorpg/entities/characters/PlayerCharacter';
import MOVEMENT_STATES from '@mmorpg/utils/constants/MOVEMENT_STATES';
import ScenesController from '../ScenesController';
import KEY_CODES from '@mmorpg/utils/constants/KEY_CODES';

class BasicMovementController {
	private _playerCharacterInstance: PlayerCharacter;
	private _playerCharacterMesh: Nullable<AbstractMesh>;
	private _kbInputController: Nullable<KeyboardInputController> = null;
	private _camera: Nullable<Camera> = null;
	private _movementState: string = MOVEMENT_STATES.IDLE;
	private _movementDirection: Vector3 = Vector3.Zero();
	private _currentSpeed: number = 0;
	private _accelerationProgress: number = 0;
	private _isMovingForward: boolean = false;
	private _isMovingBackward: boolean = false;
	private _isMovingLeft: boolean = false;
	private _isMovingRight: boolean = false;
	private _isMoving: boolean = false;
	private _isRunning: boolean = false;
	private _isRunningLocked: boolean = false;

	constructor(params: IBasicMovementControllerConstructorParams) {
		this._playerCharacterInstance = params.playerCharacter;
		this._playerCharacterMesh = params.playerCharacter.mesh ?? null;
		this._setKeyboardInputController();
		this._setCamera();
		this._addGlowSwitch();
		this._addRunningSwitch();
	}

	public update() {
		this._setMovingVariables();
		this._calculateMoveDirection();
		this._calculateSpeedAndMoveCharacter();
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
		this._isMovingForward = this._kbInputController?.isKeyPressed(KEY_CODES.W) ?? false;
		this._isMovingBackward = this._kbInputController?.isKeyPressed(KEY_CODES.S) ?? false;
		this._isMovingLeft = this._kbInputController?.isKeyPressed(KEY_CODES.A) ?? false;
		this._isMovingRight = this._kbInputController?.isKeyPressed(KEY_CODES.D) ?? false;
		this._isMoving = this._isMovingForward || this._isMovingBackward || this._isMovingLeft || this._isMovingRight;
		this._isRunning = this._kbInputController?.isKeyPressed(KEY_CODES.SHIFT) ?? false;
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

	private _calculateSpeedAndMoveCharacter() {
		if (this._isMoving) {
			let speedToUse = this._playerCharacterInstance.walkSpeed;
			let accelerationToUse = this._playerCharacterInstance.walkAcceleration;
			if (this._isRunning || this._isRunningLocked) {
				speedToUse = this._playerCharacterInstance.runSpeed;
				accelerationToUse = this._playerCharacterInstance.runAcceleration;
			}
			this._accelerationProgress += accelerationToUse;
			if (this._accelerationProgress > 1) {
				this._accelerationProgress = 1;
			}

			const accelerationCurve = Math.pow(this._accelerationProgress, 2);
			this._currentSpeed = accelerationCurve * speedToUse;

			const moveStep = this._movementDirection.scale(this._currentSpeed);
			this._playerCharacterMesh?.moveWithCollisions(moveStep);
		} else {
			this._currentSpeed = 0;
			this._accelerationProgress = 0;
		}
	}

	private _setMovementState() {
		if (this._isMoving) {
			this._movementState = MOVEMENT_STATES.WALKING;
			if (this._isRunning || this._isRunningLocked) {
				this._movementState = MOVEMENT_STATES.RUNNING;
			}
		} else {
			this._movementState = MOVEMENT_STATES.IDLE;
		}
	}

	private _addRunningSwitch() {
		this._kbInputController?.addToggleKey(
			KEY_CODES.BLOCK_MAYUS,
			{
				onSwitchON: () => {
					this._isRunningLocked = true;
				},
				onSwitchOFF: () => {
					this._isRunningLocked = false;
				},
			},
			'Running',
		);
	}

	private _addGlowSwitch() {
		this._kbInputController?.addToggleKey(
			KEY_CODES.G,
			{
				onSwitchON: () => this._playerCharacterInstance.addGlow(),
				onSwitchOFF: () => this._playerCharacterInstance.removeGlow(),
			},
			'Glow',
		);
	}

	get isMoving(): boolean {
		return this._isMoving;
	}

	get movementState(): string {
		return this._movementState;
	}

	get movementDirection(): Vector3 {
		return this._movementDirection;
	}
}

export default BasicMovementController;
