import { Container, Control, TextBlock } from '@babylonjs/gui';
import { Nullable } from '@babylonjs/core';

import BaseDraggableRectangleGUIElement from '@mmorpg/ui/base-elements/BaseDraggableRectangleGUIElement';
import { IBaseMainPanelGUIConstructorParams } from '@mmorpg/interfaces/ui/panels/IBaseMainPanelGUI';
import IBaseControlGUIElement from '@mmorpg/interfaces/ui/base-elements/IBaseControlGUIElement';
import CloseButtonGUIElement from '@mmorpg/ui/common-elements/buttons/CloseButtonGUIElement';
import GUI_ELEMENT_NAMES from '@mmorpg/utils/constants/GUI_ELEMENT_NAMES';
import { isEmptyString } from '@mmorpg/utils/strings';

const DRAG_CONTROL_AREA_HORIZONTAL_PERCENTAGE = 86;
const DRAG_CONTROL_AREA_VERTICAL_PERCENTAGE = 5;

abstract class BaseMainPanelGUI extends BaseDraggableRectangleGUIElement {
	private static _panelInstances: BaseMainPanelGUI[] = [];
	private _titleText: string;
	private _titleElement: Nullable<TextBlock> = null;
	private _closeButton!: CloseButtonGUIElement;
	protected _mainContentContainer: Container = new Container(`${this.elementName}${GUI_ELEMENT_NAMES.MAIN_CONTENT_CONTAINER}`);

	constructor(params: IBaseMainPanelGUIConstructorParams) {
		super({
			...params,
			dragControlAreaPercentage: {
				horizontalPercentage: DRAG_CONTROL_AREA_HORIZONTAL_PERCENTAGE,
				verticalPercentage: DRAG_CONTROL_AREA_VERTICAL_PERCENTAGE,
			},
		});
		BaseMainPanelGUI._panelInstances.push(this);
		this._titleText = params.title ?? '';
		this._addTitle();
		this._setZIndex();
		this._setAlignments();
		this._setCornerRadius();
		this._setSize();
		this._setDefaultPosition();
		this._setLookAndFeel();
		this._setPanelOverlapBehaviour();
		this._addCloseButton(params.closePanel);
		this._createMainContentContainer();
	}

	protected abstract _setSize(): void;

	protected abstract _setDefaultPosition(): void;

	protected abstract _setLookAndFeel(): void;

	protected _addToPanelContentContainer(elementToAdd: IBaseControlGUIElement) {
		this._mainContentContainer.addControl(elementToAdd);
	}

	private _addTitle() {
		if (!isEmptyString(this._titleText)) {
			this._titleElement = new TextBlock(`${this.elementName}${GUI_ELEMENT_NAMES.TITLE}`, this._titleText);
			this._titleElement.color = 'white';
			this._titleElement.fontSizeInPixels = 16;
			this._dragControlArea.addControl(this._titleElement);
		}
	}

	private _setZIndex() {
		this.zIndex = 1;
	}

	private _setAlignments() {
		this.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
		this.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
	}

	private _setCornerRadius() {
		this.cornerRadius = 10;
	}

	private _setPanelOverlapBehaviour() {
		this.onPointerDownObservable.add(() => {
			this._bringThisPanelToFront();
		});
	}

	private _addCloseButton(closePanel?: () => void) {
		this._closeButton = new CloseButtonGUIElement({
			elementName: `${this.elementName}${GUI_ELEMENT_NAMES.CLOSE_BUTTON}`,
			onClick: closePanel,
		});
		this._closeButton.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
		this._closeButton.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
		this._closeButton.leftInPixels = -7;
		this._closeButton.topInPixels = 6;
		this.addControl(this._closeButton);
	}

	private _createMainContentContainer() {
		this.onResizeObservable.add(({ height }) => {
			const topToApply = this._dragControlArea.heightInPixels * 1.2;
			this._mainContentContainer.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
			this._mainContentContainer.heightInPixels = height - topToApply;
			this._mainContentContainer.topInPixels = topToApply;
			this.addControl(this._mainContentContainer);
		});
	}

	private _bringThisPanelToFront() {
		const maxZIndex = Math.max(...BaseMainPanelGUI._panelInstances.map((p) => p.zIndex ?? 0));
		this.zIndex = maxZIndex + 1;
	}
}

export default BaseMainPanelGUI;
