import { Scene, Engine, Vector3, MeshBuilder, HemisphericLight, ArcRotateCamera } from "@babylonjs/core";
import "@babylonjs/inspector";


export function createScene(engine: Engine, canvas: HTMLCanvasElement): Scene {
	const scene = new Scene(engine);
	
	scene.debugLayer.show();

	// Añadir cámara
	const camera = new ArcRotateCamera(
		"camera",
		Math.PI / 2,
		Math.PI / 3,
		10,
		Vector3.Zero(),
		scene
	);
	camera.attachControl(canvas, true);

	// Añadir luz
	const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);

	// Crear una esfera
	const sphere = MeshBuilder.CreateSphere("sphere", { diameter: 2 }, scene);
	sphere.position.y = 1;

	// Crear un suelo
	const ground = MeshBuilder.CreateGround("ground", { width: 6, height: 6 }, scene);

	return scene;
}