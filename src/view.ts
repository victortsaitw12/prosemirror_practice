import { EditorView } from "prosemirror-view";
import { EditorState } from "prosemirror-state";
import { schema } from "./model";
import { keymap } from "prosemirror-keymap";
import { baseKeymap } from "prosemirror-commands";
import { history, redo, undo } from "prosemirror-history";
import { insertHeanding, insertParagraph, setBold, unsetBold } from "./utils/insertContent";
import { Toolbar } from "./toolbar/toolbar";

export const baclsetupEditor = (el:HTMLElement | null) => {
    if(!el) return;

    const editorRoot = document.createElement('div');
    editorRoot.id='editorRoot';

    const editorState = EditorState.create({ schema, plugins: [
        keymap(baseKeymap),
        history(),
        keymap({'Mod-z': undo, 'Mod-y': redo})
    ] });

    const editorView = new EditorView(editorRoot, {state: editorState});

    const btnGroup = document.createElement('div');
    btnGroup.style.marginBottom = '12px';
    const addParagraph = document.createElement('button');
    addParagraph.innerText = 'add Paragraph';
    addParagraph.addEventListener('click', () => insertParagraph(editorView, 'new paragraph'));

    const addHeading = document.createElement('button');
    addHeading.innerText = 'add Heading';
    addHeading.addEventListener('click', () => insertHeanding(editorView, 'add heading'));

    btnGroup.appendChild(addParagraph);
    btnGroup.appendChild(addHeading);
    
    const fragment = document.createDocumentFragment();
    fragment.appendChild(btnGroup);
    fragment.appendChild(editorRoot);

    el.appendChild(fragment);

    console.log(editorView);
}


export const setupEditor = (el:HTMLElement | null) => {
    if(!el) return;

    const editorRoot = document.createElement('div');
    editorRoot.id='editorRoot';
    const editorState = EditorState.create({ schema, 
        plugins: [
            keymap(baseKeymap),
            history(),
            keymap({'Mod-z': undo, 'Mod-y': redo})
        ],
    });

    const editorView = new EditorView(editorRoot, {
        state: editorState,
        dispatchTransaction(tr) {
            let newState = editorView.state.apply(tr);
            editorView.updateState(newState);
            toolbar.update(editorView, editorView.state);
        }
    });
    el.appendChild(editorRoot);

    const toolbar = new Toolbar(editorView, {
        groups: [
            {
                name: 'paragraph',
                menus: [
                    {
                        label: 'add',
                        handler: (props) => {
                            const {view} = props;
                            insertParagraph(view, 'add paragraph');
                        }
                    },
                    {
                        label: 'heading',
                        handler: (props) => {
                            const {view} = props;
                            insertHeanding(view, 'add heading');
                        }
                    },
                ]
            },
            {
                name: "格式",
                menus: [
                    {
                        label: "bold",
                        handler: (props) => {
                            const { view } = props;
                            setBold(view);
                            view.focus();
                        }
                    },
                    {
                        label: "unset Bold",
                        handler: (props) => {
                            const { view } = props;
                            unsetBold(view);
                            view.focus();
                        }
                    }
                ]
            }
        ]
   });
}