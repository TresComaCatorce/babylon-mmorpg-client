import { Scene } from '@babylonjs/core';
import { AdvancedDynamicTexture, Rectangle, TextBlock, Button, Control, StackPanel } from '@babylonjs/gui';

const createControlsInfoHelper = (scene: Scene) => {
	const guiTexture = AdvancedDynamicTexture.CreateFullscreenUI('UI', true, scene);

	const infoBox = new Rectangle();
	infoBox.height = '28%';
	infoBox.width = '28%';
	infoBox.cornerRadius = 10;
	infoBox.color = 'white';
	infoBox.thickness = 1;
	infoBox.background = '#000000AA';
	infoBox.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
	infoBox.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
	infoBox.paddingTopInPixels = 5;
	infoBox.paddingLeftInPixels = 5;

	const stackPanel = new StackPanel();
	stackPanel.isVertical = false;
	stackPanel.width = '100%';
	stackPanel.height = '100%';

	const infoTitle = new TextBlock();
	infoTitle.text = 'Controls';
	infoTitle.fontSize = 18;
	infoTitle.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
	infoTitle.textVerticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
	infoTitle.paddingTopInPixels = 8;

	const infoText = new TextBlock();
	infoText.text = '\n• Movement: W-A-S-D\n• Rotate camera: Hold mouse left-click\n• Zoom: Mouse scroll\n• Run: Shift\n• Run lock/unlock: Caps Lock';
	infoText.color = 'white';
	infoText.fontSize = 13;
	infoText.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
	infoText.textVerticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;
	infoText.paddingLeft = '10px';
	infoText.textWrapping = true;

	const closeButton = Button.CreateSimpleButton('close', '✕');
	closeButton.width = '30px';
	closeButton.height = '30px';
	closeButton.color = 'white';
	closeButton.background = '#AA0000';
	closeButton.cornerRadius = 5;
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

	infoBox.addControl(infoTitle);
	stackPanel.addControl(infoText);
	infoBox.addControl(stackPanel);
	infoBox.addControl(closeButton);
	guiTexture.addControl(infoBox);

	return infoBox;
};

export { createControlsInfoHelper };
