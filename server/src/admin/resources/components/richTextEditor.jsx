import React from "react";
import { Input, RichText } from "@admin-bro/design-system";

const richTextEditor = (props) => {
  const { property } = props;
  console.log(property);
  return (
    <>
      <RichText
        onChange={(txt) => null}
        quill={{
          modules: {
            toolbar: [
              (["bold", "italic", "underline", "strike"], // toggled buttons
              ["blockquote", "code-block"],
              [{ header: 1 }, { header: 2 }], // custom button values
              [{ list: "ordered" }, { list: "bullet" }],
              [{ script: "sub" }, { script: "super" }], // superscript/subscript
              [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
              [{ direction: "rtl" }], // text direction
              [{ size: ["small", false, "large", "huge"] }], // custom dropdown
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              [{ color: [] }, { background: [] }], // dropdown with defaults from theme
              [{ font: [] }],
              [{ align: [] }],
              ["clean"]),
            ],
          },
        }}
      />
    </>
  );
};

export default richTextEditor;
