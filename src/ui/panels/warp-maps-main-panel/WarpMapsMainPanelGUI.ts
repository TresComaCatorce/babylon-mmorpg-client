import { IWarpMapsMainPanelGUIConstructorParams } from '@mmorpg/interfaces/ui/panels/warp-maps-main-panel/IWarpMapsMainPanelGUI';
import IPlayerCharacterRelated from '@mmorpg/interfaces/common-interfaces/IPlayerCharacterRelated';
import PlayerCharacter from '@mmorpg/game-objects/characters/PlayerCharacter';
import GUI_ELEMENT_NAMES from '@mmorpg/utils/constants/GUI_ELEMENT_NAMES';
import BaseMainPanelGUI from '@mmorpg/ui/panels/BaseMainPanelGUI';
import GameController from '@mmorpg/controllers/GameController';
import KEY_CODES from '@mmorpg/utils/constants/KEY_CODES';

class WarpMapsMainPanelGUI extends BaseMainPanelGUI implements IPlayerCharacterRelated {
	private _characterInstance: PlayerCharacter;

	constructor(params: IWarpMapsMainPanelGUIConstructorParams) {
		super({
			elementName: GUI_ELEMENT_NAMES.WARP_MAPS_PANEL,
			closePanel: () => {
				this._characterInstance.keyboardInputController?.simulateToggleKeyPressed(KEY_CODES.M);
			},
			title: 'Warp Maps List',
		});
		this._characterInstance = params.characterInstance;
	}

	protected _setDefaultPosition() {
		const canvasElement = GameController.getInstance().canvasElement;
		this.leftInPixels = canvasElement.width * 0.01;
		this.topInPixels = canvasElement.height / 2 - this.heightInPixels / 2;
	}

	protected _setSize() {
		const canvasElement = GameController.getInstance().canvasElement;
		this.widthInPixels = canvasElement.width * 0.27;
		this.heightInPixels = canvasElement.height * 0.7;
	}

	protected _setLookAndFeel() {
		this.background = 'black';
	}

	get characterInstance(): PlayerCharacter {
		return this._characterInstance;
	}
}

export default WarpMapsMainPanelGUI;
