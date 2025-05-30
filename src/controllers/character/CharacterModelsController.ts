/* eslint-disable @typescript-eslint/no-unused-vars */
import {
	AbstractMesh,
	AnimationGroup,
	Color3,
	ImportMeshAsync,
	ISceneLoaderAsyncResult,
	Nullable,
	StandardMaterial,
	Texture,
	Tools,
	TransformNode,
} from '@babylonjs/core';

import {
	ICharacterModelsControllerConstructorParams,
	ICharacterBodyPartsModels,
	ICharacterBodyPartsModelsPaths,
	EMPTY_BODY_PARTS_MODELS_PATHS,
	EMPTY_BODY_PARTS_MODELS_INSTANCES,
} from '@mmorpg/interfaces/controllers/character/ICharacterModelsController';
import ScenesController from '@mmorpg/controllers/ScenesController';
import BaseCharacterController from './BaseCharacterController';
import BaseScene from '@mmorpg/scenes/BaseScene';
import KEY_CODES from '@mmorpg/utils/constants/KEY_CODES';
import PlayerCharacter from '@mmorpg/entities/characters/PlayerCharacter';
import GameController from '../GameController';

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

	private _hsvToRgb(h: number, s: number, v: number): Color3 {
		const c = v * s;
		const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
		const m = v - c;

		let r = 0,
			g = 0,
			b = 0;

		if (h >= 0 && h < 60) [r, g, b] = [c, x, 0];
		else if (h >= 60 && h < 120) [r, g, b] = [x, c, 0];
		else if (h >= 120 && h < 180) [r, g, b] = [0, c, x];
		else if (h >= 180 && h < 240) [r, g, b] = [0, x, c];
		else if (h >= 240 && h < 300) [r, g, b] = [x, 0, c];
		else if (h >= 300 && h < 360) [r, g, b] = [c, 0, x];

		return new Color3(r + m, g + m, b + m);
	}

	private _applyExcellentEffect(meshesToApplyEffect?: AbstractMesh[]): void {
		if (meshesToApplyEffect) {
			for (const mesh of meshesToApplyEffect) {
				const material = mesh.material as StandardMaterial;
				if (!material) continue;

				// Creamos una textura de emisión (glow animado)
				const emissiveTexture = new Texture('assets/textures/effect_excellent.png', mesh.getScene());
				emissiveTexture.uScale = 1;
				emissiveTexture.vScale = 1;
				material.emissiveTexture = emissiveTexture;
				material.emissiveTexture.hasAlpha = true;
				material.emissiveColor.set(1, 1, 1);

				const colorStops = [
					{ color: new Color3(0.2, 0.4, 1.0), duration: 2000 }, // Azul
					{ color: new Color3(1.0, 0.3, 0.7), duration: 1400 }, // Rosa
					{ color: new Color3(1.0, 1.0, 0.2), duration: 600 }, // Amarillo
				];

				let currentIndex = 0;
				let elapsed = 0;

				mesh.getScene().onBeforeRenderObservable.add(() => {
					const delta = GameController.getInstance().engine.getDeltaTime();
					elapsed += delta;

					const current = colorStops[currentIndex];
					const next = colorStops[(currentIndex + 1) % colorStops.length];

					const t = Math.min(elapsed / current.duration, 1);
					const color = Color3.Lerp(current.color, next.color, t);
					material.emissiveColor = color.scale(0.025); // brillo ajustado

					if (t >= 1) {
						currentIndex = (currentIndex + 1) % colorStops.length;
						elapsed = 0;
					}
				});
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
