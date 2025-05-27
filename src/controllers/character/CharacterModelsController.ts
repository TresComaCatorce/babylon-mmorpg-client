import { AbstractMesh, AnimationGroup, ImportMeshAsync, ISceneLoaderAsyncResult, Nullable, TransformNode } from '@babylonjs/core';

import {
	ICharacterModelsControllerConstructorParams,
	ICharacterBodyPartsModels,
	ICharacterBodyPartsModelsPaths,
	EMPTY_BODY_PARTS_MODELS_PATHS,
	EMPTY_BODY_PARTS_MODELS_INSTANCES,
} from '@mmorpg/interfaces/controllers/character/ICharacterModelsController';
import ScenesController from '@mmorpg/controllers/ScenesController';
import BaseCharacter from '@mmorpg/entities/characters/BaseCharacter';
import BaseScene from '@mmorpg/scenes/BaseScene';

class CharacterModelsController {
	private _characterInstance: BaseCharacter;
	private _onMeshLoadedCallback?: () => void;
	private _animationsModelPath!: string;
	private _animationsModelInstance: Nullable<ISceneLoaderAsyncResult> = null;
	private _bodyPartsModelsPaths: ICharacterBodyPartsModelsPaths = EMPTY_BODY_PARTS_MODELS_PATHS;
	private _bodyPartsModelsInstances: ICharacterBodyPartsModels = EMPTY_BODY_PARTS_MODELS_INSTANCES;
	private _defaultBodyPartsModelsPaths: ICharacterBodyPartsModelsPaths = EMPTY_BODY_PARTS_MODELS_PATHS;
	private _defaultBodyPartsModelsIntances: ICharacterBodyPartsModels = EMPTY_BODY_PARTS_MODELS_INSTANCES;
	private _rootNode: Nullable<AbstractMesh> = null;

	constructor(params: ICharacterModelsControllerConstructorParams) {
		this._characterInstance = params.characterInstance;
		this._onMeshLoadedCallback = params.onMeshLoadedCallback;
		this._setAnimationsModelPath();
		this._setDefaultBodyPartsModelsPaths();
		this._createAllModelsInstances().then(() => {
			if (this._onMeshLoadedCallback) this._onMeshLoadedCallback();
			this._onMeshesLoaded();
		});
	}

	private _setAnimationsModelPath() {
		this._animationsModelPath = 'assets/models/character/character_animations_v1.glb';
	}

	private _setDefaultBodyPartsModelsPaths() {
		this._defaultBodyPartsModelsPaths.helm = 'assets/models/character/classes/warrior/helm_class-warrior_v1.gltf';
		this._defaultBodyPartsModelsPaths.armor = 'assets/models/character/classes/warrior/armor_class-warrior_v1.gltf';
		this._defaultBodyPartsModelsPaths.gloves = 'assets/models/character/classes/warrior/gloves_class-warrior_v1.gltf';
		this._defaultBodyPartsModelsPaths.pants = 'assets/models/character/classes/warrior/pants_class-warrior_v1.gltf';
		this._defaultBodyPartsModelsPaths.boots = 'assets/models/character/classes/warrior/boots_class-warrior_v1.gltf';
	}

	private async _createAllModelsInstances() {
		const currentScene = ScenesController.getInstance().currentSceneInstance;
		if (currentScene) {
			await this._createAnimationsModelInstance(currentScene);
			await this._createDefaultBodyPartsModelsInstances(currentScene);
			await this._createBodyPartsModelsInstances();
		}
	}

	private async _createAnimationsModelInstance(currentScene: BaseScene) {
		this._animationsModelInstance = await ImportMeshAsync(this._animationsModelPath, currentScene);
		this._rootNode = this._animationsModelInstance?.meshes[0];
	}

	private async _createDefaultBodyPartsModelsInstances(currentScene: BaseScene) {
		this._defaultBodyPartsModelsIntances.helm = await ImportMeshAsync(this._defaultBodyPartsModelsPaths.helm, currentScene);
		this._defaultBodyPartsModelsIntances.armor = await ImportMeshAsync(this._defaultBodyPartsModelsPaths.armor, currentScene);
		this._defaultBodyPartsModelsIntances.gloves = await ImportMeshAsync(this._defaultBodyPartsModelsPaths.gloves, currentScene);
		this._defaultBodyPartsModelsIntances.pants = await ImportMeshAsync(this._defaultBodyPartsModelsPaths.pants, currentScene);
		this._defaultBodyPartsModelsIntances.boots = await ImportMeshAsync(this._defaultBodyPartsModelsPaths.boots, currentScene);
	}

	private async _createBodyPartsModelsInstances() {
		// TODO CBF: Implement logic to change set parts
	}

	private _onMeshesLoaded() {
		this._attachBodyPartsModelsToAnimationsModel();
		this._copyAnimationsForEachBodyPartModel();
	}

	private _attachBodyPartsModelsToAnimationsModel() {
		if (this._rootNode) {
			this._defaultBodyPartsModelsIntances.helm?.meshes[0].setParent(this._rootNode);
			this._defaultBodyPartsModelsIntances.armor?.meshes[0].setParent(this._rootNode);
			this._defaultBodyPartsModelsIntances.gloves?.meshes[0].setParent(this._rootNode);
			this._defaultBodyPartsModelsIntances.pants?.meshes[0].setParent(this._rootNode);
			this._defaultBodyPartsModelsIntances.boots?.meshes[0].setParent(this._rootNode);
		}
	}

	private async _copyAnimationsForEachBodyPartModel(): Promise<void> {
		const currentScene = ScenesController.getInstance().currentSceneInstance;
		this._animationsModelInstance?.animationGroups.forEach((animationGroup) => {
			const clonedAnimGroup = new AnimationGroup(animationGroup.name, currentScene);

			Object.values(this._defaultBodyPartsModelsIntances).forEach((bodyPartInstance) => {
				if (bodyPartInstance) {
					const nodeMapB: Record<string, TransformNode> = {};
					const allNodes: TransformNode[] = [...bodyPartInstance.meshes, ...bodyPartInstance.transformNodes];
					allNodes.forEach((node) => {
						nodeMapB[node.name] = node;
					});

					for (const ta of animationGroup.targetedAnimations) {
						const oldTarget = ta.target;
						const newTarget = nodeMapB[oldTarget.name];

						if (newTarget) {
							const clonedAnimation = ta.animation.clone();
							clonedAnimGroup.addTargetedAnimation(clonedAnimation, newTarget);
						} else {
							continue;
						}
					}

					bodyPartInstance.animationGroups.push(clonedAnimGroup);
				}
			});
		});
	}

	get rootNode(): Nullable<AbstractMesh> {
		return this._rootNode;
	}

	get rootModel(): Nullable<ISceneLoaderAsyncResult> {
		return this._animationsModelInstance;
	}

	get bodyPartsModels(): ICharacterBodyPartsModels {
		return this._defaultBodyPartsModelsIntances;
	}
}

export default CharacterModelsController;
