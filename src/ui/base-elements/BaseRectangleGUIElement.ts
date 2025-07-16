import { Observable, ICanvasRenderingContext } from '@babylonjs/core';
import { Measure, Rectangle } from '@babylonjs/gui';

import { IBaseRectangleGUIElementConstructorParams } from '@mmorpg/interfaces/ui/base-elements/IBaseRectangleGUIElement';
import IBaseControlGUIElement from '@mmorpg/interfaces/ui/base-elements/IBaseControlGUIElement';

abstract class BaseRectangleGUIElement extends Rectangle implements IBaseControlGUIElement {
	public onResizeObservable = new Observable<{ width: number; height: number }>();
	private _elementName: string;
	private _prevWidth = 0;
	private _prevHeight = 0;

	constructor(params: IBaseRectangleGUIElementConstructorParams) {
		super(params.elementName);
		this._elementName = params.elementName;
	}

	protected _processMeasures(parentMeasure: Measure, context: ICanvasRenderingContext) {
		super._processMeasures(parentMeasure, context);

		const current = this._currentMeasure;
		const newWidth = current.width;
		const newHeight = current.height;

		if (newWidth !== this._prevWidth || newHeight !== this._prevHeight) {
			this._prevWidth = newWidth;
			this._prevHeight = newHeight;

			this.onResizeObservable.notifyObservers({ width: newWidth, height: newHeight });
		}
	}

	get elementName(): string {
		return this._elementName;
	}
}

export default BaseRectangleGUIElement;
