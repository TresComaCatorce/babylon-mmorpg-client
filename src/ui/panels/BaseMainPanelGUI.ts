import { Control } from '@babylonjs/gui';

import BaseDraggableRectangleUIElement from '@mmorpg/ui/base-elements/BaseDraggableRectangleUIElement';
import { IBaseMainPanelGUIConstructorParams } from '@mmorpg/interfaces/ui/panels/IBaseMainPanelGUI';

const DRAG_CONTROL_AREA_HORIZONTAL_PERCENTAGE = 86;
const DRAG_CONTROL_AREA_VERTICAL_PERCENTAGE = 3;

abstract class BaseMainPanelGUI extends BaseDraggableRectangleUIElement {
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
	}

	private _setAlignments() {
		this.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
		this.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
	}

	protected abstract _setDefaultPosition(): void;

	protected abstract _setSize(): void;

	protected abstract _setLookAndFeel(): void;
}

export default BaseMainPanelGUI;
