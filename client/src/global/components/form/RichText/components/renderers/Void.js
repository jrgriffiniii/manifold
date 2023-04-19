import React, { useRef, useEffect } from "react";
import { ReactEditor, useFocused, useSelected } from "slate-react";
import * as Styled from "./styles";

export default function VoidRenderer({
  element,
  children,
  attributes,
  theme,
  darkMode
}) {
  const focused = useFocused();
  const selected = useSelected();

  const { srcdoc } = element ?? {};

  const ref = useRef();

  useEffect(() => {
    if (ref.current && !ref.current.shadowRoot) {
      const shadow = ref.current.attachShadow({ mode: "open" });
      const container = document.createElement("div");
      const containerClass = `manifold-text-section ${
        darkMode ? "scheme-dark" : "scheme-light"
      }`;
      container.setAttribute("class", containerClass);
      const style = document.createElement("style");
      style.textContent = theme;
      shadow.appendChild(style);
      container.innerHTML = srcdoc;
      shadow.appendChild(container);
    }
    if (ref.current?.shadowRoot) {
      const shadow = ref.current.shadowRoot;
      const container = shadow.childNodes[1];
      const containerClass = `manifold-text-section ${
        darkMode ? "scheme-dark" : "scheme-light"
      }`;
      container.setAttribute("class", containerClass);
    }
  }, [srcdoc, theme, darkMode]);

  return (
    <div {...attributes}>
      {children}
      <Styled.VoidWrapper
        ref={ref}
        contentEditable={false}
        $selected={selected && focused}
      />
    </div>
  );
}