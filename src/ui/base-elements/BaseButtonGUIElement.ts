import { Button, Rectangle, TextBlock } from '@babylonjs/gui';

import { IBaseButtonGUIElementConstructorParams } from '@mmorpg/interfaces/ui/base-elements/IBaseButtonGUIElement';
import IBaseControlGUIElement from '@mmorpg/interfaces/ui/base-elements/IBaseControlGUIElement';
import GUI_DEFAULT_VALUES from '@mmorpg/utils/constants/GUI_DEFAULT_VALUES';
import GUI_ELEMENT_NAMES from '@mmorpg/utils/constants/GUI_ELEMENT_NAMES';
import MOUSE_CURSORS from '@mmorpg/utils/constants/MOUSE_CURSORS';
import ToolTipManager from '@mmorpg/ui/managers/ToolTipManager';

const DEFAULT_COLOR = 'rgba(255,255,255,0.8)';
const DEFAULT_DISABLED_COLOR = '#545454ff';
const DEFAULT_BACKGROUND_COLOR = '#121111ff';
const DEFAULT_HOVER_BACKGROUND_COLOR = '#353434ff';

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
	private _toolTipElement!: Rectangle;

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
		this._setupLookAndFeel();
	}

	private _setupLookAndFeel() {
		this.color = this._enabled ? DEFAULT_COLOR : DEFAULT_DISABLED_COLOR;
		this.background = DEFAULT_BACKGROUND_COLOR;
		this.cornerRadius = GUI_DEFAULT_VALUES.DEFAULT_CORNER_RADIUS_SMALL;
		this.fontSizeInPixels = GUI_DEFAULT_VALUES.DEFAULT_FONT_SIZE_IN_PX;
		this.adaptWidthToChildren = true;
		this.adaptHeightToChildren = true;
	}

	private _setupButtonTextElement(buttonText: string = '') {
		this._textElement = new TextBlock(`${this.elementName}${GUI_ELEMENT_NAMES.TEXT}`);
		this._textElement.text = buttonText;
		this._textElement.resizeToFit = true;
		this._textElement.paddingTopInPixels = GUI_DEFAULT_VALUES.DEFAULT_PADDING_TOP_IN_PX;
		this._textElement.paddingBottomInPixels = GUI_DEFAULT_VALUES.DEFAULT_PADDING_BOTTOM_IN_PX;
		this._textElement.paddingLeftInPixels = GUI_DEFAULT_VALUES.DEFAULT_PADDING_LEFT_IN_PX;
		this._textElement.paddingRightInPixels = GUI_DEFAULT_VALUES.DEFAULT_PADDING_RIGHT_IN_PX;
		this.addControl(this._textElement);
	}

	private _setupToolTipElement(toolTipText?: string) {
		if (toolTipText) {
			this._toolTipElement = new Rectangle(`${this.elementName}${GUI_ELEMENT_NAMES.TOOLTIP}${GUI_ELEMENT_NAMES.CONTAINER}`);
			this._toolTipElement.color = 'rgba(250,200,35,0.8)';
			this._toolTipElement.background = 'black';
			this._toolTipElement.thickness = 1;
			this._toolTipElement.cornerRadius = GUI_DEFAULT_VALUES.DEFAULT_CORNER_RADIUS_SMALL;
			this._toolTipElement.alpha = 0.8;
			this._toolTipElement.adaptWidthToChildren = true;
			this._toolTipElement.adaptHeightToChildren = true;

			const toolTipTextElement = new TextBlock(`${this.elementName}${GUI_ELEMENT_NAMES.TOOLTIP}${GUI_ELEMENT_NAMES.TEXT}`, toolTipText);
			toolTipTextElement.color = 'rgba(255,255,255,0.8)';
			toolTipTextElement.resizeToFit = true;
			toolTipTextElement.fontSizeInPixels = GUI_DEFAULT_VALUES.DEFAULT_FONT_SIZE_IN_PX;
			toolTipTextElement.paddingTopInPixels = GUI_DEFAULT_VALUES.DEFAULT_PADDING_TOP_IN_PX;
			toolTipTextElement.paddingBottomInPixels = GUI_DEFAULT_VALUES.DEFAULT_PADDING_BOTTOM_IN_PX;
			toolTipTextElement.paddingLeftInPixels = GUI_DEFAULT_VALUES.DEFAULT_PADDING_LEFT_IN_PX;
			toolTipTextElement.paddingRightInPixels = GUI_DEFAULT_VALUES.DEFAULT_PADDING_RIGHT_IN_PX;

			this._toolTipElement.addControl(toolTipTextElement);
			ToolTipManager.getInstance().attach({ owner: this, content: this._toolTipElement });
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
		this.onDisposeObservable.add(() => {
			document.body.style.cursor = MOUSE_CURSORS.DEFAULT;
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
