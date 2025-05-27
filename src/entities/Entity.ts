abstract class Entity {
	private static _instancesCounter: number = 0;

	private static _getEntityId(): string {
		Entity._instancesCounter++;
		return Entity._instancesCounter.toString();
	}

	private _id: string;

	constructor() {
		this._id = Entity._getEntityId();
	}

	public abstract update(): void;
	protected abstract _onMeshLoaded(): void;

	get id(): string {
		return this._id;
	}
}

export default Entity;
