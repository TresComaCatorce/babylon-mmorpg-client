import { StackPanel, TextBlock } from '@babylonjs/gui';
import BaseInventoryItem from '@mmorpg/game-objects/inventory/items/base/BaseInventoryItem';

import { InventoryItemToolTipGUIElementConstructorParams } from '@mmorpg/interfaces/ui/common-elements/inventory/IInventoryItemToolTipGUIElement';
import BaseRectangleGUIElement from '@mmorpg/ui/base-elements/BaseRectangleGUIElement';
import GUI_DEFAULT_VALUES from '@mmorpg/utils/constants/GUI_DEFAULT_VALUES';
import GUI_ELEMENT_NAMES from '@mmorpg/utils/constants/GUI_ELEMENT_NAMES';

class InventoryItemToolTipGUIElement extends BaseRectangleGUIElement {
	private _itemObjectData: BaseInventoryItem;
	private _itemNameTextBlockGuiElement: TextBlock;
	private _itemDescriptionTextBlockGuiElement: TextBlock;

	constructor(params: InventoryItemToolTipGUIElementConstructorParams) {
		super({ elementName: `${params.owner.elementName}${GUI_ELEMENT_NAMES.TOOLTIP_CONTENT}` });
		this._itemObjectData = params.inventoryItemObjectData;
		this._setupLookAndFeel();
		this._itemNameTextBlockGuiElement = this._createItemNameTextBlockGuiElement();
		this._itemDescriptionTextBlockGuiElement = this._createItemDescriptionTextBlockGuiElement();
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
		itemNameTextBlock.paddingBottomInPixels = GUI_DEFAULT_VALUES.DEFAULT_PADDING_BOTTOM_IN_PX;
		itemNameTextBlock.paddingLeftInPixels = GUI_DEFAULT_VALUES.DEFAULT_PADDING_LEFT_IN_PX;
		itemNameTextBlock.paddingRightInPixels = GUI_DEFAULT_VALUES.DEFAULT_PADDING_RIGHT_IN_PX;
		return itemNameTextBlock;
	}

	private _addInternalControls() {
		const stackPanel = new StackPanel('cbftemp-stack-panel');
		stackPanel.adaptWidthToChildren = true;
		stackPanel.adaptHeightToChildren = true;
		stackPanel.addControl(this._itemNameTextBlockGuiElement);
		stackPanel.addControl(this._itemDescriptionTextBlockGuiElement);
		this.addControl(stackPanel);
	}
}

export default InventoryItemToolTipGUIElement;
