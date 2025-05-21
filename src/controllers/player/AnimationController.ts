import { AnimationGroup } from '@babylonjs/core';

import { IAnimationControllerConstructorParams } from '@mmorpg/interfaces/controllers/player/IAnimationController';
import ANIMATION_NAMES, { ANIMATION_NAMES_ARRAY } from '@mmorpg/utils/constants/ANIMATION_NAMES';
import PlayerCharacter from '@mmorpg/entities/characters/PlayerCharacter';
import MOVEMENT_STATES from '@mmorpg/utils/constants/MOVEMENT_STATES';
import ScenesController from '@mmorpg/controllers/ScenesController';

class AnimationController {
	private _playerCharacterInstance: PlayerCharacter;
	private _animationGroupsInstances: Map<string, AnimationGroup>;
	private _currentlyPlayingAnimationGroups: AnimationGroup[] = [];
	private _lastMovementState: string = '';

	constructor(params: IAnimationControllerConstructorParams) {
		this._playerCharacterInstance = params.playerCharacter;
		this._animationGroupsInstances = new Map<string, AnimationGroup>();
		this._fillAnimationGroupsMap();
	}

	public update() {
		const currentMovementState =
			this._playerCharacterInstance.movementController?.movementState;
		if (currentMovementState && currentMovementState !== this._lastMovementState) {
			this._lastMovementState = currentMovementState;
			switch (currentMovementState) {
				case MOVEMENT_STATES.IDLE: {
					this._playAnimation(ANIMATION_NAMES.IDLE);
					break;
				}
				case MOVEMENT_STATES.WALKING: {
					this._playAnimation(ANIMATION_NAMES.WALKING);
					break;
				}
				default: {
					console.log(
						`AnimationController.ts | Unknown movement state '${currentMovementState}'`,
					);
					this._playAnimation(ANIMATION_NAMES.IDLE);
					break;
				}
			}
		}
	}

	private _fillAnimationGroupsMap() {
		const currentScene = ScenesController.getInstance().currentSceneInstance;
		const animationGroups = currentScene?.animationGroups;
		ANIMATION_NAMES_ARRAY.forEach((animationName: string) => {
			const animationGroupInstance = animationGroups?.find(
				(animationGroup: AnimationGroup) => animationGroup.name === animationName,
			);
			if (animationGroupInstance) {
				this._animationGroupsInstances.set(animationName, animationGroupInstance);
			}
		});
	}

	private _playAnimation(animationGropName: string, playInLoop: boolean = true) {
		console.log(`playanimation: ${animationGropName}`);
		const animationGropToAdd = this._animationGroupsInstances.get(animationGropName);
		if (animationGropToAdd) {
			this._stopAllAnimations();
			animationGropToAdd.enableBlending = true;
			animationGropToAdd.blendingSpeed = 0.05;
			animationGropToAdd.start(playInLoop);
			this._currentlyPlayingAnimationGroups.push(animationGropToAdd);
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
