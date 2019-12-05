/// <reference path="Component.ts"/>
namespace FudgeCore {

    /**
     * The camera component holds the projection-matrix and other data needed to render a scene from the perspective of the node it is attached to.
     * @authors Jascha Karagöl, HFU, 2019 | Jirka Dell'Oro-Friedl, HFU, 2019
     */
    export class ComponentCamera extends Component {

        // tslint:disable-next-line: no-any
        public camera: any = Camera; // The camera used to render

        public pivot: Matrix4x4 = Matrix4x4.IDENTITY;
     

        public setType<T extends Camera>(_class: new () => T): void {
            this.camera = new _class(); 
          //  console.log(this.camera);
        }

    
 
        //#region Transfer
        public serialize(): Serialization {
            let serialization: Serialization = {
                backgroundColor: this.camera.backgroundColor,
                backgroundEnabled: this.camera.backgroundEnabled,
                projection: this.camera.projection,
                fieldOfView: this.camera.fieldOfView,
                direction: this.camera.direction,
                aspect: this.camera.aspectRatio,
                pivot: this.pivot.serialize(),
                [super.constructor.name]: super.serialize()
            };
            return serialization;
        }

        public deserialize(_serialization: Serialization): Serializable {
            this.camera.backgroundColor = _serialization.backgroundColor;
            this.camera.backgroundEnabled = _serialization.backgroundEnabled;
            this.camera.projection = _serialization.projection;
            this.camera.fieldOfView = _serialization.fieldOfView;
            this.camera.aspectRatio = _serialization.aspect;
            this.camera.direction = _serialization.direction;
            this.pivot.deserialize(_serialization.pivot);
            super.deserialize(_serialization[super.constructor.name]);
            switch (this.camera.projection) {
                case PROJECTION.ORTHOGRAPHIC:
                    // this.projectOrthographic(); // TODO: serialize and deserialize parameters
                    break;
                case PROJECTION.CENTRAL:
                  //  this.camera = new CameraPerspective();
                    break;
            }
            return this;
        }

        public getMutatorAttributeTypes(_mutator: Mutator): MutatorAttributeTypes {
            let types: MutatorAttributeTypes = super.getMutatorAttributeTypes(_mutator);
            if (types.direction)
                types.direction = FIELD_OF_VIEW;
            if (types.projection)
                types.projection = PROJECTION;
            return types;
        }

        public mutate(_mutator: Mutator): void {
            super.mutate(_mutator);

            switch (this.camera.projection) {
                case PROJECTION.CENTRAL:
                    this.camera = new CameraPerspective();
                    break;
            }
        }

        protected reduceMutator(_mutator: Mutator): void {
            delete _mutator.transform;
            super.reduceMutator(_mutator);
        }
        //#endregion
    }
}