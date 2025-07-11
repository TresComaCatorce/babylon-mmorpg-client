import { Button, Control, TextBlock } from '@babylonjs/gui';

import { IBaseButtonGUIElementConstructorParams } from '@mmorpg/interfaces/ui/base-elements/IBaseButtonGUIElement';
import IBaseControlUIElement from '@mmorpg/interfaces/ui/base-elements/IBaseControlUIElement';
import GUI_ELEMENT_NAMES from '@mmorpg/utils/constants/GUI_ELEMENT_NAMES';
import MOUSE_CURSORS from '@mmorpg/utils/constants/MOUSE_CURSORS';

abstract class BaseButtonGUIElement extends Button implements IBaseControlUIElement {
	private _elementName: string;
	private _onHoverCursor?: string;
	private _onClickHandler?: () => void;
	protected _text!: TextBlock;

	constructor(params: IBaseButtonGUIElementConstructorParams) {
		super(params.elementName);
		this._elementName = params.elementName;
		this._onHoverCursor = params.onHoverCursor;
		this._onClickHandler = params.onClick;
		this._setupButtonTextElement(params.buttonText);
		this._setupButtonHoverPointer();
		this._setupOnClickHandler();
	}

	private _setupButtonTextElement(buttonText: string = '') {
		this._text = new TextBlock(`${this.elementName}${GUI_ELEMENT_NAMES.BUTTON_TEXT}`);
		this._text.text = buttonText;
		this._text.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
		this._text.textVerticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;
		this.addControl(this._text);
	}

	private _setupButtonHoverPointer() {
		if (this._onHoverCursor) {
			this.onPointerEnterObservable.add(() => {
				document.body.style.cursor = this._onHoverCursor ?? MOUSE_CURSORS.DEFAULT;
			});
			this.onPointerOutObservable.add(() => {
				document.body.style.cursor = MOUSE_CURSORS.DEFAULT;
			});
		}
	}

	private _setupOnClickHandler() {
		if (this._onClickHandler) {
			this.isHitTestVisible = true;
			this.onPointerUpObservable.add(this._onClickHandler.bind(this));
		}
	}

	get elementName(): string {
		return this._elementName;
	}
}

export default BaseButtonGUIElement;
