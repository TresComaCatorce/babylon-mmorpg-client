import { IBaseRectangleGUIElementConstructorParams } from '@mmorpg/interfaces/ui/base-elements/IBaseRectangleGUIElement';

interface percentageArea2D {
	horizontalPercentage: number;
	verticalPercentage: number;
}
interface IBaseDraggableRectangleUIElementConstructorParams extends IBaseRectangleGUIElementConstructorParams {
	dragControlAreaPercentage?: percentageArea2D;
}

export { IBaseDraggableRectangleUIElementConstructorParams, percentageArea2D };
