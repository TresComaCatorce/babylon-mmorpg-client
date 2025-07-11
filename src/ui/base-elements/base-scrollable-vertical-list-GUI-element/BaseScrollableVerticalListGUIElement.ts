import { Button } from '@babylonjs/gui';

import ScrollableVerticalListGUIElementStackPanel from '@mmorpg/ui/base-elements/base-scrollable-vertical-list-GUI-element/ScrollableVerticalListGUIElementStackPanel';
import {
	IBaseScrollableVerticalListGUIElementConstructorParams,
	ListItemConfig,
} from '@mmorpg/interfaces/ui/base-elements/base-scrollable-vertical-list-GUI-element/IBaseScrollableVerticalListGUIElement';
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

	private _createStackPanel() {
		this._stackPanel = new ScrollableVerticalListGUIElementStackPanel({ elementName: `${this.elementName}${GUI_ELEMENT_NAMES.STACK_PANEL}` });
	}

	public addItem(config: ListItemConfig): void {
		const button = Button.CreateSimpleButton(`${this.name}_item_${config.label}`, config.label);
		button.height = '40px';
		button.width = 1; // 100%
		button.color = 'white';
		button.background = '#444';
		button.cornerRadius = 4;

		button.onPointerUpObservable.add(() => {
			config.onClick();
		});

		this._stackPanel.addControl(button);
	}

	public clear(): void {
		this._stackPanel.clearControls();
	}

	private _configure() {
		this.width = '250px';
		this.height = '300px';
		this.thickness = 0; // sin borde
		this.barSize = 10;
		this.color = '#888';
		this.background = '#222';
	}

	private _configureStackPanel() {
		this._stackPanel.isVertical = true;
		this._stackPanel.spacing = 5;
		this._stackPanel.width = 1;
		this.addControl(this._stackPanel);
	}
}

export default BaseScrollableVerticalListGUIElement;
