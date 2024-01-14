import crelt from "crelt";
import { EditorView } from "prosemirror-view";
import { EditorState } from "prosemirror-state";
import { MenuItem, MenuItemSpec } from "./menuitem";

export interface MenuGroupSpec {
    name?: string;
    class?: string;
    menus: MenuItemSpec[];
}

export class MenuGroup {
    constructor(private view: EditorView, private spec: MenuGroupSpec){
        const dom = crelt('div', {class: this.spec.class});
        dom.classList.add('menu-group');
        this.dom = dom;
        this.menus = spec.menus.map((menuSpec) => new MenuItem(this.view, menuSpec));
        this.menus.forEach((menu) => {
            dom.appendChild(menu.dom);
        })
    }
    private menus: MenuItem[];
    dom: HTMLElement;
    update(view: EditorView, state:EditorState){
        this.view = view;
        this.menus.forEach((menu) => {
            menu.update(view, state);
        })
    }
}