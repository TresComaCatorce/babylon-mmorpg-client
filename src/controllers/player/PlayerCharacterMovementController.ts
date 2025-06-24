import { Camera, Nullable, Vector3 } from '@babylonjs/core';

import IPlayerCharacterMovementControllerConstructorParams from '@mmorpg/interfaces/controllers/player/IPlayerCharacterMovementController';
import CharacterMovementController from '@mmorpg/controllers/character/CharacterMovementController';
import KeyboardInputController from '@mmorpg/controllers/input/KeyboardInputController';
import PlayerCharacter from '@mmorpg/game-objects/characters/PlayerCharacter';
import MOVEMENT_STATES from '@mmorpg/utils/constants/MOVEMENT_STATES';
import ScenesController from '@mmorpg/controllers/ScenesController';
import KEY_CODES from '@mmorpg/utils/constants/KEY_CODES';

class PlayerCharacterMovementController extends CharacterMovementController {
	protected _characterInstance: PlayerCharacter;
	private _kbInputController: Nullable<KeyboardInputController> = null;
	private _camera: Nullable<Camera> = null;

	constructor(params: IPlayerCharacterMovementControllerConstructorParams) {
		super(params);
		this._characterInstance = params.characterInstance;
		this._characterMesh = params.characterInstance.rootNode ?? null;
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

		this._debugInputs();
	}

	public dispose() {
		this._kbInputController = null;
		this._camera = null;
	}

	private _setKeyboardInputController() {
		this._kbInputController = this._characterInstance.keyboardInputController;
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
			let speedToUse = this._characterInstance.walkSpeed;
			let accelerationToUse = this._characterInstance.walkAcceleration;
			if (this._isRunning || this._isRunningLocked) {
				speedToUse = this._characterInstance.runSpeed;
				accelerationToUse = this._characterInstance.runAcceleration;
			}
			this._accelerationProgress += accelerationToUse;
			if (this._accelerationProgress > 1) {
				this._accelerationProgress = 1;
			}

			const accelerationCurve = Math.pow(this._accelerationProgress, 2);
			this._currentSpeed = accelerationCurve * speedToUse;

			const moveStep = this._movementDirection.scale(this._currentSpeed);
			this._characterMesh?.moveWithCollisions(moveStep);
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

	private _debugInputs() {
		if (this._kbInputController?.isKeyPressed(KEY_CODES.PLUS)) {
			console.log('Add 250HP');
			this._characterInstance.addHP(250);
		}
		if (this._kbInputController?.isKeyPressed(KEY_CODES.MINUS)) {
			console.log('Decrease 250HP');
			this._characterInstance.decreaseHP(250);
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
				onSwitchON: () => this._characterInstance.addGlow(),
				onSwitchOFF: () => this._characterInstance.removeGlow(),
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

export default PlayerCharacterMovementController;
