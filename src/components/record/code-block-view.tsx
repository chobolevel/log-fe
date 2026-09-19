"use client";

import { NodeViewWrapper, NodeViewContent } from "@tiptap/react";
import type { ReactNodeViewProps } from "@tiptap/react";

const LANGUAGE_LABELS: Record<string, string> = {
  arduino: "Arduino",
  bash: "Bash",
  c: "C",
  cpp: "C++",
  csharp: "C#",
  css: "CSS",
  diff: "Diff",
  go: "Go",
  graphql: "GraphQL",
  ini: "INI",
  java: "Java",
  javascript: "JavaScript",
  json: "JSON",
  kotlin: "Kotlin",
  less: "Less",
  lua: "Lua",
  makefile: "Makefile",
  markdown: "Markdown",
  objectivec: "Objective-C",
  perl: "Perl",
  php: "PHP",
  "php-template": "PHP Template",
  plaintext: "Plain Text",
  python: "Python",
  "python-repl": "Python REPL",
  r: "R",
  ruby: "Ruby",
  rust: "Rust",
  scss: "SCSS",
  shell: "Shell",
  sql: "SQL",
  swift: "Swift",
  typescript: "TypeScript",
  vbnet: "VB.NET",
  wasm: "WASM",
  xml: "XML/HTML",
  yaml: "YAML",
};

export function CodeBlockView({
  node,
  updateAttributes,
  extension,
}: ReactNodeViewProps) {
  const languages: string[] = extension.options.lowlight
    .listLanguages()
    .sort((a: string, b: string) => a.localeCompare(b));
  const language: string = node.attrs.language ?? "";

  return (
    <NodeViewWrapper className="relative">
      <select
        contentEditable={false}
        value={language}
        onChange={(e) => updateAttributes({ language: e.target.value || null })}
        className="absolute top-2 right-2 z-10 rounded-md border border-white/10 bg-white/10 px-2 py-1 text-[11px] font-medium text-white/80 backdrop-blur-sm outline-none hover:bg-white/15 focus:bg-white/15"
      >
        <option value="">자동 감지</option>
        {languages.map((lang) => (
          <option key={lang} value={lang}>
            {LANGUAGE_LABELS[lang] ?? lang}
          </option>
        ))}
      </select>
      <pre>
        <NodeViewContent<"code"> as="code" />
      </pre>
    </NodeViewWrapper>
  );
}
