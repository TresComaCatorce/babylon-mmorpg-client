import { IEntityConstructorParams } from '@mmorpg/interfaces/game-objects/IEntity';

abstract class Entity {
	private static _instancesCounter: number = 0;

	private static _getInstanceNumber(): string {
		Entity._instancesCounter++;
		return Entity._instancesCounter.toString();
	}

	static get instanceNumber(): number {
		return Entity._instancesCounter;
	}

	private _id: string;
	private _instanceNumber: string;

	constructor(params: IEntityConstructorParams) {
		this._instanceNumber = Entity._getInstanceNumber();
		this._id = params.id;
	}

	public abstract update(): void;
	protected abstract _onMeshLoaded(): void;

	get id(): string {
		return this._id;
	}

	get instanceNumber(): string {
		return this._instanceNumber;
	}
}

export default Entity;
