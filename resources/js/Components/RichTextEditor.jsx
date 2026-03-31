import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

const ToolbarButton = ({ onClick, active, children, title }) => (
    <button
        type="button"
        title={title}
        onClick={onClick}
        className={`px-2 py-1 rounded text-sm font-bold transition-colors ${
            active
                ? 'bg-primary text-on-primary-fixed'
                : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
        }`}
    >
        {children}
    </button>
);

export default function RichTextEditor({ value = '', onChange }) {
    const editor = useEditor({
        extensions: [StarterKit],
        content: value,
        editorProps: {
            attributes: {
                class: 'prose prose-invert max-w-none min-h-[300px] p-4 focus:outline-none text-on-surface-variant leading-relaxed',
            },
        },
        onUpdate({ editor }) {
            onChange(editor.getHTML());
        },
    });

    if (!editor) return null;

    return (
        <div className="rounded-xl border border-outline-variant/20 bg-surface-container overflow-hidden">
            {/* Toolbar */}
            <div className="flex flex-wrap gap-1 p-2 border-b border-outline-variant/15 bg-surface-container-low">
                <ToolbarButton
                    title="Gras"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    active={editor.isActive('bold')}
                >
                    <strong>G</strong>
                </ToolbarButton>
                <ToolbarButton
                    title="Italique"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    active={editor.isActive('italic')}
                >
                    <em>I</em>
                </ToolbarButton>
                <ToolbarButton
                    title="Barré"
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    active={editor.isActive('strike')}
                >
                    <s>S</s>
                </ToolbarButton>
                <div className="w-px bg-outline-variant/20 mx-1" />
                <ToolbarButton
                    title="Titre H2"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    active={editor.isActive('heading', { level: 2 })}
                >
                    H2
                </ToolbarButton>
                <ToolbarButton
                    title="Titre H3"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    active={editor.isActive('heading', { level: 3 })}
                >
                    H3
                </ToolbarButton>
                <div className="w-px bg-outline-variant/20 mx-1" />
                <ToolbarButton
                    title="Liste à puces"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    active={editor.isActive('bulletList')}
                >
                    • —
                </ToolbarButton>
                <ToolbarButton
                    title="Liste numérotée"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    active={editor.isActive('orderedList')}
                >
                    1 —
                </ToolbarButton>
                <div className="w-px bg-outline-variant/20 mx-1" />
                <ToolbarButton
                    title="Citation"
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    active={editor.isActive('blockquote')}
                >
                    ❝
                </ToolbarButton>
                <ToolbarButton
                    title="Code"
                    onClick={() => editor.chain().focus().toggleCode().run()}
                    active={editor.isActive('code')}
                >
                    {"</>"}
                </ToolbarButton>
                <div className="w-px bg-outline-variant/20 mx-1" />
                <ToolbarButton
                    title="Annuler"
                    onClick={() => editor.chain().focus().undo().run()}
                    active={false}
                >
                    ↩
                </ToolbarButton>
                <ToolbarButton
                    title="Rétablir"
                    onClick={() => editor.chain().focus().redo().run()}
                    active={false}
                >
                    ↪
                </ToolbarButton>
            </div>

            {/* Editor */}
            <EditorContent editor={editor} />
        </div>
    );
}
