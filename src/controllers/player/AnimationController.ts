import { AbstractMesh, AnimationGroup, Nullable, Quaternion } from '@babylonjs/core';

import { IAnimationControllerConstructorParams, IPlayAnimationConfigParam } from '@mmorpg/interfaces/controllers/player/IAnimationController';
import ANIMATION_NAMES, { ANIMATION_NAMES_ARRAY } from '@mmorpg/utils/constants/ANIMATION_NAMES';
import PlayerCharacter from '@mmorpg/entities/characters/PlayerCharacter';
import MOVEMENT_STATES from '@mmorpg/utils/constants/MOVEMENT_STATES';
import ScenesController from '@mmorpg/controllers/ScenesController';
import BasicMovementController from './BasicMovementController';

class AnimationController {
	private _playerCharacterInstance: PlayerCharacter;
	private _playerCharacterMesh: Nullable<AbstractMesh>;
	private _playerMovementController: Nullable<BasicMovementController>;
	private _animationGroupsInstances: Map<string, AnimationGroup>;
	private _currentlyPlayingAnimationGroups: AnimationGroup[] = [];
	private _lastMovementState: string = '';

	constructor(params: IAnimationControllerConstructorParams) {
		this._playerCharacterInstance = params.playerCharacter;
		this._playerCharacterMesh = params.playerCharacter.rootNode ?? null;
		this._playerMovementController = params.playerCharacter.movementController;
		this._animationGroupsInstances = new Map<string, AnimationGroup>();
		this._fillAnimationGroupsMap();
	}

	public update() {
		this._playMovementAnimations();
		this._moveAndRotateMesh();
	}

	private _fillAnimationGroupsMap() {
		const currentScene = ScenesController.getInstance().currentSceneInstance;
		const animationGroups = currentScene?.animationGroups;
		ANIMATION_NAMES_ARRAY.forEach((animationName: string) => {
			const animationGroupInstance = animationGroups?.find((animationGroup: AnimationGroup) => animationGroup.name === animationName);
			if (animationGroupInstance) {
				this._animationGroupsInstances.set(animationName, animationGroupInstance);
			}
		});
	}

	private _playMovementAnimations() {
		const currentMovementState = this._playerMovementController?.movementState;
		if (currentMovementState && currentMovementState !== this._lastMovementState) {
			this._lastMovementState = currentMovementState;
			switch (currentMovementState) {
				case MOVEMENT_STATES.IDLE: {
					this._playAnimation(ANIMATION_NAMES.IDLE);
					break;
				}
				case MOVEMENT_STATES.WALKING: {
					this._playAnimation(ANIMATION_NAMES.WALKING, { speedRatio: 1.8 });
					break;
				}
				case MOVEMENT_STATES.RUNNING: {
					this._playAnimation(ANIMATION_NAMES.RUNNING, { speedRatio: 2 });
					break;
				}
				default: {
					console.log(`AnimationController.ts | Unknown movement state '${currentMovementState}'`);
					this._playAnimation(ANIMATION_NAMES.IDLE);
					break;
				}
			}
		}
	}

	private _moveAndRotateMesh() {
		if (this._playerMovementController?.isMoving && this._playerCharacterMesh) {
			const moveDirection = this._playerMovementController?.movementDirection;
			if (moveDirection) {
				const angleY = Math.atan2(moveDirection.x, moveDirection.z) + Math.PI;
				const targetRotation = Quaternion.FromEulerAngles(0, angleY, 0);

				// Rotate the character mesh in the direction of the movement
				if (!this._playerCharacterMesh.rotationQuaternion) {
					this._playerCharacterMesh.rotationQuaternion = targetRotation.clone();
				} else {
					// Smooth interpolation between current and desired rotation
					Quaternion.SlerpToRef(
						this._playerCharacterMesh.rotationQuaternion,
						targetRotation,
						0.3, // <-- interpolation speed (0 to 1)
						this._playerCharacterMesh.rotationQuaternion,
					);
				}
			}
		}
	}

	private _playAnimation(animationGropName: string, config?: IPlayAnimationConfigParam) {
		const bodyPartsModels = this._playerCharacterInstance.characterModelsController.bodyPartsModels;

		if (bodyPartsModels) {
			Object.values(bodyPartsModels).forEach((bodyPart) => {
				const animationGropToPlay = bodyPart?.animationGroups.find(
					(animationGroup: AnimationGroup) => animationGroup.name === animationGropName,
				);
				if (animationGropToPlay) {
					this._stopAllAnimations();
					const loop = config?.playInLoop === false ? false : true;
					const speedRatio = config?.speedRatio ? config?.speedRatio : 1;
					animationGropToPlay.enableBlending = true;
					animationGropToPlay.blendingSpeed = animationGropName === ANIMATION_NAMES.WALKING ? 0.1 : 0.2;
					animationGropToPlay.start(loop, speedRatio);
					if (animationGropToPlay) {
						this._currentlyPlayingAnimationGroups.push(animationGropToPlay);
					}
				}
			});
		}
	}

	private _stopAllAnimations() {
		console.log('stopallanimations');
		for (const anim of this._currentlyPlayingAnimationGroups) {
			anim.stop();
		}
		this._currentlyPlayingAnimationGroups = [];
	}
}

export default AnimationController;
