namespace Minimal {
    import ƒ = FudgeCore;

    window.addEventListener("load", hndLoad);

    function hndLoad(_event: Event): void {
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        ƒ.RenderManager.initialize();

        let viewport: ƒ.Viewport = new ƒ.Viewport();

        let mesh: ƒ.MeshCube = new ƒ.MeshCube();
        let mtrSolidWhite: ƒ.Material = new ƒ.Material("SolidWhite", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.WHITE));

        let cmpMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(mesh);
        let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(mtrSolidWhite);
        let node: ƒ.Node = new ƒ.Node("Quad");
        node.addComponent(cmpMesh);
        node.addComponent(cmpMaterial);

        let mesh2: ƒ.MeshCube = new ƒ.MeshCube();
        let mtrSolidWhite2: ƒ.Material = new ƒ.Material("SolidBlue", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.BLUE));

        let cmpMesh2: ƒ.ComponentMesh = new ƒ.ComponentMesh(mesh2);
        let cmpMaterial2: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(mtrSolidWhite2);
        let node2: ƒ.Node = new ƒ.Node("Quad2");
        let cmpTransform: ƒ.ComponentTransform = new ƒ.ComponentTransform();
        cmpTransform.local.translation = new ƒ.Vector3(1, 1, 1); 
        node2.addComponent(cmpMesh2);
        node2.addComponent(cmpMaterial2);
        node2.addComponent(cmpTransform);

        let baseNode: ƒ.Node = new ƒ.Node("Base");
        baseNode.appendChild(node);
        baseNode.appendChild(node2);
        let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();

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
}