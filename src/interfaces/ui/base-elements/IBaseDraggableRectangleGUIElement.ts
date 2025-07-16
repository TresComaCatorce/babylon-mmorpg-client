import { IBaseRectangleGUIElementConstructorParams } from '@mmorpg/interfaces/ui/base-elements/IBaseRectangleGUIElement';

interface percentageArea2D {
	horizontalPercentage: number;
	verticalPercentage: number;
}
interface IBaseDraggableRectangleGUIElementConstructorParams extends IBaseRectangleGUIElementConstructorParams {
	dragControlAreaPercentage?: percentageArea2D;
}

export { IBaseDraggableRectangleGUIElementConstructorParams, percentageArea2D };
