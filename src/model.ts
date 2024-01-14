import { Schema } from "prosemirror-model";


export const schema = new Schema({
    nodes: {
        doc: {
            content: 'tile+'
        },
        block_tile: {
            content: 'block+',
            group: 'tile',
            inline: false,
            toDOM: () => {
                return ['div', {'class': "block_tile"}, 0]
            },
            parseDOM: [
                {tag: 'div.block_tile'}
            ]
        },
        paragraph: {
            content: 'inline*',
            group: 'block',
            toDOM: () => {
                return ['p', 0]
            },
            parseDOM: [
                {tag: 'p'}
            ]
        },
        text: {
            group: 'inline'
        },
        heading: {
            attrs: {
                level: {
                    default: 1
                }
            },
            content: 'inline*',
            group: 'block',
            defining: true,
            toDOM: (node) => {
                const tag = `h${node.attrs.level}`
                return [tag, 0]
            },
            parseDOM: [
                {tag: 'h1', attrs: {level: 1}},
                {tag: 'h2', attrs: {level: 2}},
                {tag: 'h3', attrs: {level: 3}},
                {tag: 'h4', attrs: {level: 4}},
                {tag: 'h5', attrs: {level: 5}},
                {tag: 'h6', attrs: {level: 6}},
            ]
        }
    },
    marks: {
        strong: {
            toDOM: () => {
                return ['strong', 0];
            },
            parseDOM: [
                {tag: 'strong'}
            ]
        },
        bold: {
            toDOM: () => {
                return ['strong', 0];
            },
            parseDOM: [
                {tag: 'strong'},
                {tag: 'b', getAttrs: (domNode) => (domNode as HTMLElement).style.fontWeight !== 'normal' && null },
                {style: 'font-weight', getAttrs: (value) => /^(bold(er)?|[5-9]\d{2})$/.test(value as string) && null }
            ]
        }
    }
})