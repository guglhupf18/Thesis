
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

        public left: number = 0;
        private right: number = 400;
        private bottom: number = 400;
        private top: number = 0;
        private near: number = 400;
        private far: number = -400;

        constructor() {
            super();
            this.left = 0;
            this.right  = 600; 
            this.bottom = 400;
            this.top = 0;
            this.projection = PROJECTION.ORTHOGRAPHIC;
         
            this.transform = Matrix4x4.PROJECTION_ORTHOGRAPHIC(this.left, this.right, this.bottom, this.top, this.near, this.far);

          //  this.transform = Matrix4x4.PROJECTION_ORTHOGRAPHIC(0, 400, 400, 0, -400, 400);
           // console.log(this.transform);
          
        }
    }
}