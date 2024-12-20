import { FieldErrors, UseFormSetValue } from "react-hook-form";
import { FormValues } from "../../../utils";
import {
  EditorContent,
  JSONContent,
  useEditor,
  type Editor as EditorType,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { ReactNode } from "react";

interface Props {
  setValue: UseFormSetValue<FormValues>;
  errors: FieldErrors<FormValues>;
  initialContent?: JSONContent;
}
export const MenuBar = ({ editor }: { editor: EditorType | null }) => {
  const buttonClass = (isActive: boolean) =>
    `w-8 h-7 grid place-items-center  border text-sm rounded transition-all ${
      isActive
        ? "border-blue-500 bg-blue-100 text-blue-700"
        : "border-gray-300 bg-white text-gray-600 hover:bg-gray-100"
    }`;

  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={buttonClass(editor.isActive("heading", { level: 1 }))}
        type="button"
      >
        H1
      </button>

      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={buttonClass(editor.isActive("heading", { level: 2 }))}
        type="button"
      >
        H2
      </button>

      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={buttonClass(editor.isActive("heading", { level: 3 }))}
        type="button"
      >
        H3
      </button>

      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={buttonClass(editor.isActive("bold"))}
        type="button"
      >
        N
      </button>

      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={buttonClass(editor.isActive("italic"))}
        type="button"
      >
        K
      </button>

      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={buttonClass(editor.isActive("strike"))}
        type="button"
      >
        S
      </button>
    </div>
  );
};
export const Editor = ({ errors, setValue, initialContent }: Props) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: initialContent || "",
    onUpdate: ({ editor }) => {
      const content = editor.getJSON();
      setValue("description", content, { shouldValidate: true });
    },
    editorProps: {
      attributes: {
        class: "focus:outline-none min-h-[150px] prose prose-sm sm:prose-base",
      },
    },
  });
  return (
    <>
      <div className="space-y-3">
        <MenuBar editor={editor} />
        <EditorContent editor={editor} />
        {errors.description && (
          <p className="text-red-500 text-xs mt-1">
            {(errors.description.message as ReactNode) ||
              "Debe escribir una descripción"}
          </p>
        )}
      </div>
    </>
  );
};
