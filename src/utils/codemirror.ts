import CodeMirror, {Editor, EditorConfiguration} from 'codemirror';

let editor: Editor | null = null;

export const getCodemirrorEditor = (el: HTMLElement, options: EditorConfiguration): Editor => {
  if (!editor) {
    editor = CodeMirror(el, options);
  }
  return editor;
};
