import { EditorView } from "prosemirror-view";
import { schema } from "../model";
import { Attrs, MarkType } from "prosemirror-model";

type Schema = typeof schema;

export function insertParagraph(editorView: EditorView, content: string) {
    const { state, dispatch } = editorView;
    const schema = state.schema as Schema;

    const paragraph = schema.node('paragraph', {}, schema.text(content));
    const blockTile = schema.node('block_tile', {}, paragraph);
    const pos = state.selection.anchor;
    const tr = state.tr.insert(pos, blockTile);
    dispatch(tr);
}

export function insertHeanding(editorView: EditorView, content: string, level=1) {
    const { state, dispatch } = editorView;
    const schema = state.schema as Schema;

    const heading = schema.nodes.heading.create({level}, schema.text(content));
    const blockTile = schema.node(schema.nodes.block_tile, {}, heading);
    const tr = state.tr.replaceSelectionWith(blockTile);
    dispatch(tr);
}

function unsetMark(view: EditorView, markType: MarkType | string) {
    const { schema, selection, tr} = view.state;
    const { $from, $to } = selection;
    const type = typeof markType === 'string' ? schema.marks[markType] : markType;
    tr.removeMark($from.pos, $to.pos, type);
    view.dispatch(tr);
    return true;
}

function setMark(view: EditorView, markType: MarkType | string, attrs: Attrs | null = null){
    const {schema, selection, tr} = view.state;
    const {$from, $to} = selection;
    const mark = schema.mark(markType, attrs);
    tr.addMark($from.pos, $to.pos, mark);
    view.dispatch(tr);
    return true;
}

export function setBold(view: EditorView) {
    setMark(view, view.state.schema.marks.bold);
}

export function unsetBold(view: EditorView) {
    unsetMark(view, view.state.schema.marks.bold);
}