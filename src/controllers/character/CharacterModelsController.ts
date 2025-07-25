import {
	AbstractMesh,
	AnimationGroup,
	Color3,
	ImportMeshAsync,
	ISceneLoaderAsyncResult,
	Nullable,
	Texture,
	TransformNode,
	PBRMaterial,
} from '@babylonjs/core';

import BaseCharacterController from '@mmorpg/controllers/base/BaseCharacterController';
import PlayerCharacter from '@mmorpg/game-objects/characters/PlayerCharacter';
import {
	ICharacterModelsControllerConstructorParams,
	ICharacterBodyPartsModels,
	ICharacterBodyPartsModelsPaths,
	EMPTY_BODY_PARTS_MODELS_PATHS,
	EMPTY_BODY_PARTS_MODELS_INSTANCES,
} from '@mmorpg/interfaces/controllers/character/ICharacterModelsController';
import ScenesController from '@mmorpg/controllers/ScenesController';
import KEY_CODES from '@mmorpg/utils/constants/KEY_CODES';
import BaseScene from '@mmorpg/scenes/base/BaseScene';

class CharacterModelsController extends BaseCharacterController {
	private _onMeshLoadedCallback?: () => void;
	private _animationsModelPath!: string;
	private _animationsModelInstance: Nullable<ISceneLoaderAsyncResult> = null;
	private _bodyPartsModelsPaths: ICharacterBodyPartsModelsPaths = { ...EMPTY_BODY_PARTS_MODELS_PATHS };
	private _bodyPartsModelsInstances: ICharacterBodyPartsModels = { ...EMPTY_BODY_PARTS_MODELS_INSTANCES };
	private _defaultBodyPartsModelsPaths: ICharacterBodyPartsModelsPaths = { ...EMPTY_BODY_PARTS_MODELS_PATHS };
	private _defaultBodyPartsModelsInstances: ICharacterBodyPartsModels = { ...EMPTY_BODY_PARTS_MODELS_INSTANCES };
	private _rootNode: Nullable<AbstractMesh> = null;

	constructor(params: ICharacterModelsControllerConstructorParams) {
		super(params);
		this._onMeshLoadedCallback = params.onMeshLoadedCallback;
		this._setAnimationsModelPath();
		this._setDefaultBodyPartsModelsPaths();
		this._setBodyPartsModelsPaths();
		this._createAllModelsInstances().then(() => {
			if (this._onMeshLoadedCallback) this._onMeshLoadedCallback();
			this._onMeshesLoaded();
		});
	}

	public dispose() {
		this._onMeshLoadedCallback = () => {};
		this._rootNode = null;
		this._animationsModelPath = '';
		this._animationsModelInstance = null;
		this._bodyPartsModelsPaths = { ...EMPTY_BODY_PARTS_MODELS_PATHS };
		this._bodyPartsModelsInstances = { ...EMPTY_BODY_PARTS_MODELS_INSTANCES };
		this._defaultBodyPartsModelsPaths = { ...EMPTY_BODY_PARTS_MODELS_PATHS };
		this._defaultBodyPartsModelsInstances = { ...EMPTY_BODY_PARTS_MODELS_INSTANCES };
	}

	private _setAnimationsModelPath() {
		this._animationsModelPath = 'assets/models/character/character_animations_v1.glb';
	}

	private _setDefaultBodyPartsModelsPaths() {
		this._defaultBodyPartsModelsPaths.helm = 'assets/models/class-warrior_helm_v1.gltf';
		this._defaultBodyPartsModelsPaths.armor = 'assets/models/class-warrior_armor_v1.gltf';
		this._defaultBodyPartsModelsPaths.gloves = 'assets/models/class-warrior_gloves_v1.gltf';
		this._defaultBodyPartsModelsPaths.pants = 'assets/models/class-warrior_pants_v1.gltf';
		this._defaultBodyPartsModelsPaths.boots = 'assets/models/class-warrior_boots_v1.gltf';
	}

	private _setBodyPartsModelsPaths() {
		this._bodyPartsModelsPaths.helm = 'assets/models/leather_helm_v1.gltf';
		this._bodyPartsModelsPaths.armor = 'assets/models/leather_armor_v1.gltf';
		this._bodyPartsModelsPaths.gloves = 'assets/models/leather_gloves_v1.gltf';
		this._bodyPartsModelsPaths.pants = 'assets/models/leather_pants_v1.gltf';
		this._bodyPartsModelsPaths.boots = 'assets/models/leather_boots_v1.gltf';
	}

	private async _createAllModelsInstances() {
		const currentScene = ScenesController.getInstance().currentSceneInstance;
		if (currentScene) {
			await this._createAnimationsModelInstance(currentScene);
			await this._createDefaultBodyPartsModelsInstances(currentScene);
			await this._createBodyPartsModelsInstances(currentScene);
		}
	}

	private async _createAnimationsModelInstance(currentScene: BaseScene) {
		this._animationsModelInstance = await ImportMeshAsync(this._animationsModelPath, currentScene);
		this._rootNode = this._animationsModelInstance?.meshes[0];
	}

	private async _createDefaultBodyPartsModelsInstances(currentScene: BaseScene) {
		this._defaultBodyPartsModelsInstances.helm = await ImportMeshAsync(this._defaultBodyPartsModelsPaths.helm, currentScene);
		this._defaultBodyPartsModelsInstances.armor = await ImportMeshAsync(this._defaultBodyPartsModelsPaths.armor, currentScene);
		this._defaultBodyPartsModelsInstances.gloves = await ImportMeshAsync(this._defaultBodyPartsModelsPaths.gloves, currentScene);
		this._defaultBodyPartsModelsInstances.pants = await ImportMeshAsync(this._defaultBodyPartsModelsPaths.pants, currentScene);
		this._defaultBodyPartsModelsInstances.boots = await ImportMeshAsync(this._defaultBodyPartsModelsPaths.boots, currentScene);
	}

	private async _createBodyPartsModelsInstances(currentScene: BaseScene) {
		this._bodyPartsModelsInstances.helm = await ImportMeshAsync(this._bodyPartsModelsPaths.helm, currentScene);
		this._bodyPartsModelsInstances.helm?.meshes.find((item) => item.id === '__root__')?.setEnabled(false);
		this._bodyPartsModelsInstances.armor = await ImportMeshAsync(this._bodyPartsModelsPaths.armor, currentScene);
		this._bodyPartsModelsInstances.armor?.meshes.find((item) => item.id === '__root__')?.setEnabled(false);
		this._bodyPartsModelsInstances.gloves = await ImportMeshAsync(this._bodyPartsModelsPaths.gloves, currentScene);
		this._bodyPartsModelsInstances.gloves?.meshes.find((item) => item.id === '__root__')?.setEnabled(false);
		this._bodyPartsModelsInstances.pants = await ImportMeshAsync(this._bodyPartsModelsPaths.pants, currentScene);
		this._bodyPartsModelsInstances.pants?.meshes.find((item) => item.id === '__root__')?.setEnabled(false);
		this._bodyPartsModelsInstances.boots = await ImportMeshAsync(this._bodyPartsModelsPaths.boots, currentScene);
		this._bodyPartsModelsInstances.boots?.meshes.find((item) => item.id === '__root__')?.setEnabled(false);
		// TODO CBF: Implement logic to change set parts
	}

	private _onMeshesLoaded() {
		this._attachBodyPartsModelsToAnimationsModel();
		this._copyAnimationsForEachBodyPartModel();
		this._setKeysToToggleLeatherTest();
		this._applyExcellentEffect(this._bodyPartsModelsInstances.helm?.meshes);
		this._applyExcellentEffect(this._bodyPartsModelsInstances.armor?.meshes);
		this._applyExcellentEffect(this._bodyPartsModelsInstances.gloves?.meshes);
		this._applyExcellentEffect(this._bodyPartsModelsInstances.pants?.meshes);
		this._applyExcellentEffect(this._bodyPartsModelsInstances.boots?.meshes);
	}

	private _attachBodyPartsModelsToAnimationsModel() {
		if (this._rootNode) {
			this._defaultBodyPartsModelsInstances.helm?.meshes[0].setParent(this._rootNode);
			this._defaultBodyPartsModelsInstances.armor?.meshes[0].setParent(this._rootNode);
			this._defaultBodyPartsModelsInstances.gloves?.meshes[0].setParent(this._rootNode);
			this._defaultBodyPartsModelsInstances.pants?.meshes[0].setParent(this._rootNode);
			this._defaultBodyPartsModelsInstances.boots?.meshes[0].setParent(this._rootNode);

			this._bodyPartsModelsInstances.helm?.meshes[0].setParent(this._rootNode);
			this._bodyPartsModelsInstances.armor?.meshes[0].setParent(this._rootNode);
			this._bodyPartsModelsInstances.gloves?.meshes[0].setParent(this._rootNode);
			this._bodyPartsModelsInstances.pants?.meshes[0].setParent(this._rootNode);
			this._bodyPartsModelsInstances.boots?.meshes[0].setParent(this._rootNode);
		}
	}

	private async _copyAnimationsForEachBodyPartModel(): Promise<void> {
		const currentScene = ScenesController.getInstance().currentSceneInstance;
		this._animationsModelInstance?.animationGroups.forEach((animationGroup) => {
			const clonedAnimGroup = new AnimationGroup(animationGroup.name, currentScene);

			Object.values(this._defaultBodyPartsModelsInstances).forEach((bodyPartInstance) => {
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

			Object.values(this._bodyPartsModelsInstances).forEach((bodyPartInstance) => {
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
		return this._defaultBodyPartsModelsInstances;
	}

	private _toggleHelmModel(show: boolean): void {
		const bodyPartHelm = this._defaultBodyPartsModelsInstances.helm;
		const helmInstance = this._bodyPartsModelsInstances.helm;
		if (!helmInstance || !bodyPartHelm) return;

		helmInstance.meshes.find((item) => item.id === '__root__')?.setEnabled(show);
		bodyPartHelm.meshes.find((item) => item.id === '__root__')?.setEnabled(!show);
	}

	private _toggleArmorModel(show: boolean): void {
		const bodyPartArmor = this._defaultBodyPartsModelsInstances.armor;
		const armorInstance = this._bodyPartsModelsInstances.armor;
		if (!armorInstance || !bodyPartArmor) return;

		armorInstance.meshes.find((item) => item.id === '__root__')?.setEnabled(show);
		bodyPartArmor.meshes.find((item) => item.id === '__root__')?.setEnabled(!show);
	}

	private _toggleGlovesModel(show: boolean): void {
		const bodyPartGloves = this._defaultBodyPartsModelsInstances.gloves;
		const glovesInstance = this._bodyPartsModelsInstances.gloves;
		if (!glovesInstance || !bodyPartGloves) return;

		glovesInstance.meshes.find((item) => item.id === '__root__')?.setEnabled(show);
		bodyPartGloves.meshes.find((item) => item.id === '__root__')?.setEnabled(!show);
	}

	private _togglePantsModel(show: boolean): void {
		const bodyPartPants = this._defaultBodyPartsModelsInstances.pants;
		const pantsInstance = this._bodyPartsModelsInstances.pants;
		if (!pantsInstance || !bodyPartPants) return;

		pantsInstance.meshes.find((item) => item.id === '__root__')?.setEnabled(show);
		bodyPartPants.meshes.find((item) => item.id === '__root__')?.setEnabled(!show);
	}
	private _toggleBootsModel(show: boolean): void {
		const bodyPartBoots = this._defaultBodyPartsModelsInstances.boots;
		const bootsInstance = this._bodyPartsModelsInstances.boots;
		if (!bootsInstance || !bodyPartBoots) return;

		bootsInstance.meshes.find((item) => item.id === '__root__')?.setEnabled(show);
		bodyPartBoots.meshes.find((item) => item.id === '__root__')?.setEnabled(!show);
	}

	private _emissiveTextures: Texture[] = [];
	private _materials: PBRMaterial[] = [];

	private _applyExcellentEffect(meshesToApplyEffect?: AbstractMesh[]): void {
		if (meshesToApplyEffect) {
			for (const mesh of meshesToApplyEffect) {
				const material = mesh.material as PBRMaterial;
				if (!material || material.id === 'hide.jpg' || material.id === 'hide_m.jpg' || material.id === 'texture_class-warrior_v1.jpg') {
					continue;
				}

				// Excellent effect
				const emissiveTexture = new Texture('assets/textures/gradiente_256x256_3.png', mesh.getScene());
				material.emissiveTexture = emissiveTexture;
				material.emissiveColor = new Color3(0.175, 0.175, 0.175);
				material.emissiveIntensity = -0.2;
				emissiveTexture.uScale = 0.2;
				emissiveTexture.vScale = 0.2;

				mesh.getScene().onBeforeRenderObservable.add(() => {
					emissiveTexture.uOffset += 0.005;
					emissiveTexture.vOffset += 0.005;
					emissiveTexture.wAng += 0.02;
				});

				this._emissiveTextures.push(emissiveTexture);
				this._materials.push(material);
			}
		}
	}

	private _setKeysToToggleLeatherTest() {
		(<PlayerCharacter>this._characterInstance).keyboardInputController?.addToggleKey(
			KEY_CODES.ONE,
			{
				onSwitchON: () => {
					this._toggleHelmModel(true);
				},
				onSwitchOFF: () => {
					this._toggleHelmModel(false);
				},
			},
			'Leather Helm',
		);
		(<PlayerCharacter>this._characterInstance).keyboardInputController?.addToggleKey(
			KEY_CODES.TWO,
			{
				onSwitchON: () => {
					this._toggleArmorModel(true);
				},
				onSwitchOFF: () => {
					this._toggleArmorModel(false);
				},
			},
			'Leather Armor',
		);
		(<PlayerCharacter>this._characterInstance).keyboardInputController?.addToggleKey(
			KEY_CODES.THREE,
			{
				onSwitchON: () => {
					this._toggleGlovesModel(true);
				},
				onSwitchOFF: () => {
					this._toggleGlovesModel(false);
				},
			},
			'Leather Gloves',
		);
		(<PlayerCharacter>this._characterInstance).keyboardInputController?.addToggleKey(
			KEY_CODES.FOUR,
			{
				onSwitchON: () => {
					this._togglePantsModel(true);
				},
				onSwitchOFF: () => {
					this._togglePantsModel(false);
				},
			},
			'Leather Pants',
		);
		(<PlayerCharacter>this._characterInstance).keyboardInputController?.addToggleKey(
			KEY_CODES.FIVE,
			{
				onSwitchON: () => {
					this._toggleBootsModel(true);
				},
				onSwitchOFF: () => {
					this._toggleBootsModel(false);
				},
			},
			'Leather Boots',
		);
	}
}

export default CharacterModelsController;
