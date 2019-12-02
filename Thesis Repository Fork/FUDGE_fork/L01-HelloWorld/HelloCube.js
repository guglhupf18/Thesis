///<reference types="../Core/Build/FudgeCore.js"/>
//PathtoFudgeCore
var ExampleSceneForest_ts;
(function (ExampleSceneForest_ts) {
    var f = FudgeCore;
    window.addEventListener("DOMContentLoaded", init);
    var node;
    var camera;
    var viewPort;
    // let cube: f.MeshCube;   
    function init() {
        f.RenderManager.initialize();
        createMiniForest();
        viewPort.draw();
        // viewPort.showSceneGraph();
    }
    function createMiniForest() {
        var clrBlue = f.Color.BLUE;
        var cube = createCompleteMeshNode("Cube", new f.Material("Cube", f.ShaderUniColor, new f.CoatColored(clrBlue)), new f.MeshCube());
        cube.cmpTransform.local.translation = new f.Vector3(0, 0, 0);
        createViewport();
        var cmpCamera = camera.getComponent(f.ComponentTransform);
        cmpCamera.local.translateY(1);
        cmpCamera.local.rotateY(10);
        console.log(cmpCamera);
        node = cube;
        //node.appendChild(cube);
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
        viewPort.initialize("viewport", node, camera.getComponent(f.ComponentCamera), _canvas);
    }
    function createCamera(_translation, _lookAt) {
        if (_translation === void 0) { _translation = new f.Vector3(1, 1, 10); }
        if (_lookAt === void 0) { _lookAt = new f.Vector3(0, 0, 0); }
        var camera = new f.Node("Camera");
        var cmpTransform = new f.ComponentTransform();
        cmpTransform.local.translate(_translation);
        cmpTransform.local.lookAt(_lookAt);
        camera.addComponent(cmpTransform);
        var cmpCamera = new f.ComponentCamera();
        cmpCamera.projectCentral(1, 45, f.FIELD_OF_VIEW.DIAGONAL);
        camera.addComponent(cmpCamera);
        return camera;
    }
})(ExampleSceneForest_ts || (ExampleSceneForest_ts = {}));
