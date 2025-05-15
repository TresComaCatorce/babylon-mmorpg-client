import { Engine } from '@babylonjs/core';
import { createScene } from './app/scene';

const canvas = document.getElementById('renderCanvas') as HTMLCanvasElement;
const engine = new Engine(canvas, true);

const scene = createScene(engine, canvas);

engine.runRenderLoop(() => {
	scene.render();
});

window.addEventListener('resize', () => {
	engine.resize();
});
