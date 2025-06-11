import { Rectangle, TextBlock } from '@babylonjs/gui';
import { Nullable } from '@babylonjs/core';

import { ICharacterNameUIElementConstructorParams } from '@mmorpg/interfaces/ui/ICharacterNameUIElement';
import GUI_ELEMENT_NAMES from '@mmorpg/utils/constants/GUI_ELEMENT_NAMES';
import BaseCharacter from '@mmorpg/game-objects/characters/BaseCharacter';

class CharacterNameUIElement extends Rectangle {
	private _characterInstance: BaseCharacter;
	private _characterNameTextElement: Nullable<TextBlock> = null;

	constructor(params: ICharacterNameUIElementConstructorParams) {
		super(GUI_ELEMENT_NAMES.CHARACTER_NAME);
		this._characterInstance = params.characterInstance;
		this._setStyles();
		this._createCharacterNameText();
		this._attachToCharacter();
	}

	private _setStyles() {
		this.width = '100px';
		this.height = '30px';
		this.cornerRadius = 5;
		this.color = 'white';
		this.thickness = 1;
		this.background = 'black';
	}

	private _createCharacterNameText() {
		this._characterNameTextElement = new TextBlock();
		this._characterNameTextElement.text = this._characterInstance.name;
		this._characterNameTextElement.color = 'white';
		this._characterNameTextElement.fontSize = 14;
		this.addControl(this._characterNameTextElement);
	}

	private _attachToCharacter() {
		this.linkWithMesh(this._characterInstance.rootNode);
		this.linkOffsetY = -100;
	}
}

export default CharacterNameUIElement;
