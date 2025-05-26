/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	ImportMeshAsync,
	AbstractMesh,
	Vector3,
	TransformNode,
	Mesh,
	ISceneLoaderAsyncResult,
	Nullable,
	Quaternion,
	AnimationGroup,
	PBRMaterial,
	Texture,
	StandardMaterial,
	VertexBuffer,
} from '@babylonjs/core';
import ScenesController from '@mmorpg/controllers/ScenesController';

import { IEntityConstructorParams } from '@mmorpg/interfaces/entities/IEntity';

abstract class Entity {
	private static _instancesCounter: number = 0;
	public skeletonGlb: Nullable<ISceneLoaderAsyncResult> = null;
	public modelGlb: Nullable<ISceneLoaderAsyncResult> = null;
	private static _getEntityId(): string {
		Entity._instancesCounter++;
		return Entity._instancesCounter.toString();
	}

	private _id: string;
	private _mesh: AbstractMesh | undefined;

	constructor(params: IEntityConstructorParams) {
		this._id = Entity._getEntityId();
		this._loadGlbModel(params.modelPath).then(() => this._onMeshLoaded());
	}

	public abstract update(): void;
	protected abstract _onMeshLoaded(): void;

	private async _loadGlbModel(modelPath: string): Promise<void> {
		const currentScene = ScenesController.getInstance().currentSceneInstance;
		if (!currentScene) return;

		// Load GLB models
		this.skeletonGlb = await ImportMeshAsync(modelPath, currentScene); // Animations
		this.modelGlb = await ImportMeshAsync('assets/models/armor_class-dk_v1.gltf', currentScene); // DK race armor
		console.log('Entity.ts | this.skeletonGlb: ', this.skeletonGlb);
		console.log('Entity.ts | this.modelGlb: ', this.modelGlb);

		// Set parent of DK race armor (Attach movement and rotation)
		this.modelGlb.meshes[0].setParent(this.skeletonGlb.meshes[0]);

		// Find root node with children (usually the correct node for the camera target)
		const rootNode = this.skeletonGlb.meshes.find((m) => m.getChildMeshes().length > 0 && m instanceof TransformNode && !(m instanceof Mesh));

		// Fallback: first mesh
		this._mesh = rootNode ?? this.skeletonGlb.meshes[0];

		const allNodesB: TransformNode[] = [...this.modelGlb.meshes, ...this.modelGlb.transformNodes];

		const nodeMapB: Record<string, TransformNode> = {};
		allNodesB.forEach((node) => {
			nodeMapB[node.name] = node;
		});
		this.skeletonGlb.animationGroups.forEach((skeletonAnimationGlb) => {
			const clonedAnimGroup = new AnimationGroup(skeletonAnimationGlb.name, currentScene);

			for (const ta of skeletonAnimationGlb.targetedAnimations) {
				const oldTarget = ta.target;
				const newTarget = nodeMapB[oldTarget.name];

				if (!newTarget) {
					console.warn(`No se encontró target para ${oldTarget.name}`);
					continue; // saltar esta pista
				}

				const clonedAnimation = ta.animation.clone(); // cloná la animación
				clonedAnimGroup.addTargetedAnimation(clonedAnimation, newTarget);
			}

			this.modelGlb?.animationGroups.push(clonedAnimGroup);
		});
	}

	get id(): string {
		return this._id;
	}

	get mesh(): AbstractMesh | undefined {
		return this._mesh;
	}

	get position(): Vector3 | undefined {
		return this._mesh?.position;
	}
}

export default Entity;
