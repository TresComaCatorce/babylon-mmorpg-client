import { IPlayerCharacterConstructorParams } from '@mmorpg/interfaces/entities/characters/IPlayerCharacter';
import BaseCharacter from '@mmorpg/entities/characters/BaseCharacter';
import FollowPlayerCamera from '@mmorpg/camera/FollowPlayerCamera';
import ScenesController from '@mmorpg/controllers/ScenesController';
import BaseScene from '@mmorpg/scenes/BaseScene';
import { AbstractMesh } from '@babylonjs/core';

class PlayerCharacter extends BaseCharacter {
	private _name: string;
	private _camera: FollowPlayerCamera;

	constructor(params: IPlayerCharacterConstructorParams) {
		super({ modelPath: 'assets/models/warrior.glb' });
		console.log(`PlayerCharacter ${params.name} constructor`);
		this._name = params.name;
		const currentScene =
			ScenesController.getInstance().currentSceneInstance;
		this._camera = new FollowPlayerCamera(
			<BaseScene>currentScene,
			<AbstractMesh>this.mesh,
		);
	}
}

export default PlayerCharacter;
