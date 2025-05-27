import { ISceneLoaderAsyncResult, Nullable } from '@babylonjs/core';

import CharacterModelsController from '@mmorpg/controllers/character/CharacterModelsController';
import Entity from '@mmorpg/entities/Entity';

abstract class BaseCharacter extends Entity {
	private _characterModelsControllerInstance: CharacterModelsController;

	constructor() {
		super();
		this._characterModelsControllerInstance = new CharacterModelsController({
			characterInstance: this,
			onMeshLoadedCallback: this._onMeshLoaded.bind(this),
		});
	}

	get characterModelsController(): CharacterModelsController {
		return this._characterModelsControllerInstance;
	}

	get rootModel(): Nullable<ISceneLoaderAsyncResult> {
		return this._characterModelsControllerInstance?.rootModel;
	}

	get rootNode() {
		return this._characterModelsControllerInstance?.rootNode;
	}
}

export default BaseCharacter;
