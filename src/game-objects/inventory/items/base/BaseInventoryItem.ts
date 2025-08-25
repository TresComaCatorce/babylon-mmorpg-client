import { v4 as uuidv4 } from 'uuid';

import { IBaseInventoryItemConstructorParams } from '@mmorpg/interfaces/game-objects/inventory/items/base/IBaseInventoryItem';
import IInventorySize from '@mmorpg/interfaces/game-objects/inventory/IInventorySize';
import BaseItem from '@mmorpg/game-objects/inventory/items/base/BaseItem';

abstract class BaseInventoryItem extends BaseItem {
	private _serialNumber: string;
	private _itemSize: IInventorySize;

	constructor(params: IBaseInventoryItemConstructorParams) {
		super(params);
		this._serialNumber = uuidv4();
		this._itemSize = params.itemSize;
	}

	get serialNumber(): string {
		return this._serialNumber;
	}

	get size(): IInventorySize {
		return this._itemSize;
	}
}

export default BaseInventoryItem;
