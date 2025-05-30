import { AbstractMesh, Color3, Nullable, PBRMaterial } from '@babylonjs/core';

import { IPlayerCharacterConstructorParams } from '@mmorpg/interfaces/entities/characters/IPlayerCharacter';
import BasicMovementController from '@mmorpg/controllers/player/BasicMovementController';
import KeyboardInputController from '@mmorpg/controllers/input/KeyboardInputController';
import BaseCharacter from '@mmorpg/entities/characters/BaseCharacter';
import ScenesController from '@mmorpg/controllers/ScenesController';
import FollowPlayerCamera from '@mmorpg/camera/FollowPlayerCamera';
import BaseScene from '@mmorpg/scenes/BaseScene';
import AnimationController from '@mmorpg/controllers/player/AnimationController';

class PlayerCharacter extends BaseCharacter {
	private _walkSpeed: number = 0.08;
	private _walkAcceleration: number = 0.1;
	private _runSpeed: number = 0.16;
	private _runAcceleration: number = 0.1;

	private _name: string;
	private _kbInputController: Nullable<KeyboardInputController> = null;
	private _movementController: Nullable<BasicMovementController> = null;
	private _animationController: Nullable<AnimationController> = null;

	constructor(params: IPlayerCharacterConstructorParams) {
		super({ modelPath: 'assets/models/warrior.glb' });
		this._name = params.name;
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
		this._createAnimationController();
	}

	private _createPlayerCamera() {
		const currentScene = ScenesController.getInstance().currentSceneInstance;
		currentScene?.setActiveCamera(
			new FollowPlayerCamera({
				scene: <BaseScene>currentScene,
				playerMesh: <AbstractMesh>this.mesh,
			}),
		);
	}

	private _createKbInputController() {
		const currentScene = ScenesController.getInstance().currentSceneInstance;
		if (currentScene) {
			this._kbInputController = new KeyboardInputController({ scene: currentScene });
		}
	}

	private _createMovementController() {
		this._movementController = new BasicMovementController({
			playerCharacter: this,
		});
	}

	private _createAnimationController() {
		this._animationController = new AnimationController({
			playerCharacter: this,
		});
	}

	public addGlow() {
		ScenesController.getInstance().currentSceneInstance?.meshes.forEach((mesh: AbstractMesh) => {
			if (mesh.id === 'warrior_material' && mesh && mesh.material && mesh.material instanceof PBRMaterial) {
				mesh.material.emissiveTexture = mesh.material.albedoTexture;
				mesh.material.emissiveColor = new Color3(1.0, 0.8, 0.2).scale(0.75);
			}
		});
	}

	public removeGlow() {
		const scene = ScenesController.getInstance().currentSceneInstance;
		if (!scene) return;

		scene.meshes.forEach((item) => {
			if (item.id === 'warrior_material' && item && item.material && item.material instanceof PBRMaterial) {
				item.material.emissiveTexture = null;
				item.material.emissiveColor = Color3.Black();
			}
		});
	}

	get keyboardInputController(): Nullable<KeyboardInputController> {
		return this._kbInputController;
	}

	get movementController(): Nullable<BasicMovementController> {
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
