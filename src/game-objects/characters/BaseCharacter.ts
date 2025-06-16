import { ISceneLoaderAsyncResult, Nullable } from '@babylonjs/core';

import { IBaseCharacterConstructorParams } from '@mmorpg/interfaces/game-objects/characters/IBaseCharacter';
import IHealthPointsBehaviour from '@mmorpg/interfaces/common-interfaces/IHealthPointsBehaviour';
import CharacterModelsController from '@mmorpg/controllers/character/CharacterModelsController';
import IManaPointsBehaviour from '@mmorpg/interfaces/common-interfaces/IManaPointsBehaviour';
import Entity from '@mmorpg/game-objects/Entity';

abstract class BaseCharacter extends Entity implements IHealthPointsBehaviour, IManaPointsBehaviour {
	private _name: string;
	private _characterModelsControllerInstance: CharacterModelsController;
	private _currentHP: number;
	private _maxHP: number;
	private _currentMP: number;
	private _maxMP: number;

	constructor(params: IBaseCharacterConstructorParams) {
		super();
		this._name = params.characterName;
		this._currentHP = params.currentHP;
		this._maxHP = params.maxHP;
		this._currentMP = params.currentMP;
		this._maxMP = params.maxMP;
		this._characterModelsControllerInstance = new CharacterModelsController({
			characterInstance: this,
			onMeshLoadedCallback: this._onMeshLoaded.bind(this),
		});
	}

	public addHP(pointsToAdd: number): void {
		if (isNaN(pointsToAdd) || pointsToAdd < 0) throw new Error(`Invalid HP points to add | pointsToAdd: ${pointsToAdd}`);
		const aux = this._currentHP + pointsToAdd;
		this._currentHP = aux <= this._maxHP ? aux : this._maxHP;
	}

	public decreaseHP(pointsToDecrease: number): void {
		if (isNaN(pointsToDecrease) || pointsToDecrease < 0) throw new Error(`Invalid HP points to decrease | pointsToDecrease: ${pointsToDecrease}`);
		const aux = this._currentHP - pointsToDecrease;
		if (aux > 0) {
			this._currentHP = aux;
		} else {
			this._currentHP = 0;
			this._die();
		}
	}

	public addMP(pointsToAdd: number): void {
		if (isNaN(pointsToAdd) || pointsToAdd < 0) throw new Error(`Invalid MP points to add | pointsToAdd: ${pointsToAdd}`);
		const aux = this._currentMP + pointsToAdd;
		this._currentMP = aux <= this._maxMP ? aux : this._maxMP;
	}

	public decreaseMP(pointsToDecrease: number): void {
		if (isNaN(pointsToDecrease) || pointsToDecrease < 0) throw new Error(`Invalid MP points to decrease | pointsToDecrease: ${pointsToDecrease}`);
		const aux = this._currentMP - pointsToDecrease;
		this._currentMP = aux > 0 ? aux : 0;
	}

	private _die() {
		console.log(`${this._name} just died...`);
	}

	private _playDeathAnimation() {
		console.log('_playDeathAnimation execution');
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

	get currentHP(): number {
		return this._currentHP;
	}

	get maxHP(): number {
		return this._maxHP;
	}

	get currentMP(): number {
		return this._currentMP;
	}

	get maxMP(): number {
		return this._maxMP;
	}
}

export default BaseCharacter;
