import { ImportMeshAsync, AbstractMesh, Vector3 } from '@babylonjs/core';
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
		this._createMesh(params.modelPath);
	}

	private async _createMesh(modelPath: string): Promise<void> {
		let returnValue;
		const currentScene =
			ScenesController.getInstance().currentSceneInstance;
		console.log('CurrentScene: ', currentScene);
		if (currentScene) {
			const result = await ImportMeshAsync(modelPath, currentScene);
			console.log('mesh attached: ', result);
			currentScene.animationGroups.forEach((group) => {
				console.log(`Anim Group: ${group.name}`);
			});
		}

		return returnValue;
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
