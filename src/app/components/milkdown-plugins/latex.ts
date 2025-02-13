import {codeBlockSchema} from '@milkdown/kit/preset/commonmark'
import remarkMath from 'remark-math'
import {$remark} from '@milkdown/kit/utils'
import type {Node} from '@milkdown/kit/transformer'
import {visit} from 'unist-util-visit'
import {MilkdownPlugin} from "@milkdown/kit/ctx";
import {$nodeSchema} from '@milkdown/kit/utils'
import katex from 'katex'
import {$inputRule} from '@milkdown/kit/utils'
import {nodeRule} from '@milkdown/kit/prose'
import {textblockTypeInputRule} from '@milkdown/kit/prose/inputrules'

export const blockLatexSchema = codeBlockSchema.extendSchema((prev) => {
    return (ctx) => {
        const baseSchema = prev(ctx)
        return {
            ...baseSchema,
            toMarkdown: {
                match: baseSchema.toMarkdown.match,
                runner: (state, node) => {
                    const language = node.attrs.language ?? ''
                    if (language.toLowerCase() === 'latex') {
                        state.addNode(
                            'math',
                            undefined,
                            node.content.firstChild?.text || ''
                        )
                    } else {
                        return baseSchema.toMarkdown.runner(state, node)
                    }
                },
            },
        }
    }
})

export const mathInlineId = 'math_inline'

/// Schema for inline math node.
/// Add support for:
///
/// ```markdown
/// $a^2 + b^2 = c^2$
/// ```
export const mathInlineSchema = $nodeSchema(mathInlineId, () => ({
    group: 'inline',
    inline: true,
    draggable: true,
    atom: true,
    attrs: {
        value: {
            default: '',
        },
    },
    parseDOM: [
        {
            tag: `span[data-type="${mathInlineId}"]`,
            getAttrs: (dom) => {
                return {
                    value: (dom as HTMLElement).dataset.value ?? '',
                }
            },
        },
    ],
    toDOM: (node) => {
        const code: string = node.attrs.value
        const dom = document.createElement('span')
        dom.dataset.type = mathInlineId
        dom.dataset.value = code
        katex.render(code, dom, {
            displayMode: true,
            throwOnError: false,
        })

        return dom
    },
    parseMarkdown: {
        match: (node) => node.type === 'inlineMath',
        runner: (state, node, type) => {
            state.addNode(type, {value: node.value as string})
        },
    },
    toMarkdown: {
        match: (node) => node.type.name === mathInlineId,
        runner: (state, node) => {
            state.addNode('inlineMath', undefined, node.attrs.value)
        },
    },
}))

/// Input rule for inline math.
/// When you type $E=MC^2$, it will create an inline math node.
export const mathInlineInputRule = $inputRule((ctx) =>
    nodeRule(/(?:\$)([^$]+)(?:\$)$/, mathInlineSchema.type(ctx), {
        getAttr: (match) => {
            return {
                value: match[1] ?? '',
            }
        },
    })
)

/// A input rule for creating block math.
/// For example, `$$ ` will create a code block with language javascript.
export const mathBlockInputRule = $inputRule((ctx) =>
    textblockTypeInputRule(/^\$\$[\s\n]$/, codeBlockSchema.type(ctx), () => ({
        language: 'latex',
    }))
)

export const remarkMathPlugin = $remark<'remarkMath', undefined>(
    'remarkMath',
    () => remarkMath
)

function visitMathBlock(ast: Node) {
    return visit(
        ast,
        'math',
        (
            node: Node & { value: string },
            index: number,
            parent: Node & { children: Node[] }
        ) => {
            const {value} = node as Node & { value: string }
            const newNode = {
                type: 'code',
                lang: 'latex',
                value,
            }
            parent.children.splice(index, 1, newNode)
        }
    )
}

/// Turn math block into code block with language LaTeX.
export const remarkMathBlockPlugin = $remark(
    'remarkMathBlock',
    () => () => visitMathBlock
)


/// All plugins exported by this package.
export const latex: MilkdownPlugin[] = [
    remarkMathPlugin,
    remarkMathBlockPlugin,
    mathInlineSchema,
    blockLatexSchema,
    mathBlockInputRule,
    mathInlineInputRule,
].flat()
