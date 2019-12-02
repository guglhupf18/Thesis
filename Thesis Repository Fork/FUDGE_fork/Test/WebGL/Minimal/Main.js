var Minimal;
(function (Minimal) {
    var ƒ = FudgeCore;
    window.addEventListener("load", hndLoad);
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        ƒ.RenderManager.initialize();
        let viewport = new ƒ.Viewport();
        let mesh = new ƒ.MeshCube();
        let mtrSolidWhite = new ƒ.Material("SolidWhite", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.WHITE));
        let cmpMesh = new ƒ.ComponentMesh(mesh);
        let cmpMaterial = new ƒ.ComponentMaterial(mtrSolidWhite);
        let node = new ƒ.Node("Quad");
        node.addComponent(cmpMesh);
        node.addComponent(cmpMaterial);
        let mesh2 = new ƒ.MeshCube();
        let mtrSolidWhite2 = new ƒ.Material("SolidBlue", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.BLUE));
        let cmpMesh2 = new ƒ.ComponentMesh(mesh2);
        let cmpMaterial2 = new ƒ.ComponentMaterial(mtrSolidWhite2);
        let node2 = new ƒ.Node("Quad2");
        let cmpTransform = new ƒ.ComponentTransform();
        cmpTransform.local.translation = new ƒ.Vector3(1, 1, 1);
        node2.addComponent(cmpMesh2);
        node2.addComponent(cmpMaterial2);
        node2.addComponent(cmpTransform);
        let baseNode = new ƒ.Node("Base");
        baseNode.appendChild(node);
        baseNode.appendChild(node2);
        let cmpCamera = new ƒ.ComponentCamera();
        cmpCamera.setType(ƒ.CameraOrthographic);
        // cmpCamera.pivot.translate(new ƒ.Vector3(1, 0, 5));
        //   cmpCamera.camera.fieldOfView = 90;
        //cmpCamera.camera.aspectRatio = 1;
        //camera.pivot.rotateX(10);
        //  camera.transform = ƒ.Matrix4x4.PROJECTION_ORTHOGRAPHIC(0, 600, 400, 0, 400, -400);
        viewport.initialize("Viewport", baseNode, cmpCamera, canvas);
        ƒ.RenderManager.update();
        viewport.draw();
    }
})(Minimal || (Minimal = {}));
//# sourceMappingURL=Main.js.map