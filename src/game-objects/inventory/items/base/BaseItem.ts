import { Nullable } from '@babylonjs/core';

import { IBaseItemConstructorParams } from '@mmorpg/interfaces/game-objects/inventory/items/base/IBaseItem';
import Entity from '@mmorpg/game-objects/Entity';

abstract class BaseItem extends Entity {
	private _itemId: string;
	private _displayNameText: string;
	private _descriptionText: string;
	private _vendibleForGold: boolean = false;
	private _sellPrice: Nullable<number> = null;
	private _buyPrice: Nullable<number> = null;
	private _stackable: boolean = false;
	private _currentStackQuantity: number = 0;
	private _maxStackQuantity: number = -1;
	private _modelUrl: string = '';
	private _iconUrl: string = '';

	constructor(params: IBaseItemConstructorParams) {
		super();
		this._itemId = params.itemId;
		this._displayNameText = params.displayNameText;
		this._descriptionText = params.descriptionText;
		this._modelUrl = params.modelUrl;
		this._iconUrl = params.iconUrl;
		this._vendibleForGold = params.itemVendibleForGold;
		this._sellPrice = params.itemGoldSellPrice ? params.itemGoldSellPrice : null;
		this._buyPrice = params.itemGoldBuyPrice ? params.itemGoldBuyPrice : null;
		if (params.stackable === true) {
			this._stackable = true;
			this._currentStackQuantity = params.currentStackQuantity ? params.currentStackQuantity : 0;
			this._maxStackQuantity = params.maxStackQuantity ? params.maxStackQuantity : -1;
		}
	}

	get id(): string {
		return this._itemId;
	}

	get name(): string {
		return this._displayNameText;
	}

	get description(): string {
		return this._descriptionText;
	}

	get stackable(): boolean {
		return this._stackable;
	}

	get currentStackQuantity(): number {
		return this._currentStackQuantity;
	}

	get maxStackQuantity(): number {
		return this._maxStackQuantity;
	}

	get modelUrl(): string {
		return this._modelUrl;
	}

	get iconUrl(): string {
		return this._iconUrl;
	}

	get vendibleForGold(): boolean {
		return this._vendibleForGold;
	}

	get sellPrice(): Nullable<number> {
		return this._sellPrice;
	}

	get buyPrice(): Nullable<number> {
		return this._buyPrice;
	}
}

export default BaseItem;
