import { Control } from '@babylonjs/gui';

import BaseDraggableRectangleUIElement from '@mmorpg/ui/base-elements/BaseDraggableRectangleUIElement';
import { IBaseMainPanelGUIConstructorParams } from '@mmorpg/interfaces/ui/panels/IBaseMainPanelGUI';

abstract class BaseMainPanelGUI extends BaseDraggableRectangleUIElement {
	constructor(params: IBaseMainPanelGUIConstructorParams) {
		super(params);
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
