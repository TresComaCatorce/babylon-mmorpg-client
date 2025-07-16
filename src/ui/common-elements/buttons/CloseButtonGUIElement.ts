import { ICloseButtonGUIElementConstructorParams } from '@mmorpg/interfaces/ui/common-elements/buttons/ICloseButtonGUIElement';
import BaseButtonGUIElement from '@mmorpg/ui/base-elements/BaseButtonGUIElement';
import MOUSE_CURSORS from '@mmorpg/utils/constants/MOUSE_CURSORS';

class CloseButtonGUIElement extends BaseButtonGUIElement {
	constructor(params: ICloseButtonGUIElementConstructorParams) {
		super({ ...params, buttonText: '✕', onHoverCursor: MOUSE_CURSORS.POINTER });
		this._setupLookAndFeel_ext();
	}

	private _setupLookAndFeel_ext() {
		this.text.fontSize = 13;
		this.widthInPixels = 20;
		this.heightInPixels = 20;
		this.color = 'white';
		this.background = '#AA0000';
		this.cornerRadius = 5;
	}
}

export default CloseButtonGUIElement;
