///<reference types="../Core/Build/FudgeCore.js"/>
//PathtoFudgeCore
namespace ExampleSceneForest_ts {
    import f = FudgeCore;
    window.addEventListener("DOMContentLoaded", init);

    let node: f.Node;
    let camera: f.Node;
    let viewPort: f.Viewport;

    function init(): void {
        f.RenderManager.initialize();
        createMiniForest();
        viewPort.draw();
        viewPort.showSceneGraph();
    }

    function createMiniForest(): void {
        let forest: f.Node = new f.Node("Forest");

        let clrLeaves: f.Color = new f.Color(0.2, 0.6, 0.3, 1);

        let clrTrunkTree: f.Color = new f.Color(0.5, 0.3, 0, 1);


        let clrGround: f.Color = new f.Color(0.1, 0.1, 0.5, 1);

        let ground: f.Node = createCompleteMeshNode("Ground",
            new f.Material("Ground", f.ShaderUniColor, new f.CoatColored(clrGround)), new f.MeshCube());

        let cmpGroundMesh: f.ComponentMesh = ground.getComponent(f.ComponentMesh);

        cmpGroundMesh.pivot.scale(new f.Vector3(6, 0.05, 6));

        node = ground;

        createViewport();

        let cmpCamera: f.ComponentTransform = camera.getComponent(f.ComponentTransform);
        cmpCamera.local.translateY(2);
        cmpCamera.local.rotateX(10);
        console.log(camera.getComponent(f.ComponentCamera));

        let broadleaf: f.Node = createBroadleaf("BroadLeaf", clrTrunkTree, clrLeaves, new f.Vector3(0, 0, 0), new f.Vector3(1, 1, 1));
        forest.appendChild(broadleaf);
        
        node.appendChild(forest);
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

        console.log("CAM POS:" + camera.cmpTransform.local.translation.get());

        viewPort.initialize("viewport", node, camera.getComponent(f.ComponentCamera), _canvas);
    }
    function createCamera(_translation: f.Vector3 = new f.Vector3(1, 1, 10), _lookAt: f.Vector3 = new f.Vector3(0, 0, 0)): f.Node {
        let camera: f.Node = new f.Node("Camera");
        let cmpTransform: f.ComponentTransform = new f.ComponentTransform();

        cmpTransform.local.translate(new f.Vector3(0, 0, 5));
        cmpTransform.local.lookAt(_lookAt);


        camera.addComponent(cmpTransform);

        let cmpCamera: f.ComponentCamera = new f.ComponentCamera();
        cmpCamera.projectCentral(1, 45, f.FIELD_OF_VIEW.DIAGONAL);

        // console.log("cmpcqmera pos:" + camera.cmpTransform.local.translation.get());
        // cmpCamera.projectOrthographic(100, 100, 10, 10);
        camera.addComponent(cmpCamera);

        return camera;
    }

    function createBroadleaf(_name: string, _clrTrunk: f.Color, _clrTop: f.Color, _pos: f.Vector3, _scale: f.Vector3): f.Node {
        let tree: f.Node = new f.Node(_name);
        let treeTrunk: f.Node = createCompleteMeshNode("TreeTrunk", new f.Material("TrunkTree", f.ShaderUniColor, new f.CoatColored(_clrTrunk)), new f.MeshCube);
        let cmpTrunkMesh: f.ComponentMesh = treeTrunk.getComponent(f.ComponentMesh);

        cmpTrunkMesh.pivot.scale(_scale);
        cmpTrunkMesh.pivot.translateY(_scale.y / 2);

        tree.appendChild(treeTrunk);
        tree.addComponent(new f.ComponentTransform);

        tree.cmpTransform.local.translate(_pos);
        console.log("treepos:" + tree.cmpTransform.local.translation.get());
        return tree;
    }
}
