import { Control, TextBlock } from '@babylonjs/gui';
import { Nullable } from '@babylonjs/core';

import BaseDraggableRectangleGUIElement from '@mmorpg/ui/base-elements/BaseDraggableRectangleGUIElement';
import { IBaseMainPanelGUIConstructorParams } from '@mmorpg/interfaces/ui/panels/IBaseMainPanelGUI';
import CloseButtonUIElement from '@mmorpg/ui/common-elements/buttons/CloseButtonUIElement';
import GUI_ELEMENT_NAMES from '@mmorpg/utils/constants/GUI_ELEMENT_NAMES';
import { isEmptyString } from '@mmorpg/utils/strings';

const DRAG_CONTROL_AREA_HORIZONTAL_PERCENTAGE = 86;
const DRAG_CONTROL_AREA_VERTICAL_PERCENTAGE = 4;

abstract class BaseMainPanelGUI extends BaseDraggableRectangleGUIElement {
	private static _panelInstances: BaseMainPanelGUI[] = [];
	private _titleText: string;
	private _titleElement: Nullable<TextBlock> = null;
	private _closeButton!: CloseButtonUIElement;

	constructor(params: IBaseMainPanelGUIConstructorParams) {
		super({
			...params,
			dragControlAreaPercentage: {
				horizontalPercentage: DRAG_CONTROL_AREA_HORIZONTAL_PERCENTAGE,
				verticalPercentage: DRAG_CONTROL_AREA_VERTICAL_PERCENTAGE,
			},
		});
		BaseMainPanelGUI._panelInstances.push(this);
		this.zIndex = 1;
		this._titleText = params.title ?? '';
		this._addTitle();
		this._setAlignments();
		this._setSize();
		this._setDefaultPosition();
		this._setLookAndFeel();
		this._setPanelOverlapBehaviour();
		this._addCloseButton(params.closePanel);
	}

	protected abstract _setSize(): void;

	protected abstract _setDefaultPosition(): void;

	protected abstract _setLookAndFeel(): void;

	private _addTitle() {
		if (!isEmptyString(this._titleText)) {
			this._titleElement = new TextBlock(`${this.elementName}${GUI_ELEMENT_NAMES.TITLE}`, this._titleText);
			this._titleElement.color = 'white';
			this._titleElement.fontSizeInPixels = 15;
			this._dragControlArea.addControl(this._titleElement);
		}
	}

	private _setAlignments() {
		this.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
		this.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
	}

	private _setPanelOverlapBehaviour() {
		this.onPointerDownObservable.add(() => {
			this._bringThisPanelToFront();
		});
	}

	private _addCloseButton(closePanel?: () => void) {
		this._closeButton = new CloseButtonUIElement({
			elementName: `${this.elementName}${GUI_ELEMENT_NAMES.CLOSE_BUTTON}`,
			onClick: closePanel,
		});
		this._closeButton.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
		this._closeButton.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
		this._closeButton.leftInPixels = -3;
		this._closeButton.topInPixels = 3;
		this.addControl(this._closeButton);
	}

	private _bringThisPanelToFront() {
		const maxZIndex = Math.max(...BaseMainPanelGUI._panelInstances.map((p) => p.zIndex ?? 0));
		this.zIndex = maxZIndex + 1;
	}
}

export default BaseMainPanelGUI;
