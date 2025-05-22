import { Scene } from '@babylonjs/core';
import { AdvancedDynamicTexture, Rectangle, TextBlock, Button, Control, StackPanel } from '@babylonjs/gui';

const createControlsInfoHelper = (scene: Scene) => {
	const guiTexture = AdvancedDynamicTexture.CreateFullscreenUI('UI', true, scene);

	const infoBox = new Rectangle();
	infoBox.width = '60%';
	infoBox.height = '100px';
	infoBox.cornerRadius = 10;
	infoBox.color = 'white';
	infoBox.thickness = 1;
	infoBox.background = '#000000AA';
	infoBox.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
	infoBox.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
	infoBox.paddingBottom = '20px';

	const stackPanel = new StackPanel();
	stackPanel.isVertical = false;
	stackPanel.width = '100%';
	stackPanel.height = '100%';

	const infoText = new TextBlock();
	infoText.text = 'Controls\nMovement: WASD || Rotate camera: Hold mouse left-click || Zoom: Mouse scroll';
	infoText.color = 'white';
	infoText.fontSize = 18;
	infoText.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
	infoText.textVerticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;
	infoText.paddingLeft = '10px';
	infoText.textWrapping = true;

	const closeButton = Button.CreateSimpleButton('close', '✕');
	closeButton.width = '30px';
	closeButton.height = '30px';
	closeButton.color = 'white';
	closeButton.background = '#AA0000';
	closeButton.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
	closeButton.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
	closeButton.paddingTop = '5px';
	closeButton.paddingRight = '5px';
	closeButton.onPointerUpObservable.add(() => {
		infoBox.isVisible = false;
	});

	closeButton.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
	closeButton.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
	closeButton.paddingRight = '5px';
	closeButton.paddingTop = '5px';

	closeButton.background = '#AA0000';
	closeButton.isHitTestVisible = true;
	closeButton.onPointerEnterObservable.add(() => {
		document.body.style.cursor = 'pointer';
	});

	closeButton.onPointerOutObservable.add(() => {
		document.body.style.cursor = 'default';
	});

	stackPanel.addControl(infoText);
	infoBox.addControl(stackPanel);
	infoBox.addControl(closeButton);
	guiTexture.addControl(infoBox);

	return infoBox;
};

export { createControlsInfoHelper };
