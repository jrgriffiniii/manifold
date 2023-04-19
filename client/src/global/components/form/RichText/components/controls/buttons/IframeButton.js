import React, { forwardRef, useRef } from "react";
import { Transforms, Editor, Element as SlateElement } from "slate";
import { useSlate, ReactEditor } from "slate-react";
import Dialog from "global/components/dialog";
import InsertIframeForm from "./insert/IframeForm";
import { useConfirmation } from "hooks";
import Utility from "global/components/utility";
import { isValidUrl } from "../../../utils/helpers";
import { isBlockActive } from "./BlockButton";
import * as Styled from "./styles";

export const insertIframe = (editor, url, title) => {
  const text = { text: "" };
  const embed = {
    type: "iframe",
    htmlAttrs: { src: url, title },
    children: [text]
  };
  Transforms.insertNodes(editor, embed);
  ReactEditor.focus(editor);
};

const IframeButton = ({ icon, size, selection, ...rest }, ref) => {
  const editor = useSlate();
  const { confirm, confirmation } = useConfirmation();
  const urlRef = useRef(null);
  const titleRef = useRef(null);

  const addIframe = close => {
    const url = urlRef?.current?.inputElement?.value;
    if (!url) return;
    const title = titleRef?.current?.inputElement?.value;
    if (!isValidUrl(url)) return;
    close();
    return insertIframe(editor, url, title);
  };

  const updateIframe = attrs => close => {
    const url = urlRef?.current?.inputElement?.value ?? attrs.src;
    if (!url) return;
    const title = titleRef?.current?.inputElement?.value;
    close();
    Transforms.setNodes(editor, {
      htmlAttrs: { ...attrs, src: url, title }
    });
    ReactEditor.focus(editor);
  };

  // Not totally sure why, but we have to perform an actual update to the node tree after closing the modal before returning focus to the editor. It might be a weird interaction between the focus trap's close callbacks and the editor.
  const onModalClose = close => {
    close();
    const [node] = Editor.above(editor, { at: selection.focus.path });
    const val = node?.selection_tracker_ignore ?? false;
    Transforms.setNodes(
      editor,
      { selection_tracker_ignore: !val },
      { at: selection.focus.path.slice(0, -1) }
    );
    ReactEditor.focus(editor);
  };

  const getIframeData = e => {
    e.preventDefault();
    const heading = "Insert Iframe";
    const message = <InsertIframeForm urlRef={urlRef} titleRef={titleRef} />;
    if (confirm)
      confirm(heading, message, addIframe, onModalClose, {
        rejectLabel: "Cancel",
        resolveLabel: "Add"
      });
  };

  const updateIframeData = e => {
    e.preventDefault();

    const [[iframe]] = Array.from(
      Editor.nodes(editor, {
        at: Editor.unhangRange(editor, selection),
        match: n =>
          !Editor.isEditor(n) &&
          SlateElement.isElement(n) &&
          n.type === "iframe"
      })
    );

    const attrs = iframe?.htmlAttrs ?? {};
    const defaultValues = {
      src: attrs.src,
      title: attrs.title
    };

    const heading = "Update Iframe";
    const message = (
      <InsertIframeForm
        defaultValues={defaultValues}
        urlRef={urlRef}
        titleRef={titleRef}
      />
    );

    if (confirm)
      confirm(heading, message, updateIframe(attrs), onModalClose, {
        rejectLabel: "Cancel",
        resolveLabel: "Update"
      });
  };

  const active = isBlockActive(editor, "iframe");

  return (
    <>
      <Styled.Button
        ref={ref}
        {...rest}
        aria-label="iframe"
        data-active={active}
        onClick={active ? updateIframeData : getIframeData}
        tabIndex={-1}
      >
        {icon && <Utility.IconComposer icon={icon} size={size} />}
      </Styled.Button>
      {confirmation && <Dialog.Confirm {...confirmation} />}
    </>
  );
};

export default forwardRef(IframeButton);