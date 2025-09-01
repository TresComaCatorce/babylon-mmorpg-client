import { ICloseButtonGUIElementConstructorParams } from '@mmorpg/interfaces/ui/common-elements/buttons/ICloseButtonGUIElement';
import BaseButtonGUIElement from '@mmorpg/ui/base-elements/BaseButtonGUIElement';
import GUI_DEFAULT_VALUES from '@mmorpg/utils/constants/GUI_DEFAULT_VALUES';
import MOUSE_CURSORS from '@mmorpg/utils/constants/MOUSE_CURSORS';

class CloseButtonGUIElement extends BaseButtonGUIElement {
	constructor(params: ICloseButtonGUIElementConstructorParams) {
		super({ ...params, buttonText: '✕', onHoverCursor: MOUSE_CURSORS.POINTER, toolTipText: 'Close' });
		this._setupLookAndFeel_ext();
	}

	private _setupLookAndFeel_ext() {
		this.color = 'rgba(255,255,255,0.8)';
		this.background = '#AA0000';
		this.cornerRadius = 5;
		this.text.fontSize = GUI_DEFAULT_VALUES.DEFAULT_FONT_SIZE_IN_PX;
		this.adaptWidthToChildren = false;
		this.adaptHeightToChildren = false;
		this.widthInPixels = 20;
		this.heightInPixels = 20;
	}
}

export default CloseButtonGUIElement;
