import { Button, Control, TextBlock } from '@babylonjs/gui';

import { IBaseButtonGUIElementConstructorParams } from '@mmorpg/interfaces/ui/base-elements/IBaseButtonGUIElement';
import IBaseControlGUIElement from '@mmorpg/interfaces/ui/base-elements/IBaseControlGUIElement';
import GUI_ELEMENT_NAMES from '@mmorpg/utils/constants/GUI_ELEMENT_NAMES';
import MOUSE_CURSORS from '@mmorpg/utils/constants/MOUSE_CURSORS';
import ToolTipManager from '../managers/ToolTipManager';

const DEFAULT_HEIGHT = 22;
const DEFAULT_COLOR = 'white';
const DEFAULT_DISABLED_COLOR = '#545454ff';
const DEFAULT_BACKGROUND_COLOR = '#121111ff';
const DEFAULT_HOVER_BACKGROUND_COLOR = '#353434ff';
const DEFAULT_FONT_SIZE = '13px';
const DEFAULT_CORNER_RADIUS = 5;

/**
 * @abstract
 * @class BaseButtonGUIElement
 * @description Base class used to create a button.
 * @param {string} elementName - Name of the button element.
 * @param {string | undefined} buttonText - Text to show in the button.
 * @param {MOUSE_CURSORS | undefined} onHoverCursor - Cursor to show in the "onHover" of the button.
 * @param {() => void | undefined} onClick - Callback to execute when the user clicks in the button.
 */
abstract class BaseButtonGUIElement extends Button implements IBaseControlGUIElement {
	private _elementName: string;
	private _enabled: boolean;
	private _onHoverCursor?: string;
	private _onClickHandler?: () => void;
	private _onHoverHandler?: () => void;
	private _onPointerOutHandler?: () => void;
	private _textElement!: TextBlock;

	constructor(params: IBaseButtonGUIElementConstructorParams) {
		super(params.elementName);
		this._elementName = params.elementName;
		this._enabled = params.enabled === true || params.enabled === false ? params.enabled : true;
		this._onHoverCursor = params.onHoverCursor;
		this._onClickHandler = params.onClick;
		this._onHoverHandler = params.onHover;
		this._onPointerOutHandler = params.onPointerOut;
		this._setupButtonTextElement(params.buttonText);
		this._setupToolTipElement(params.toolTipText);
		this._setupButtonHoverPointer();
		this._setupOnClickHandler();
		this._configureLookAndFeel();
	}

	private _configureLookAndFeel() {
		this.heightInPixels = DEFAULT_HEIGHT;
		this.fontSize = DEFAULT_FONT_SIZE;
		this.color = this._enabled ? DEFAULT_COLOR : DEFAULT_DISABLED_COLOR;
		this.background = DEFAULT_BACKGROUND_COLOR;
		this.cornerRadius = DEFAULT_CORNER_RADIUS;
	}

	private _setupButtonTextElement(buttonText: string = '') {
		this._textElement = new TextBlock(`${this.elementName}${GUI_ELEMENT_NAMES.TEXT}`);
		this._textElement.text = buttonText;
		this._textElement.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
		this._textElement.textVerticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;
		this.addControl(this._textElement);
	}

	private _setupToolTipElement(toolTipText?: string) {
		if (toolTipText) {
			ToolTipManager.attach(this, toolTipText);
		}
	}

	private _setupButtonHoverPointer() {
		this.onPointerEnterObservable.add(() => {
			document.body.style.cursor = this._enabled ? (this._onHoverCursor ?? MOUSE_CURSORS.DEFAULT) : MOUSE_CURSORS.NOT_ALLOWED;
			if (this._enabled && this._onHoverHandler) {
				this.background = DEFAULT_HOVER_BACKGROUND_COLOR;
				this._onHoverHandler();
			}
		});
		this.onPointerOutObservable.add(() => {
			document.body.style.cursor = MOUSE_CURSORS.DEFAULT;
			if (this._enabled && this._onPointerOutHandler) {
				this.background = DEFAULT_BACKGROUND_COLOR;
				this._onPointerOutHandler();
			}
		});
	}

	private _localClickHandler() {
		if (this._enabled && this._onClickHandler) {
			this._onClickHandler();
		}
	}

	private _setupOnClickHandler() {
		this.isHitTestVisible = true;
		this.onPointerUpObservable.add(this._localClickHandler.bind(this));
	}

	get elementName(): string {
		return this._elementName;
	}

	get enabled(): boolean {
		return this._enabled;
	}

	get text(): TextBlock {
		return this._textElement;
	}

	set fontSize(value: string) {
		this._textElement.fontSize = value;
	}
}

export default BaseButtonGUIElement;
