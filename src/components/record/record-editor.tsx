"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { Image as TiptapImage } from "@tiptap/extension-image";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import {
  Table,
  TableRow,
  TableHeader,
  TableCell,
} from "@tiptap/extension-table";
import Youtube from "@tiptap/extension-youtube";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { getPresignedUrlApi } from "@/api/upload";
import {
  Bold,
  Italic,
  Strikethrough,
  UnderlineIcon,
  Highlighter,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  ListChecks,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Code,
  CodeSquare,
  Quote,
  Minus,
  Link2,
  Link2Off,
  ImageIcon,
  PlayCircle,
  Table2,
} from "lucide-react";

interface RecordEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  className?: string;
}

interface ToolbarButtonProps {
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  title: string;
}

function ToolbarButton({
  onClick,
  isActive,
  disabled,
  children,
  title,
}: ToolbarButtonProps) {
  return (
    <button
      type="button"
      title={title}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "flex h-7 w-7 items-center justify-center rounded-md transition-colors",
        isActive
          ? "bg-green-subtle text-green-subtle-foreground"
          : "text-muted-foreground hover:bg-muted hover:text-foreground",
        disabled && "pointer-events-none opacity-40"
      )}
    >
      {children}
    </button>
  );
}

function ToolbarDivider() {
  return <div className="mx-0.5 my-1 w-px self-stretch bg-border/60" />;
}

function InlineInput({
  value,
  onChange,
  placeholder,
  onConfirm,
  onCancel,
  confirmLabel,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmLabel: string;
}) {
  return (
    <div className="flex items-center gap-2 border-b border-border/60 bg-muted/20 px-3 py-2">
      <input
        type="url"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus
        className="flex-1 bg-transparent text-sm focus:outline-none"
        onKeyDown={(e) => {
          if (e.key === "Enter") onConfirm();
          if (e.key === "Escape") onCancel();
        }}
      />
      <button
        type="button"
        onClick={onConfirm}
        className="text-xs font-medium text-green"
      >
        {confirmLabel}
      </button>
      <button
        type="button"
        onClick={onCancel}
        className="text-xs text-muted-foreground"
      >
        취소
      </button>
    </div>
  );
}

async function uploadImage(file: File): Promise<string> {
  const dotIndex = file.name.lastIndexOf(".");
  const ext = dotIndex !== -1 ? file.name.slice(dotIndex + 1) : "jpg";
  const filename = dotIndex !== -1 ? file.name.slice(0, dotIndex) : file.name;

  const res = await getPresignedUrlApi({
    prefix: "image",
    filename,
    extension: ext,
  });

  const s3Res = await fetch(res.presigned_url, {
    method: "PUT",
    body: file,
    headers: { "Content-Type": file.type },
  });
  if (!s3Res.ok) throw new Error("S3 업로드 실패");

  return `${res.host}${res.path}`;
}

export function RecordEditor({
  value,
  onChange,
  placeholder = "내용을 입력하세요...",
  className,
}: RecordEditorProps) {
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [showYoutubeInput, setShowYoutubeInput] = useState(false);
  const [youtubeUrl, setYoutubeUrl] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);
  // ref로 최신 editor 인스턴스를 drop/paste 핸들러에 노출
  const insertImageRef = useRef<(file: File) => void>(() => {});

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        // StarterKit이 내장한 Link/Underline을 설정만 변경
        link: { openOnClick: false },
      }),
      Placeholder.configure({ placeholder }),
      TiptapImage,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      TaskList,
      TaskItem.configure({ nested: true }),
      Table.configure({ resizable: false }),
      TableRow,
      TableHeader,
      TableCell,
      Youtube.configure({ controls: true, nocookie: true }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html === "<p></p>" ? "" : html);
    },
    editorProps: {
      attributes: { class: "focus:outline-none" },
      handleDrop(_, event, __, moved) {
        if (!moved && event.dataTransfer?.files?.length) {
          const file = event.dataTransfer.files[0];
          if (file.type.startsWith("image/")) {
            event.preventDefault();
            insertImageRef.current(file);
            return true;
          }
        }
        return false;
      },
      handlePaste(_, event) {
        const files = event.clipboardData?.files;
        if (files?.length) {
          const file = files[0];
          if (file.type.startsWith("image/")) {
            event.preventDefault();
            insertImageRef.current(file);
            return true;
          }
        }
        return false;
      },
    },
  });

  // editor 변경 시 ref 업데이트
  useEffect(() => {
    if (!editor) return;
    insertImageRef.current = async (file: File) => {
      try {
        const url = await uploadImage(file);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (editor.chain().focus() as any).setImage({ src: url }).run();
      } catch {
        toast.error("이미지 업로드에 실패했습니다.");
      }
    };
  }, [editor]);

  useEffect(() => {
    if (editor && value === "" && editor.getHTML() !== "<p></p>") {
      editor.commands.clearContent();
    }
  }, [editor, value]);

  if (!editor) return null;

  const isLinkActive = editor.isActive("link");

  const handleLinkConfirm = () => {
    if (linkUrl) editor.chain().focus().setLink({ href: linkUrl }).run();
    setShowLinkInput(false);
    setLinkUrl("");
  };

  const handleYoutubeConfirm = () => {
    if (youtubeUrl) editor.commands.setYoutubeVideo({ src: youtubeUrl });
    setShowYoutubeInput(false);
    setYoutubeUrl("");
  };

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-border/60 bg-card",
        className
      )}
    >
      {/* Hidden file input for image upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) insertImageRef.current(file);
          e.target.value = "";
        }}
      />

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 border-b border-border/60 bg-muted/30 px-2 py-1.5">
        {/* 텍스트 서식 */}
        <ToolbarButton
          title="굵게 (Ctrl+B)"
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive("bold")}
        >
          <Bold className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          title="기울임 (Ctrl+I)"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive("italic")}
        >
          <Italic className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          title="밑줄 (Ctrl+U)"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          isActive={editor.isActive("underline")}
        >
          <UnderlineIcon className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          title="취소선"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          isActive={editor.isActive("strike")}
        >
          <Strikethrough className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          title="하이라이트"
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          isActive={editor.isActive("highlight")}
        >
          <Highlighter className="h-4 w-4" />
        </ToolbarButton>

        <ToolbarDivider />

        {/* 제목 */}
        <ToolbarButton
          title="제목 1"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          isActive={editor.isActive("heading", { level: 1 })}
        >
          <Heading1 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          title="제목 2"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          isActive={editor.isActive("heading", { level: 2 })}
        >
          <Heading2 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          title="제목 3"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          isActive={editor.isActive("heading", { level: 3 })}
        >
          <Heading3 className="h-4 w-4" />
        </ToolbarButton>

        <ToolbarDivider />

        {/* 목록 */}
        <ToolbarButton
          title="글머리 기호"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive("bulletList")}
        >
          <List className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          title="번호 목록"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive("orderedList")}
        >
          <ListOrdered className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          title="체크리스트"
          onClick={() => editor.chain().focus().toggleTaskList().run()}
          isActive={editor.isActive("taskList")}
        >
          <ListChecks className="h-4 w-4" />
        </ToolbarButton>

        <ToolbarDivider />

        {/* 정렬 */}
        <ToolbarButton
          title="왼쪽 정렬"
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          isActive={editor.isActive({ textAlign: "left" })}
        >
          <AlignLeft className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          title="가운데 정렬"
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          isActive={editor.isActive({ textAlign: "center" })}
        >
          <AlignCenter className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          title="오른쪽 정렬"
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          isActive={editor.isActive({ textAlign: "right" })}
        >
          <AlignRight className="h-4 w-4" />
        </ToolbarButton>

        <ToolbarDivider />

        {/* 블록 */}
        <ToolbarButton
          title="인라인 코드"
          onClick={() => editor.chain().focus().toggleCode().run()}
          isActive={editor.isActive("code")}
        >
          <Code className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          title="코드 블록"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          isActive={editor.isActive("codeBlock")}
        >
          <CodeSquare className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          title="인용문"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editor.isActive("blockquote")}
        >
          <Quote className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          title="구분선"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <Minus className="h-4 w-4" />
        </ToolbarButton>

        <ToolbarDivider />

        {/* 삽입 */}
        <ToolbarButton
          title={isLinkActive ? "링크 제거" : "링크 삽입"}
          isActive={isLinkActive || showLinkInput}
          onClick={() => {
            if (isLinkActive) {
              editor.chain().focus().unsetLink().run();
              return;
            }
            setShowYoutubeInput(false);
            setShowLinkInput((v) => !v);
          }}
        >
          {isLinkActive ? (
            <Link2Off className="h-4 w-4" />
          ) : (
            <Link2 className="h-4 w-4" />
          )}
        </ToolbarButton>
        <ToolbarButton
          title="이미지 업로드"
          onClick={() => fileInputRef.current?.click()}
        >
          <ImageIcon className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          title="YouTube 삽입"
          isActive={showYoutubeInput}
          onClick={() => {
            setShowLinkInput(false);
            setShowYoutubeInput((v) => !v);
          }}
        >
          <PlayCircle className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          title="표 삽입"
          onClick={() =>
            editor
              .chain()
              .focus()
              .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
              .run()
          }
        >
          <Table2 className="h-4 w-4" />
        </ToolbarButton>
      </div>

      {/* 링크 URL 입력 */}
      {showLinkInput && (
        <InlineInput
          value={linkUrl}
          onChange={setLinkUrl}
          placeholder="https://..."
          onConfirm={handleLinkConfirm}
          onCancel={() => {
            setShowLinkInput(false);
            setLinkUrl("");
          }}
          confirmLabel="적용"
        />
      )}

      {/* YouTube URL 입력 */}
      {showYoutubeInput && (
        <InlineInput
          value={youtubeUrl}
          onChange={setYoutubeUrl}
          placeholder="YouTube URL을 입력하세요"
          onConfirm={handleYoutubeConfirm}
          onCancel={() => {
            setShowYoutubeInput(false);
            setYoutubeUrl("");
          }}
          confirmLabel="삽입"
        />
      )}

      <EditorContent editor={editor} />
    </div>
  );
}
