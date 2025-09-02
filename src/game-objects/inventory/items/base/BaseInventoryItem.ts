import { v4 as uuidv4 } from 'uuid';

import { IBaseInventoryItemConstructorParams } from '@mmorpg/interfaces/game-objects/inventory/items/base/IBaseInventoryItem';
import IInventorySize from '@mmorpg/interfaces/game-objects/inventory/IInventorySize';
import BaseItem from '@mmorpg/game-objects/inventory/items/base/BaseItem';

abstract class BaseInventoryItem extends BaseItem {
	private _serialNumber: string;
	private _size: IInventorySize;

	constructor(params: IBaseInventoryItemConstructorParams) {
		super(params);
		this._serialNumber = uuidv4();
		this._size = params.size;
	}

	get serialNumber(): string {
		return this._serialNumber;
	}

	get size(): IInventorySize {
		return this._size;
	}
}

export default BaseInventoryItem;
