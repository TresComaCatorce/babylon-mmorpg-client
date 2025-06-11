import { ISceneLoaderAsyncResult, Nullable } from '@babylonjs/core';

import BaseCharacter from '@mmorpg/game-objects/characters/BaseCharacter';

interface ICharacterModelsControllerConstructorParams {
	characterInstance: BaseCharacter;
	onMeshLoadedCallback?: () => void;
}

interface ICharacterBodyPartsModelsPaths {
	helm: string;
	armor: string;
	gloves: string;
	pants: string;
	boots: string;
}

interface ICharacterBodyPartsModels {
	helm: Nullable<ISceneLoaderAsyncResult>;
	armor: Nullable<ISceneLoaderAsyncResult>;
	gloves: Nullable<ISceneLoaderAsyncResult>;
	pants: Nullable<ISceneLoaderAsyncResult>;
	boots: Nullable<ISceneLoaderAsyncResult>;
}

const EMPTY_BODY_PARTS_MODELS_PATHS = {
	helm: '',
	armor: '',
	gloves: '',
	pants: '',
	boots: '',
};

const EMPTY_BODY_PARTS_MODELS_INSTANCES = {
	helm: null,
	armor: null,
	gloves: null,
	pants: null,
	boots: null,
};

export {
	ICharacterModelsControllerConstructorParams,
	ICharacterBodyPartsModelsPaths,
	ICharacterBodyPartsModels,
	EMPTY_BODY_PARTS_MODELS_PATHS,
	EMPTY_BODY_PARTS_MODELS_INSTANCES,
};
