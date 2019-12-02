
/// <reference path="Camera.ts"/>


namespace FudgeCore {
    // Class to set camera to perspective mode
    /**
     **
     * Set the camera to orthographic projection. The origin is in the top left corner of the canvas.
     * @param _left The positionvalue of the projectionspace's left border. (Default = 0)
     * @param _right The positionvalue of the projectionspace's right border. (Default = canvas.clientWidth)
     * @param _bottom The positionvalue of the projectionspace's bottom border.(Default = canvas.clientHeight)
     * @param _top The positionvalue of the projectionspace's top border.(Default = 0)
     */
    export class CameraOrthographic extends Camera {

        private left: number = 0;
        private right: number = null;
        private bottom: number = null;
        private top: number = 0;
   //     private near: number = -400;
     //   private far: number = 400;

        constructor() {
            super();
            this.left = 0;
            this.right  = RenderManager.getCanvas().width; // TODO: halbiert den Wert im output
            this.bottom = RenderManager.getCanvas().height;
            this.top = 0;
            this.projection = PROJECTION.ORTHOGRAPHIC;
            this.direction = FIELD_OF_VIEW.HORIZONTAL;
            
            console.log("right + " + this.right);
            console.log("left + " + this.left);
            console.log("top  +  " + this.top);
            console.log("bot + " + this.bottom);  
            
          //  this.transform = Matrix4x4.PROJECTION_ORTHOGRAPHIC(0, this._right, this._bottom, this._top, this._near, this._far);

            this.transform = Matrix4x4.PROJECTION_ORTHOGRAPHIC(0, 400, 400, 0, -400, 400);
           // console.log(this.transform);
          
        }
    }
}