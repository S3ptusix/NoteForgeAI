import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";

import {
    Bold,
    Italic,
    UnderlineIcon,
    Strikethrough,
    Heading1,
    Heading2,
    Heading3,
    List,
    ListOrdered,
    Code,
    Undo,
    Redo,
    Highlighter
} from "lucide-react";
import { useEffect } from "react";

// Toolbar button component
const ToolbarButton = ({ onClick, children }) => (
    <button
        onClick={onClick}
        type="button"
        className="btn btn-square btn-ghost rounded-none"
    >
        {children}
    </button>
);

export default function RichTextEditor({ content = '', setContent }) {

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: { levels: [1, 2, 3] },   // 👈 allow h1, h2, h3
            }),
            Highlight,                          // 👈 enable highlight
        ],
        content: content,
        onUpdate: ({ editor }) => {
            if (setContent) setContent(editor.getHTML());
        },
    });

    // 👇 ADD THIS BLOCK
    useEffect(() => {
        if (editor && content !== editor.getHTML()) {
            editor.commands.setContent(content || "");
        }
    }, [content, editor]);

    if (!editor) return null;

    return (
        <div className="w-full h-full flex flex-col">
            {/* Toolbar */}
            <div className="flex flex-wrap">

                <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()}>
                    <Bold size={16} />
                </ToolbarButton>

                <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()}>
                    <Italic size={16} />
                </ToolbarButton>

                <ToolbarButton onClick={() => editor.chain().focus().toggleUnderline().run()}>
                    <UnderlineIcon size={16} />
                </ToolbarButton>

                <ToolbarButton onClick={() => editor.chain().focus().toggleStrike().run()}>
                    <Strikethrough size={16} />
                </ToolbarButton>

                {/* Headings */}
                <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
                    <Heading1 size={16} />
                </ToolbarButton>

                <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
                    <Heading2 size={16} />
                </ToolbarButton>

                {/* ➕ H3 BUTTON */}
                <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
                    <Heading3 size={16} />
                </ToolbarButton>

                <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()}>
                    <List size={16} />
                </ToolbarButton>

                <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()}>
                    <ListOrdered size={16} />
                </ToolbarButton>

                <ToolbarButton onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
                    <Code size={16} />
                </ToolbarButton>

                {/* ➕ HIGHLIGHT BUTTON */}
                <ToolbarButton onClick={() => editor.chain().focus().toggleHighlight().run()}>
                    <Highlighter size={16} />
                </ToolbarButton>

                <ToolbarButton onClick={() => editor.chain().focus().undo().run()}>
                    <Undo size={16} />
                </ToolbarButton>

                <ToolbarButton onClick={() => editor.chain().focus().redo().run()}>
                    <Redo size={16} />
                </ToolbarButton>
            </div>

            {/* Editor */}
            <EditorContent
                editor={editor}
                className="EditorContent grow border border-gray-300 w-full p-4 rounded-md resize-none outline-blue-700 overflow-auto"
            />
        </div>
    );
}
