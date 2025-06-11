import Item from '@mmorpg/game-objects/inventory/BaseItem';

class InventorySlot {
	constructor(
		public item: Item,
		public quantity: number = 1,
	) {}

	increase(amount: number = 1) {
		this.quantity += amount;
	}

	decrease(amount: number = 1) {
		this.quantity = Math.max(this.quantity - amount, 0);
	}
}

export default InventorySlot;
