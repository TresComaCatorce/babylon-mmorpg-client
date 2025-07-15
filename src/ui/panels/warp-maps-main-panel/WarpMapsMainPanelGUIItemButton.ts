import { IWarpMapsMainPanelGUIItemButtonConstructorParams } from '@mmorpg/interfaces/ui/panels/warp-maps-main-panel/IWarpMapsMainPanelGUIItemButton';
import BaseButtonGUIElement from '@mmorpg/ui/base-elements/BaseButtonGUIElement';
import MOUSE_CURSORS from '@mmorpg/utils/constants/MOUSE_CURSORS';

const BACKGROUND_COLOR_DEFAULT = '#121111ff';
const BACKGROUND_COLOR_HOVER = '#353434ff';

class WarpMapsMainPanelGUIItemButton extends BaseButtonGUIElement {
	constructor(params: IWarpMapsMainPanelGUIItemButtonConstructorParams) {
		super({
			...params,
			onHoverCursor: MOUSE_CURSORS.POINTER,
			onHover: () => {
				this.background = BACKGROUND_COLOR_HOVER;
			},
			onPointerOut: () => {
				this.background = BACKGROUND_COLOR_DEFAULT;
			},
		});
		this._configure();
	}

	private _configure() {
		this.heightInPixels = 22;
		this.fontSize = '13px';
		this.width = '100%';
		this.color = 'white';
		this.background = BACKGROUND_COLOR_DEFAULT;
	}
}

export default WarpMapsMainPanelGUIItemButton;
