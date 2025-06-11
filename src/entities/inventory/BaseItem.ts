import { IBaseItemConstructorParams } from '@mmorpg/interfaces/entities/items/IBaseItem';
import Entity from '@mmorpg/entities/Entity';

abstract class BaseItem extends Entity {
	private _name: string;
	private _description: string;
	private _stackable: boolean = false;
	private _maxStack: number = -1;

	constructor(params: IBaseItemConstructorParams) {
		super();
		this._name = params.name;
		this._description = params.description;
	}

	get name(): string {
		return this._name;
	}

	get description(): string {
		return this._description;
	}

	get stackable(): boolean {
		return this._stackable;
	}
	get maxStack(): number {
		return this._maxStack;
	}
}

export default BaseItem;
