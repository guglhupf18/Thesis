///<reference types="../Core/Build/FudgeCore.js"/>
//PathtoFudgeCore
namespace ExampleSceneForest_ts {
    import f = FudgeCore;
    window.addEventListener("DOMContentLoaded", init);

    let node: f.Node;
    let camera: f.Node;
    let viewPort: f.Viewport;
    // let cube: f.MeshCube;   

    function init(): void {
        f.RenderManager.initialize();
        createMiniForest();
        viewPort.draw();
       // viewPort.showSceneGraph();
    }
    
    function createMiniForest(): void {
        let clrBlue: f.Color = f.Color.BLUE;

        let cube : f.Node =  createCompleteMeshNode("Cube", new f.Material("Cube", f.ShaderUniColor, new f.CoatColored(clrBlue)), new f.MeshCube());

        cube.cmpTransform.local.translation = new f.Vector3(0,0,0);

        createViewport();

        let cmpCamera: f.ComponentTransform = camera.getComponent(f.ComponentTransform);
        cmpCamera.local.translateY(1);
        cmpCamera.local.rotateY(10);
        
        console.log(cmpCamera);
        node = cube;
        
        //node.appendChild(cube);
    }
    function createCompleteMeshNode(_name: string, _material: f.Material, _mesh: f.Mesh): f.Node {
        let node: f.Node = new f.Node(_name);
        let cmpMesh: f.ComponentMesh = new f.ComponentMesh(_mesh);
        let cmpMaterial: f.ComponentMaterial = new f.ComponentMaterial(_material);
        let cmpTransform: f.ComponentTransform = new f.ComponentTransform();
        node.addComponent(cmpMesh);
        node.addComponent(cmpMaterial);
        node.addComponent(cmpTransform);
        return node;
    }

    function createViewport(_canvas: HTMLCanvasElement = null): void {
        if (!_canvas) {
            _canvas = document.createElement("canvas");
            _canvas.width = 800; _canvas.height = 600; document.body.appendChild(_canvas);
        }
        viewPort = new f.Viewport();
        camera = createCamera();

        viewPort.initialize("viewport", node, camera.getComponent(f.ComponentCamera), _canvas);
    }
    function createCamera(_translation: f.Vector3 = new f.Vector3(1, 1, 10), _lookAt: f.Vector3 = new f.Vector3(0, 0, 0)): f.Node {
        let camera: f.Node = new f.Node("Camera");
        let cmpTransform: f.ComponentTransform = new f.ComponentTransform();

        cmpTransform.local.translate(_translation);
        cmpTransform.local.lookAt(_lookAt);
        
        
        camera.addComponent(cmpTransform);

        let cmpCamera: f.ComponentCamera = new f.ComponentCamera();
        cmpCamera.projectCentral(1, 45, f.FIELD_OF_VIEW.DIAGONAL);

        camera.addComponent(cmpCamera);

        return camera;
    }

    
}
