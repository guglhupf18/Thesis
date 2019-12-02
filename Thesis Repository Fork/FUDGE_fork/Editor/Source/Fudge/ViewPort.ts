///<reference types="../../../Core/Build/FudgeCore"/>
///<reference types="../../../UserInterface/Build/FudgeUI"/>
///<reference types="../../Examples/Code/Scenes"/>
///<reference path="View.ts"/>


namespace Fudge {
    import ƒ = FudgeCore;
    import ƒui = FudgeUserInterface;


    /**
     * View displaying a Node and the hierarchical relation to its parents and children.  
     * Consists of a viewport and a tree-control. 
     */
    export class ViewViewport extends View {
        viewport: ƒ.Viewport;
        canvas: HTMLCanvasElement;
        branch: ƒ.Node;

        constructor(_parent: NodePanel) {
            super(_parent);
            if (_parent instanceof NodePanel) {
                if (_parent.getNode() != null) {
                    this.branch = _parent.getNode();
                }
                else {
                    this.branch = new ƒ.Node("Scene");
                }
            }
            else {
                this.branch = new ƒ.Node("Scene");
            }
            this.fillContent();
        }
        deconstruct(): void {
            ƒ.Loop.removeEventListener(ƒ.EVENT.LOOP_FRAME, this.animate);
        }

        fillContent(): void {

            let camera: ƒ.Node;

            // initialize RenderManager and transmit content
            ƒ.RenderManager.addBranch(this.branch);
            ƒ.RenderManager.update();

            // initialize viewport
            // TODO: create camera/canvas here without "Scenes"
            camera = Scenes.createCamera(new ƒ.Vector3(3, 3, 5));
            let cmpCamera: ƒ.ComponentCamera = camera.getComponent(ƒ.ComponentCamera);
            cmpCamera.projectCentral(1, 45);
            this.canvas = Scenes.createCanvas();
            document.body.appendChild(this.canvas);

            this.viewport = new ƒ.Viewport();
            this.viewport.initialize("ViewNode_Viewport", this.branch, cmpCamera, this.canvas);
            this.viewport.draw();

            this.content.append(this.canvas);

            ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL);
            ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, this.animate);

            //Focus cameracontrols on new viewport
            let event: CustomEvent = new CustomEvent(ƒui.UIEVENT.ACTIVEVIEWPORT, { detail: this.viewport.camera, bubbles: false });
            this.parentPanel.dispatchEvent(event);

            this.canvas.addEventListener("click", this.activeViewport);
        }



        /**
         * Set the root node for display in this view
         * @param _node 
         */
        public setRoot(_node: ƒ.Node): void {
            if (!_node)
                return;
            this.branch = _node;
            this.viewport.setBranch(this.branch);

        }
        /** 
         * Update Viewport every frame
         */
        private animate = (_e: Event) => {
            this.viewport.setBranch(this.branch);
            ƒ.RenderManager.updateBranch(this.branch);
            ƒ.RenderManager.update();
            if (this.canvas.clientHeight > 0 && this.canvas.clientWidth > 0)
                this.viewport.draw();
        }
        private activeViewport = (_event: MouseEvent): void => {
            let event: CustomEvent = new CustomEvent(ƒui.UIEVENT.ACTIVEVIEWPORT, { detail: this.viewport.camera, bubbles: false });
            this.parentPanel.dispatchEvent(event);

            _event.cancelBubble = true;
        }
    }
}
