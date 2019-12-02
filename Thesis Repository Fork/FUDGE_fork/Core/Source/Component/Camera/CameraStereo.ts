// Camera used to merge two PerspectiveCamera into stereoscopic 3D 
/**
 * Effects: Anaglyph; Paralax; Stereo
 * 
 * Properties: 
 * float aspect = 1; float 
 * 
 *
 */
namespace FudgeCore {
    export class CameraStereo {
        public aspect: number = 1.0;
        public eyeSep: number = 0.064;
        public lCamera: ComponentCamera = new ComponentCamera;
        public rCamera: ComponentCamera = new ComponentCamera;
        public CameraStereo(): void {
     ///       this.getFieldOfView();
        }
      /*
        public update(camera : CameraPerspective): void {
            // update the cameras 
        }
        */
    }
}