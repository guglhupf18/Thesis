///<reference types="../Core/Build/FudgeCore.js"/>
//PathtoFudgeCore
var ExampleSceneForest_ts;
(function (ExampleSceneForest_ts) {
    var f = FudgeCore;
    window.addEventListener("DOMContentLoaded", init);
    var node;
    var camera;
    var viewPort;
    function init() {
        f.RenderManager.initialize();
        createMiniForest();
        viewPort.draw();
        viewPort.showSceneGraph();
    }
    function createMiniForest() {
        var forest = new f.Node("Forest");
        var clrLeaves = new f.Color(0.2, 0.6, 0.3, 1);
        var clrTrunkTree = new f.Color(0.5, 0.3, 0, 1);
        var clrGround = new f.Color(0.1, 0.1, 0.5, 1);
        var ground = createCompleteMeshNode("Ground", new f.Material("Ground", f.ShaderUniColor, new f.CoatColored(clrGround)), new f.MeshCube());
        var cmpGroundMesh = ground.getComponent(f.ComponentMesh);
        cmpGroundMesh.pivot.scale(new f.Vector3(6, 0.05, 6));
        node = ground;
        createViewport();
        var cmpCamera = camera.getComponent(f.ComponentTransform);
        cmpCamera.local.translateY(1);
        cmpCamera.local.rotateX(10);
        console.log(camera.getComponent(f.ComponentCamera));
        var broadleaf = createBroadleaf("BroadLeaf", clrTrunkTree, clrLeaves, new f.Vector3(0, 0, 0), new f.Vector3(1, 1, 1));
        forest.appendChild(broadleaf);
        node.appendChild(forest);
    }
    function createCompleteMeshNode(_name, _material, _mesh) {
        var node = new f.Node(_name);
        var cmpMesh = new f.ComponentMesh(_mesh);
        var cmpMaterial = new f.ComponentMaterial(_material);
        var cmpTransform = new f.ComponentTransform();
        node.addComponent(cmpMesh);
        node.addComponent(cmpMaterial);
        node.addComponent(cmpTransform);
        return node;
    }
    function createViewport(_canvas) {
        if (_canvas === void 0) { _canvas = null; }
        if (!_canvas) {
            _canvas = document.createElement("canvas");
            _canvas.width = 800;
            _canvas.height = 600;
            document.body.appendChild(_canvas);
        }
        viewPort = new f.Viewport();
        camera = createCamera();
        console.log("CAM POS:" + camera.cmpTransform.local.translation.get());
        viewPort.initialize("viewport", node, camera.getComponent(f.ComponentCamera), _canvas);
    }
    function createCamera(_translation, _lookAt) {
        if (_translation === void 0) { _translation = new f.Vector3(1, 1, 10); }
        if (_lookAt === void 0) { _lookAt = new f.Vector3(0, 0, 0); }
        var camera = new f.Node("Camera");
        var cmpTransform = new f.ComponentTransform();
        cmpTransform.local.translate(new f.Vector3(0, 0, 5));
        cmpTransform.local.lookAt(_lookAt);
        camera.addComponent(cmpTransform);
        var cmpCamera = new f.ComponentCamera();
        cmpCamera.projectCentral(1, 45, f.FIELD_OF_VIEW.DIAGONAL);
        // console.log("cmpcqmera pos:" + camera.cmpTransform.local.translation.get());
        // cmpCamera.projectOrthographic(100, 100, 10, 10);
        camera.addComponent(cmpCamera);
        return camera;
    }
    function createBroadleaf(_name, _clrTrunk, _clrTop, _pos, _scale) {
        var tree = new f.Node(_name);
        var treeTrunk = createCompleteMeshNode("TreeTrunk", new f.Material("TrunkTree", f.ShaderUniColor, new f.CoatColored(_clrTrunk)), new f.MeshCube);
        var cmpTrunkMesh = treeTrunk.getComponent(f.ComponentMesh);
        cmpTrunkMesh.pivot.scale(_scale);
        cmpTrunkMesh.pivot.translateY(_scale.y / 2);
        tree.appendChild(treeTrunk);
        tree.addComponent(new f.ComponentTransform);
        tree.cmpTransform.local.translate(_pos);
        console.log("treepos:" + tree.cmpTransform.local.translation.get());
        return tree;
    }
})(ExampleSceneForest_ts || (ExampleSceneForest_ts = {}));
