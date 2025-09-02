/* eslint-disable @typescript-eslint/no-unused-vars */
import { Nullable } from '@babylonjs/core';
import { Rectangle, StackPanel, TextBlock, Image, Control } from '@babylonjs/gui';
import BaseInventoryItem from '@mmorpg/game-objects/inventory/items/base/BaseInventoryItem';

import { InventoryItemToolTipGUIElementConstructorParams } from '@mmorpg/interfaces/ui/common-elements/inventory/IInventoryItemToolTipGUIElement';
import BaseRectangleGUIElement from '@mmorpg/ui/base-elements/BaseRectangleGUIElement';
import GUI_DEFAULT_VALUES from '@mmorpg/utils/constants/GUI_DEFAULT_VALUES';
import GUI_ELEMENT_NAMES from '@mmorpg/utils/constants/GUI_ELEMENT_NAMES';

class InventoryItemToolTipGUIElement extends BaseRectangleGUIElement {
	private _itemObjectData: BaseInventoryItem;
	private _stackPanelContainerGuiElement: StackPanel;
	private _itemNameTextBlockGuiElement: TextBlock;
	private _itemDescriptionTextBlockGuiElement: TextBlock;
	private _itemPriceGuiElement: Nullable<Rectangle> = null;

	constructor(params: InventoryItemToolTipGUIElementConstructorParams) {
		super({ elementName: `${params.owner.elementName}${GUI_ELEMENT_NAMES.TOOLTIP_CONTENT}` });
		this._itemObjectData = params.inventoryItemObjectData;
		this._setupLookAndFeel();
		this._stackPanelContainerGuiElement = this._createStackPanelContainer();
		this._itemNameTextBlockGuiElement = this._createItemNameTextBlockGuiElement();
		this._itemDescriptionTextBlockGuiElement = this._createItemDescriptionTextBlockGuiElement();
		this._itemPriceGuiElement = this._createItemPriceGuiElement();

		this._addInternalControls();
	}

	private _setupLookAndFeel() {
		this.thickness = 1;
		this.color = 'rgba(255, 255, 255, 0.8)';
		this.background = 'black';
		this.alpha = 0.8;
		this.cornerRadius = 3;
		this.adaptWidthToChildren = true;
		this.adaptHeightToChildren = true;
	}

	private _createStackPanelContainer(): StackPanel {
		const stackPanel = new StackPanel('cbftemp-stack-panel');
		stackPanel.adaptWidthToChildren = true;
		stackPanel.adaptHeightToChildren = true;
		return stackPanel;
	}

	private _createItemNameTextBlockGuiElement(): TextBlock {
		const itemNameTextBlock = new TextBlock('cbftemp-name', this._itemObjectData.name);
		itemNameTextBlock.resizeToFit = true;
		itemNameTextBlock.fontWeight = 'bold';
		itemNameTextBlock.color = 'rgba(255,255,255,0.8)';
		itemNameTextBlock.fontSizeInPixels = GUI_DEFAULT_VALUES.DEFAULT_FONT_SIZE_IN_PX;
		itemNameTextBlock.paddingTopInPixels = GUI_DEFAULT_VALUES.DEFAULT_PADDING_TOP_IN_PX;
		itemNameTextBlock.paddingBottomInPixels = GUI_DEFAULT_VALUES.DEFAULT_PADDING_BOTTOM_IN_PX;
		itemNameTextBlock.paddingLeftInPixels = GUI_DEFAULT_VALUES.DEFAULT_PADDING_LEFT_IN_PX;
		itemNameTextBlock.paddingRightInPixels = GUI_DEFAULT_VALUES.DEFAULT_PADDING_RIGHT_IN_PX;
		return itemNameTextBlock;
	}

	private _createItemDescriptionTextBlockGuiElement(): TextBlock {
		const itemNameTextBlock = new TextBlock('cbftemp-description', this._itemObjectData.description);
		itemNameTextBlock.color = 'rgba(255,255,255,0.8)';
		itemNameTextBlock.resizeToFit = true;
		itemNameTextBlock.fontSizeInPixels = GUI_DEFAULT_VALUES.DEFAULT_FONT_SIZE_IN_PX;
		itemNameTextBlock.paddingTopInPixels = GUI_DEFAULT_VALUES.DEFAULT_PADDING_TOP_IN_PX;
		itemNameTextBlock.paddingBottomInPixels = GUI_DEFAULT_VALUES.DEFAULT_PADDING_BOTTOM_IN_PX;
		itemNameTextBlock.paddingLeftInPixels = GUI_DEFAULT_VALUES.DEFAULT_PADDING_LEFT_IN_PX;
		itemNameTextBlock.paddingRightInPixels = GUI_DEFAULT_VALUES.DEFAULT_PADDING_RIGHT_IN_PX;
		return itemNameTextBlock;
	}

	private _createItemPriceGuiElement(): Nullable<Rectangle> {
		if (!this._itemObjectData.vendibleForGold) {
			return null;
		}

		const priceString = `Price: ${this._itemObjectData.sellPrice ?? 0}`;

		const itemPriceContainer = new Rectangle('cbftemp-price-container');
		// itemPriceContainer.adaptWidthToChildren = true;
		itemPriceContainer.adaptHeightToChildren = true;
		itemPriceContainer.color = 'transparent';
		itemPriceContainer.paddingTopInPixels = GUI_DEFAULT_VALUES.DEFAULT_PADDING_TOP_IN_PX;
		itemPriceContainer.paddingBottomInPixels = GUI_DEFAULT_VALUES.DEFAULT_PADDING_BOTTOM_IN_PX;

		const itemPriceTextBlock = new TextBlock('cbftemp-price-text', priceString);
		itemPriceTextBlock.resizeToFit = true;
		itemPriceTextBlock.fontSizeInPixels = GUI_DEFAULT_VALUES.DEFAULT_FONT_SIZE_IN_PX;
		itemPriceTextBlock.color = 'rgba(255,255,255,0.8)';

		const itemPriceIcon = new Image('cbftemp-price-icon', 'assets/icons/gold-coins.png');
		itemPriceIcon.widthInPixels = 16;
		itemPriceIcon.heightInPixels = 16;
		itemPriceIcon.paddingLeftInPixels = 5;

		itemPriceContainer.addControl(itemPriceTextBlock);
		itemPriceIcon.leftInPixels = priceString.length * 7 * 0.5;
		itemPriceContainer.addControl(itemPriceIcon);

		return itemPriceContainer;
	}

	private _addInternalControls() {
		const separator = new Rectangle('separator');
		separator.heightInPixels = 1;
		separator.background = 'rgba(255,255,255,0.3)';
		separator.color = 'transparent';
		separator.thickness = 0;
		separator.paddingLeftInPixels = 15;
		separator.paddingRightInPixels = 15;

		this._stackPanelContainerGuiElement.addControl(this._itemNameTextBlockGuiElement);
		this._stackPanelContainerGuiElement.addControl(separator);
		this._stackPanelContainerGuiElement.addControl(this._itemDescriptionTextBlockGuiElement);
		if (this._itemPriceGuiElement) {
			this._stackPanelContainerGuiElement.addControl(separator.clone());
			this._stackPanelContainerGuiElement.addControl(this._itemPriceGuiElement);
		}
		this.addControl(this._stackPanelContainerGuiElement);
	}
}

export default InventoryItemToolTipGUIElement;
