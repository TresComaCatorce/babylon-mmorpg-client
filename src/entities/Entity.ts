import { ImportMeshAsync, AbstractMesh, Vector3, TransformNode, Mesh } from '@babylonjs/core';
import ScenesController from '@mmorpg/controllers/ScenesController';

import { IEntityConstructorParams } from '@mmorpg/interfaces/entities/IEntity';

abstract class Entity {
	private static _instancesCounter: number = 0;
	private static _getEntityId(): string {
		Entity._instancesCounter++;
		return Entity._instancesCounter.toString();
	}

	private _id: string;
	private _mesh: AbstractMesh | undefined;

	constructor(params: IEntityConstructorParams) {
		this._id = Entity._getEntityId();
		this._createMesh(params.modelPath).then(() => this._onMeshLoaded());
	}

	public abstract update(): void;
	protected abstract _onMeshLoaded(): void;

	private async _createMesh(modelPath: string): Promise<void> {
		const currentScene = ScenesController.getInstance().currentSceneInstance;
		if (!currentScene) return;

		const result = await ImportMeshAsync(modelPath, currentScene);

		// 1. Buscar nodo raíz con hijos (suele ser el node correcto para target de cámara)
		const rootNode = result.meshes.find(
			(m) =>
				m.getChildMeshes().length > 0 && m instanceof TransformNode && !(m instanceof Mesh),
		);

		// 2. Buscar mesh visible
		const visibleMesh = result.meshes.find((m) => m instanceof Mesh && m.isVisible);

		// 3. Fallback: primer mesh
		this._mesh = rootNode ?? visibleMesh ?? result.meshes[0];

		console.log('Entity.ts | Assigned mesh for camera target: ', this._mesh?.name);
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
