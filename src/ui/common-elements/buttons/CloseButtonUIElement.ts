import { ICloseButtonUIElementConstructorParams } from '@mmorpg/interfaces/ui/common-elements/buttons/ICloseButtonUIElement';
import BaseButtonGUIElement from '@mmorpg/ui/base-elements/BaseButtonGUIElement';
import MOUSE_CURSORS from '@mmorpg/utils/constants/MOUSE_CURSORS';

class CloseButtonUIElement extends BaseButtonGUIElement {
	constructor(params: ICloseButtonUIElementConstructorParams) {
		super({ ...params, buttonText: '✕', onHoverCursor: MOUSE_CURSORS.POINTER });
		this._setupStyle();
	}

	private _setupStyle() {
		this._text.fontSize = 13;
		this.widthInPixels = 20;
		this.heightInPixels = 20;
		this.color = 'white';
		this.background = '#AA0000';
		this.cornerRadius = 5;
	}
}

export default CloseButtonUIElement;
