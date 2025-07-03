import { IBaseRectangleUIElementConstructorParams } from '@mmorpg/interfaces/ui/base-elements/IBaseRectangleUIElement';

interface percentageArea2D {
	horizontalPercentage: number;
	verticalPercentage: number;
}
interface IBaseDraggableRectangleUIElementConstructorParams extends IBaseRectangleUIElementConstructorParams {
	dragControlAreaPercentage?: percentageArea2D;
}

export { IBaseDraggableRectangleUIElementConstructorParams, percentageArea2D };
