import { Control } from '@babylonjs/gui';

import BaseDraggableRectangleUIElement from '@mmorpg/ui/base-elements/BaseDraggableRectangleUIElement';
import { IBaseMainPanelGUIConstructorParams } from '@mmorpg/interfaces/ui/panels/IBaseMainPanelGUI';
import CloseButtonUIElement from '@mmorpg/ui/common-elements/buttons/CloseButtonUIElement';
import GUI_ELEMENT_NAMES from '@mmorpg/utils/constants/GUI_ELEMENT_NAMES';

const DRAG_CONTROL_AREA_HORIZONTAL_PERCENTAGE = 86;
const DRAG_CONTROL_AREA_VERTICAL_PERCENTAGE = 4;

abstract class BaseMainPanelGUI extends BaseDraggableRectangleUIElement {
	private _closeButton!: CloseButtonUIElement;

	constructor(params: IBaseMainPanelGUIConstructorParams) {
		super({
			...params,
			dragControlAreaPercentage: {
				horizontalPercentage: DRAG_CONTROL_AREA_HORIZONTAL_PERCENTAGE,
				verticalPercentage: DRAG_CONTROL_AREA_VERTICAL_PERCENTAGE,
			},
		});
		this._setAlignments();
		this._setSize();
		this._setDefaultPosition();
		this._setLookAndFeel();
		this._addCloseButton(params.closePanel);
	}

	protected abstract _setDefaultPosition(): void;

	protected abstract _setSize(): void;

	protected abstract _setLookAndFeel(): void;

	private _setAlignments() {
		this.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
		this.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
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
}

export default BaseMainPanelGUI;
