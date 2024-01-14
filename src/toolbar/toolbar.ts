import crelt from "crelt";
import { EditorView } from "prosemirror-view";
import { EditorState } from "prosemirror-state";
import { MenuGroup, MenuGroupSpec } from "./menugroup";

export interface ToolbarSpec {
    groups: MenuGroupSpec[];
    class?: string;
}

export class Toolbar {
    constructor(private view: EditorView, private spec: ToolbarSpec) {
        const toolbardom = crelt('div', {class: this.spec.class});
        toolbardom.classList.add('toolbar');

        this.dom = toolbardom;

        this.groups = spec.groups.map((groupSpec) => new MenuGroup(this.view, groupSpec));

        this.groups.forEach((group) => {
            this.dom.appendChild(group.dom);
        });

        this.render();
    }

    render() {
        if(this.view.dom.parentNode){
            const parentNode = this.view.dom.parentNode;
            const editorViewDom = parentNode.replaceChild(this.dom, this.view.dom);
            parentNode.appendChild(editorViewDom);
        }
    }
    groups: MenuGroup[];
    dom: HTMLElement;
    update(view: EditorView, state: EditorState){
        this.view = view;
        this.groups.forEach((group) => {
            group.update(this.view, state);
        })
    }
}