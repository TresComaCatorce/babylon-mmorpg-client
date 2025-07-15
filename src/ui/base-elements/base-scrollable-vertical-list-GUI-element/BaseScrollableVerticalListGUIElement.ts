import { Control } from '@babylonjs/gui';

import { IBaseScrollableVerticalListGUIElementConstructorParams } from '@mmorpg/interfaces/ui/base-elements/base-scrollable-vertical-list-GUI-element/IBaseScrollableVerticalListGUIElement';
import ScrollableVerticalListGUIElementStackPanel from '@mmorpg/ui/base-elements/base-scrollable-vertical-list-GUI-element/ScrollableVerticalListGUIElementStackPanel';
import BaseScrollViewerGUIElement from '@mmorpg/ui/base-elements/BaseScrollViewerGUIElement';
import GUI_ELEMENT_NAMES from '@mmorpg/utils/constants/GUI_ELEMENT_NAMES';

abstract class BaseScrollableVerticalListGUIElement extends BaseScrollViewerGUIElement {
	private _stackPanel!: ScrollableVerticalListGUIElementStackPanel;

	constructor(params: IBaseScrollableVerticalListGUIElementConstructorParams) {
		super(params);
		this._createStackPanel();
		this._configure();
		this._configureStackPanel();
	}

	public addItem(itemToAdd: Control): void {
		this._stackPanel.addControl(itemToAdd);
	}

	public clear(): void {
		this._stackPanel.clearControls();
	}

	private _createStackPanel() {
		this._stackPanel = new ScrollableVerticalListGUIElementStackPanel({ elementName: `${this.elementName}${GUI_ELEMENT_NAMES.STACK_PANEL}` });
	}

	private _configure() {
		this.thickness = 0;
		this.barSize = 10;
	}

	private _configureStackPanel() {
		this._stackPanel.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
		this._stackPanel.isVertical = true;
		this._stackPanel.spacing = 5;
		this._stackPanel.width = 1;
		this._stackPanel.paddingLeftInPixels = 5;
		this._stackPanel.paddingRightInPixels = 5;
		this.addControl(this._stackPanel);
	}
}

export default BaseScrollableVerticalListGUIElement;
