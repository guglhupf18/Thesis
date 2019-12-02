// / <reference types="../../../Core/Build/FudgeCore"/>

namespace FudgeUserInterface {

    export const enum UIEVENT {
        SELECTION = "nodeSelectionEvent",
        COLLAPSE = "listCollapseEvent",
        REMOVE = "nodeRemoveEvent",
        HIDE = "nodeHideEvent",
        UPDATE = "mutatorUpdateEvent",
        DROPMENUCLICK = "dropMenuClick",
        DROPMENUCOLLAPSE = "dropMenuCollapse",
        ACTIVEVIEWPORT = "activeViewport"
    }

}