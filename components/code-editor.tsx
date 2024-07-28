"use client";
import React from "react";

import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-jsx";

LANGUAGES.forEach((lang) => {
  require(`ace-builds/src-noconflict/mode-${lang}`);
  require(`ace-builds/src-noconflict/snippets/${lang}`);
});

THEMES.forEach((theme) => require(`ace-builds/src-noconflict/theme-${theme}`));
/*eslint-disable no-alert, no-console */
import "ace-builds/src-min-noconflict/ext-searchbox";
import "ace-builds/src-min-noconflict/ext-language_tools";
import { LANGUAGES, THEMES } from "@/constants";

type CodeEditorProps = {
  onChange?: (value: string) => void;
  resolvedTheme: string | undefined;
  language: string;
  isReadOnly?: boolean;
  defaultValue?: string;
};

export default function CodeEditor({
  onChange,
  resolvedTheme,
  language,
  isReadOnly = false,
  defaultValue,
}: CodeEditorProps) {
  return (
    <AceEditor
      className="w-full border"
      style={{
        width: "100%",
        height: "450px",
      }}
      placeholder="Share your code"
      mode={language ?? ""}
      theme={resolvedTheme === "dark" ? "monokai" : "tomorrow"}
      name="code_snip_share_editor"
      onChange={onChange}
      readOnly={isReadOnly}
      value={defaultValue}
      fontSize={14}
      lineHeight={19}
      showPrintMargin={true}
      showGutter={true}
      highlightActiveLine={true}
      setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
        showLineNumbers: true,
        tabSize: 2,
      }}
    />
  );
}
