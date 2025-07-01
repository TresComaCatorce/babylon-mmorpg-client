import { Observable, ICanvasRenderingContext } from '@babylonjs/core';
import { Measure, Rectangle } from '@babylonjs/gui';

import { IBaseRectangleUIElementConstructorParams } from '@mmorpg/interfaces/ui/base-elements/IBaseRectangleUIElement';
import IBaseControlUIElement from '@mmorpg/interfaces/ui/base-elements/IBaseControlUIElement';

abstract class BaseRectangleUIElement extends Rectangle implements IBaseControlUIElement {
	public onResizeObservable = new Observable<{ width: number; height: number }>();
	private _elementName: string;
	private _prevWidth = 0;
	private _prevHeight = 0;

	constructor(params: IBaseRectangleUIElementConstructorParams) {
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

export default BaseRectangleUIElement;
