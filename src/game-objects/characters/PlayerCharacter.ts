import { AbstractMesh, Color3, Nullable, PBRMaterial } from '@babylonjs/core';

import PlayerCharacterAnimationsController from '@mmorpg/controllers/player/PlayerCharacterAnimationsController';
import PlayerCharacterMovementController from '@mmorpg/controllers/player/PlayerCharacterMovementController';
import { IPlayerCharacterConstructorParams } from '@mmorpg/interfaces/game-objects/characters/IPlayerCharacter';
import KeyboardInputController from '@mmorpg/controllers/input/KeyboardInputController';
import InventoryController from '@mmorpg/controllers/character/InventoryController';
import BaseCharacter from '@mmorpg/game-objects/characters/BaseCharacter';
import ScenesController from '@mmorpg/controllers/ScenesController';
import FollowPlayerCamera from '@mmorpg/camera/FollowPlayerCamera';

class PlayerCharacter extends BaseCharacter {
	private _walkSpeed: number = 0.08;
	private _walkAcceleration: number = 0.1;
	private _runSpeed: number = 0.16;
	private _runAcceleration: number = 0.1;

	private _kbInputController: Nullable<KeyboardInputController> = null;
	private _movementController: Nullable<PlayerCharacterMovementController> = null;
	private _animationController: Nullable<PlayerCharacterAnimationsController> = null;
	private _inventoryController: Nullable<InventoryController> = null;

	constructor(params: IPlayerCharacterConstructorParams) {
		super(params);
	}

	public update() {
		const currentScene = ScenesController.getInstance().currentSceneInstance;
		this._movementController?.update();
		currentScene?.activeCamera?.update();
		this._animationController?.update();
	}

	protected _onMeshLoaded() {
		this._createPlayerCamera();
		this._createKbInputController();
		this._createMovementController();
		this._createAnimationsController();
		this._createInventoryController();
	}

	private _createPlayerCamera() {
		const currentScene = ScenesController.getInstance().currentSceneInstance;
		if (this.rootNode) {
			currentScene?.setActiveCamera(
				new FollowPlayerCamera({
					scene: currentScene,
					playerMesh: this.rootNode,
				}),
			);
		}
	}

	private _createKbInputController() {
		const currentScene = ScenesController.getInstance().currentSceneInstance;
		if (currentScene) {
			this._kbInputController = new KeyboardInputController({ scene: currentScene });
		}
	}

	private _createMovementController() {
		this._movementController = new PlayerCharacterMovementController({
			characterInstance: this,
		});
	}

	private _createAnimationsController() {
		this._animationController = new PlayerCharacterAnimationsController({
			characterInstance: this,
		});
	}

	private _createInventoryController() {
		// this._inventoryController = new InventoryController();
	}

	public addGlow() {
		ScenesController.getInstance().currentSceneInstance?.meshes.forEach((mesh: AbstractMesh) => {
			if (mesh && mesh.id === 'texture_class-warrior_v1.jpg' && mesh.material && mesh.material instanceof PBRMaterial) {
				mesh.material.emissiveTexture = mesh.material.albedoTexture;
				mesh.material.emissiveColor = new Color3(1.0, 0.8, 0.2).scale(0.75);
			}
		});
	}

	public removeGlow() {
		const scene = ScenesController.getInstance().currentSceneInstance;
		if (!scene) return;

		scene.meshes.forEach((mesh) => {
			if (mesh && mesh.id === 'texture_class-warrior_v1.jpg' && mesh.material && mesh.material instanceof PBRMaterial) {
				mesh.material.emissiveTexture = null;
				mesh.material.emissiveColor = Color3.Black();
			}
		});
	}

	get keyboardInputController(): Nullable<KeyboardInputController> {
		return this._kbInputController;
	}

	get movementController(): Nullable<PlayerCharacterMovementController> {
		return this._movementController;
	}

	get walkSpeed(): number {
		return this._walkSpeed;
	}

	get walkAcceleration(): number {
		return this._walkAcceleration;
	}

	get runSpeed(): number {
		return this._runSpeed;
	}

	get runAcceleration(): number {
		return this._runAcceleration;
	}
}

export default PlayerCharacter;
