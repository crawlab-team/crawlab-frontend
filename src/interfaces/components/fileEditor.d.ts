import {Editor} from 'codemirror';
import {Computed} from 'vuex';

declare global {
  interface FileDetailProps {
    fileContent: string;
    fileName: string;
  }

  interface FileDetailState extends FileDetailProps {
    editor?: Editor;
  }

  interface FileDetailComputed {
    options: Computed<CodeMirrorOptions>;
  }
}
