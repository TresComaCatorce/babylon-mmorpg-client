import { IWarpMapsMainPanelGUIConstructorParams } from '@mmorpg/interfaces/ui/panels/warp-maps-main-panel/IWarpMapsMainPanelGUI';
import WarpMapsMainPanelGUIItemButton from '@mmorpg/ui/panels/warp-maps-main-panel/WarpMapsMainPanelGUIItemButton';
import WarpMapsMainPanelGUIList from '@mmorpg/ui/panels/warp-maps-main-panel/WarpMapsMainPanelGUIList';
import IPlayerCharacterRelated from '@mmorpg/interfaces/common-interfaces/IPlayerCharacterRelated';
import PlayerCharacter from '@mmorpg/game-objects/characters/PlayerCharacter';
import GUI_ELEMENT_NAMES from '@mmorpg/utils/constants/GUI_ELEMENT_NAMES';
import BaseMainPanelGUI from '@mmorpg/ui/panels/BaseMainPanelGUI';
import GameController from '@mmorpg/controllers/GameController';
import KEY_CODES from '@mmorpg/utils/constants/KEY_CODES';
import MAPS_LIST from '@mmorpg/utils/mock/MAPS_LIST';

class WarpMapsMainPanelGUI extends BaseMainPanelGUI implements IPlayerCharacterRelated {
	private _characterInstance: PlayerCharacter;
	private _mapsList: WarpMapsMainPanelGUIList;

	constructor(params: IWarpMapsMainPanelGUIConstructorParams) {
		super({
			elementName: GUI_ELEMENT_NAMES.WARP_MAPS_PANEL,
			closePanel: () => {
				this._characterInstance.keyboardInputController?.simulateToggleKeyPressed(KEY_CODES.M);
			},
			title: 'Warp Maps List',
		});
		this._characterInstance = params.characterInstance;
		this._mapsList = new WarpMapsMainPanelGUIList();
		this._configureMapList();
		this._addAllMapsOptions();
		this._mainContentContainer.addControl(this._mapsList);
	}

	protected _setDefaultPosition() {
		const canvasElement = GameController.getInstance().canvasElement;
		this.leftInPixels = canvasElement.width * 0.01;
		this.topInPixels = canvasElement.height / 2 - this.heightInPixels / 2;
	}

	protected _setSize() {
		const canvasElement = GameController.getInstance().canvasElement;
		this.widthInPixels = canvasElement.width * 0.27;
		this.heightInPixels = canvasElement.height * 0.8;
	}

	protected _setLookAndFeel() {
		this.background = 'black';
	}

	private _configureMapList() {
		// this._mapsList.background = 'red';
	}

	private _addAllMapsOptions() {
		for (let i = 0; MAPS_LIST.length > i; i++) {
			const rawItemToAdd = MAPS_LIST[i];
			const itemToAdd = new WarpMapsMainPanelGUIItemButton({
				elementName: rawItemToAdd.mapId,
				buttonText: rawItemToAdd.displayName,
				enabled: rawItemToAdd.enabled,
				unmetRequirements: this._characterInstance.level < rawItemToAdd.levelRequired,
				onClick: () => {
					console.log('Move to grass map');
				},
			});
			this._mapsList.addMapToList(itemToAdd);
		}
	}

	get characterInstance(): PlayerCharacter {
		return this._characterInstance;
	}
}

export default WarpMapsMainPanelGUI;
