import { ISceneLoaderAsyncResult, Nullable } from '@babylonjs/core';

import { IBaseCharacterConstructorParams } from '@mmorpg/interfaces/entities/characters/IBaseCharacter';
import CharacterModelsController from '@mmorpg/controllers/character/CharacterModelsController';
import Entity from '@mmorpg/entities/Entity';

abstract class BaseCharacter extends Entity {
	private _name: string;
	private _characterModelsControllerInstance: CharacterModelsController;

	constructor(params: IBaseCharacterConstructorParams) {
		super();
		this._name = params.characterName;
		this._characterModelsControllerInstance = new CharacterModelsController({
			characterInstance: this,
			onMeshLoadedCallback: this._onMeshLoaded.bind(this),
		});
	}

	get name(): string {
		return this._name;
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
