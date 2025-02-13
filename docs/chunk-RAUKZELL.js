import"./chunk-GAL4ENT6.js";var e=Object.freeze(JSON.parse('{"displayName":"WGSL","name":"wgsl","patterns":[{"include":"#line_comments"},{"include":"#block_comments"},{"include":"#keywords"},{"include":"#attributes"},{"include":"#functions"},{"include":"#function_calls"},{"include":"#constants"},{"include":"#types"},{"include":"#variables"},{"include":"#punctuation"}],"repository":{"attributes":{"patterns":[{"captures":{"1":{"name":"keyword.operator.attribute.at"},"2":{"name":"entity.name.attribute.wgsl"}},"comment":"attribute declaration","match":"(@)([A-Za-z_]+)","name":"meta.attribute.wgsl"}]},"block_comments":{"patterns":[{"comment":"empty block comments","match":"/\\\\*\\\\*/","name":"comment.block.wgsl"},{"begin":"/\\\\*\\\\*","comment":"block documentation comments","end":"\\\\*/","name":"comment.block.documentation.wgsl","patterns":[{"include":"#block_comments"}]},{"begin":"/\\\\*(?!\\\\*)","comment":"block comments","end":"\\\\*/","name":"comment.block.wgsl","patterns":[{"include":"#block_comments"}]}]},"constants":{"patterns":[{"comment":"decimal float literal","match":"(-?\\\\b[0-9][0-9]*\\\\.[0-9][0-9]*)([eE][+-]?[0-9]+)?\\\\b","name":"constant.numeric.float.wgsl"},{"comment":"int literal","match":"-?\\\\b0x[0-9a-fA-F]+\\\\b|\\\\b0\\\\b|-?\\\\b[1-9][0-9]*\\\\b","name":"constant.numeric.decimal.wgsl"},{"comment":"uint literal","match":"\\\\b0x[0-9a-fA-F]+u\\\\b|\\\\b0u\\\\b|\\\\b[1-9][0-9]*u\\\\b","name":"constant.numeric.decimal.wgsl"},{"comment":"boolean constant","match":"\\\\b(true|false)\\\\b","name":"constant.language.boolean.wgsl"}]},"function_calls":{"patterns":[{"begin":"([A-Za-z0-9_]+)(\\\\()","beginCaptures":{"1":{"name":"entity.name.function.wgsl"},"2":{"name":"punctuation.brackets.round.wgsl"}},"comment":"function/method calls","end":"\\\\)","endCaptures":{"0":{"name":"punctuation.brackets.round.wgsl"}},"name":"meta.function.call.wgsl","patterns":[{"include":"#line_comments"},{"include":"#block_comments"},{"include":"#keywords"},{"include":"#attributes"},{"include":"#function_calls"},{"include":"#constants"},{"include":"#types"},{"include":"#variables"},{"include":"#punctuation"}]}]},"functions":{"patterns":[{"begin":"\\\\b(fn)\\\\s+([A-Za-z0-9_]+)((\\\\()|(<))","beginCaptures":{"1":{"name":"keyword.other.fn.wgsl"},"2":{"name":"entity.name.function.wgsl"},"4":{"name":"punctuation.brackets.round.wgsl"}},"comment":"function definition","end":"\\\\{","endCaptures":{"0":{"name":"punctuation.brackets.curly.wgsl"}},"name":"meta.function.definition.wgsl","patterns":[{"include":"#line_comments"},{"include":"#block_comments"},{"include":"#keywords"},{"include":"#attributes"},{"include":"#function_calls"},{"include":"#constants"},{"include":"#types"},{"include":"#variables"},{"include":"#punctuation"}]}]},"keywords":{"patterns":[{"comment":"other keywords","match":"\\\\b(bitcast|block|break|case|continue|continuing|default|discard|else|elseif|enable|fallthrough|for|function|if|loop|private|read|read_write|return|storage|switch|uniform|while|workgroup|write)\\\\b","name":"keyword.control.wgsl"},{"comment":"reserved keywords","match":"\\\\b(asm|const|do|enum|handle|mat|premerge|regardless|typedef|unless|using|vec|void)\\\\b","name":"keyword.control.wgsl"},{"comment":"storage keywords","match":"\\\\b(let|var)\\\\b","name":"keyword.other.wgsl storage.type.wgsl"},{"comment":"type keyword","match":"\\\\b(type)\\\\b","name":"keyword.declaration.type.wgsl storage.type.wgsl"},{"comment":"enum keyword","match":"\\\\b(enum)\\\\b","name":"keyword.declaration.enum.wgsl storage.type.wgsl"},{"comment":"struct keyword","match":"\\\\b(struct)\\\\b","name":"keyword.declaration.struct.wgsl storage.type.wgsl"},{"comment":"fn","match":"\\\\bfn\\\\b","name":"keyword.other.fn.wgsl"},{"comment":"logical operators","match":"(\\\\^|\\\\||\\\\|\\\\||&&|<<|>>|!)(?!=)","name":"keyword.operator.logical.wgsl"},{"comment":"logical AND, borrow references","match":"&(?![&=])","name":"keyword.operator.borrow.and.wgsl"},{"comment":"assignment operators","match":"(\\\\+=|-=|\\\\*=|/=|%=|\\\\^=|&=|\\\\|=|<<=|>>=)","name":"keyword.operator.assignment.wgsl"},{"comment":"single equal","match":"(?<![<>])=(?!=|>)","name":"keyword.operator.assignment.equal.wgsl"},{"comment":"comparison operators","match":"(=(=)?(?!>)|!=|<=|(?<!=)>=)","name":"keyword.operator.comparison.wgsl"},{"comment":"math operators","match":"(([+%]|(\\\\*(?!\\\\w)))(?!=))|(-(?!>))|(/(?!/))","name":"keyword.operator.math.wgsl"},{"comment":"dot access","match":"\\\\.(?!\\\\.)","name":"keyword.operator.access.dot.wgsl"},{"comment":"dashrocket, skinny arrow","match":"->","name":"keyword.operator.arrow.skinny.wgsl"}]},"line_comments":{"comment":"single line comment","match":"\\\\s*//.*","name":"comment.line.double-slash.wgsl"},"punctuation":{"patterns":[{"comment":"comma","match":",","name":"punctuation.comma.wgsl"},{"comment":"curly braces","match":"[{}]","name":"punctuation.brackets.curly.wgsl"},{"comment":"parentheses, round brackets","match":"[()]","name":"punctuation.brackets.round.wgsl"},{"comment":"semicolon","match":";","name":"punctuation.semi.wgsl"},{"comment":"square brackets","match":"[\\\\[\\\\]]","name":"punctuation.brackets.square.wgsl"},{"comment":"angle brackets","match":"(?<![=-])[<>]","name":"punctuation.brackets.angle.wgsl"}]},"types":{"comment":"types","name":"storage.type.wgsl","patterns":[{"comment":"scalar Types","match":"\\\\b(bool|i32|u32|f32)\\\\b","name":"storage.type.wgsl"},{"comment":"reserved scalar Types","match":"\\\\b(i64|u64|f64)\\\\b","name":"storage.type.wgsl"},{"comment":"vector type aliasses","match":"\\\\b(vec2i|vec3i|vec4i|vec2u|vec3u|vec4u|vec2f|vec3f|vec4f|vec2h|vec3h|vec4h)\\\\b","name":"storage.type.wgsl"},{"comment":"matrix type aliasses","match":"\\\\b(mat2x2f|mat2x3f|mat2x4f|mat3x2f|mat3x3f|mat3x4f|mat4x2f|mat4x3f|mat4x4f|mat2x2h|mat2x3h|mat2x4h|mat3x2h|mat3x3h|mat3x4h|mat4x2h|mat4x3h|mat4x4h)\\\\b","name":"storage.type.wgsl"},{"comment":"vector/matrix types","match":"\\\\b(vec[2-4]|mat[2-4]x[2-4])\\\\b","name":"storage.type.wgsl"},{"comment":"atomic types","match":"\\\\b(atomic)\\\\b","name":"storage.type.wgsl"},{"comment":"array types","match":"\\\\b(array)\\\\b","name":"storage.type.wgsl"},{"comment":"Custom type","match":"\\\\b([A-Z][A-Za-z0-9]*)\\\\b","name":"entity.name.type.wgsl"}]},"variables":{"patterns":[{"comment":"variables","match":"\\\\b(?<!(?<!\\\\.)\\\\.)(?:r#(?!(crate|[Ss]elf|super)))?[a-z0-9_]+\\\\b","name":"variable.other.wgsl"}]}},"scopeName":"source.wgsl"}')),t=[e];export{t as default};
