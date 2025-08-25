import { IBaseInventoryConstructorParams, IInventoryGrid } from '@mmorpg/interfaces/game-objects/inventory/IBaseInventory';
import IInventorySize from '@mmorpg/interfaces/game-objects/inventory/IInventorySize';
import BaseInventoryItem from '@mmorpg/game-objects/inventory/items/base/BaseInventoryItem';

abstract class BaseInventory {
	private _size: IInventorySize;
	private _grid: IInventoryGrid;

	constructor(params: IBaseInventoryConstructorParams) {
		this._size = params.size;
		this._grid = Array.from({ length: this._size.width }, () => Array.from({ length: this._size.height }, () => null));
	}

	public canPlaceItemAt(x: number, y: number, item: BaseInventoryItem): boolean {
		const itemWidth = item.size.width;
		const itemHeight = item.size.height;
		const inventoryWidth = this._size.width;
		const inventoryHeight = this._size.height;

		if (x + itemWidth > inventoryWidth || y + itemHeight > inventoryHeight) return false;

		for (let dy = 0; dy < itemHeight; dy++) {
			for (let dx = 0; dx < itemWidth; dx++) {
				if (this._grid[y + dy][x + dx]) return false;
			}
		}
		return true;
	}

	public placeItemAt(x: number, y: number, item: BaseInventoryItem): boolean {
		if (!this.canPlaceItemAt(x, y, item)) return false;
		const itemWidth = item.size.width;
		const itemHeight = item.size.height;

		for (let dy = 0; dy < itemHeight; dy++) {
			for (let dx = 0; dx < itemWidth; dx++) {
				this._grid[y + dy][x + dx] = item;
			}
		}
		return true;
	}

	get size(): IInventorySize {
		return this._size;
	}

	get grid(): IInventoryGrid {
		return this._grid;
	}
}

export default BaseInventory;
