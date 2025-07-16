import { Ellipse, Rectangle, Control, TextBlock } from '@babylonjs/gui';

import { IHealthPointsIndicatorGUIConstructorParams } from '@mmorpg/interfaces/ui/navbars/main-navbar/IHealthPointsIndicatorGUI';
import IPlayerCharacterRelated from '@mmorpg/interfaces/common-interfaces/IPlayerCharacterRelated';
import BaseContainerGUIElement from '@mmorpg/ui/base-elements/BaseContainerGUIElement';
import PlayerCharacter from '@mmorpg/game-objects/characters/PlayerCharacter';
import GUI_ELEMENT_NAMES from '@mmorpg/utils/constants/GUI_ELEMENT_NAMES';

const WIDTH = '110px';
const HEIGHT = '110px';
const HORIZONTAL_ALIGNMENT = Control.HORIZONTAL_ALIGNMENT_LEFT;
const VERTICAL_ALIGNMENT = Control.VERTICAL_ALIGNMENT_TOP;
const BORDER_COLOR = 'black';
const BORDER_THICKNESS = 5;
const BACKGROUND_CIRCLE_COLOR = 'gray';
const FILL_CIRCLE_COLOR = 'red';

export class HealthPointsIndicator extends BaseContainerGUIElement implements IPlayerCharacterRelated {
	private _playerInstance: PlayerCharacter;
	private _backgroundCircle!: Ellipse;
	private _fillContainer!: Rectangle;
	private _fillCircle!: Ellipse;
	private _borderCircle!: Ellipse;
	private _hpValuesText!: TextBlock;
	private _healthPointsPercent: number = 0;

	constructor(params: IHealthPointsIndicatorGUIConstructorParams) {
		super({ elementName: GUI_ELEMENT_NAMES.PLAYER_HP_INDICATOR });
		this._playerInstance = params.characterInstance;
		this._configureIndicator();
		this._createBackgroundCircle();
		this._createFillCircle();
		this._createBorderCircle();
		this._createHPValuesText();
		this.update();
	}

	public update() {
		this._updateHealthPointsPercent();
		this._updateFillCircle();
		this._updateHealthPointsTextValues();
	}

	private _configureIndicator() {
		this.width = WIDTH;
		this.height = HEIGHT;
		this.horizontalAlignment = HORIZONTAL_ALIGNMENT;
		this.verticalAlignment = VERTICAL_ALIGNMENT;
	}

	private _createBackgroundCircle() {
		this._backgroundCircle = new Ellipse('Background');
		this._backgroundCircle.width = '100%';
		this._backgroundCircle.height = '100%';
		this._backgroundCircle.color = '';
		this._backgroundCircle.thickness = 0;
		this._backgroundCircle.background = BACKGROUND_CIRCLE_COLOR;
		this.addControl(this._backgroundCircle);
	}

	private _createFillCircle() {
		this._fillContainer = new Rectangle('Fill container');
		this._fillContainer.width = '100px';
		this._fillContainer.height = '100px';
		this._fillContainer.clipChildren = true;
		this._fillContainer.thickness = 0;

		this._fillCircle = new Ellipse('Fill red');
		this._fillCircle.width = '100px';
		this._fillCircle.height = '100px';
		this._fillCircle.color = '';
		this._fillCircle.thickness = 0;
		this._fillCircle.background = FILL_CIRCLE_COLOR;

		this._fillContainer.addControl(this._fillCircle);
		this.addControl(this._fillContainer);
	}

	private _createBorderCircle() {
		this._borderCircle = new Ellipse('Border');
		this._borderCircle.width = '100%';
		this._borderCircle.height = '100%';
		this._borderCircle.color = BORDER_COLOR;
		this._borderCircle.thickness = BORDER_THICKNESS;
		this._borderCircle.background = '';
		this.addControl(this._borderCircle);
	}

	private _createHPValuesText() {
		this._hpValuesText = new TextBlock('HP Text');
		this._hpValuesText.color = 'white';
		this._hpValuesText.fontSize = '13px';
		this._hpValuesText.fontFamily = 'Arial';
		this._hpValuesText.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
		this._hpValuesText.textVerticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;
		this._hpValuesText.shadowColor = 'black';
		this._hpValuesText.shadowOffsetX = 1;
		this._hpValuesText.shadowOffsetY = 1;
		this._hpValuesText.shadowBlur = 3;
		this._hpValuesText.outlineWidth = 3;
		this._hpValuesText.outlineColor = 'black';
		this.addControl(this._hpValuesText);
	}

	private _updateHealthPointsPercent() {
		const currentHP = this._playerInstance.currentHP;
		const maxHP = this._playerInstance.maxHP;
		this._healthPointsPercent = Math.trunc((currentHP * 100) / maxHP);
	}

	private _updateFillCircle() {
		this._fillContainer.height = `${this._healthPointsPercent}%`;
		const aux = Math.trunc((100 - this._healthPointsPercent) / 2);
		this._fillContainer.top = `${aux}px`;
		this._fillCircle.top = `-${aux > 0 ? aux - 1 : aux}px`;
	}

	private _updateHealthPointsTextValues() {
		this._hpValuesText.text = `${this._playerInstance.currentHP}/${this._playerInstance.maxHP}`;
	}

	get characterInstance(): PlayerCharacter {
		return this._playerInstance;
	}
}
