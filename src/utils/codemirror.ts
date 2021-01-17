import CodeMirror, {Editor, EditorConfiguration} from 'codemirror';

let editor: Editor | null = null;

const themes = [
  '3024-day',
  '3024-night',
  'abcdef',
  'ambiance',
  'ambiance-mobile',
  'ayu-dark',
  'ayu-mirage',
  'base16-dark',
  'base16-light',
  'bespin',
  'blackboard',
  'cobalt',
  'colorforth',
  'darcula',
  'dracula',
  'duotone-dark',
  'duotone-light',
  'eclipse',
  'elegant',
  'erlang-dark',
  'gruvbox-dark',
  'hopscotch',
  'icecoder',
  'idea',
  'isotope',
  'lesser-dark',
  'liquibyte',
  'lucario',
  'material',
  'material-darker',
  'material-ocean',
  'material-palenight',
  'mbo',
  'mdn-like',
  'midnight',
  'monokai',
  'moxer',
  'neat',
  'neo',
  'night',
  'nord',
  'oceanic-next',
  'panda-syntax',
  'paraiso-dark',
  'paraiso-light',
  'pastel-on-dark',
  'railscasts',
  'rubyblue',
  'seti',
  'shadowfox',
  'solarized',
  'ssms',
  'the-matrix',
  'tomorrow-night-bright',
  'tomorrow-night-eighties',
  'ttcn',
  'twilight',
  'vibrant-ink',
  'xq-dark',
  'xq-light',
  'yeti',
  'yonce',
  'zenburn',
];

export const getCodemirrorEditor = (el: HTMLElement, options: EditorConfiguration): Editor => {
  if (!editor) {
    editor = CodeMirror(el, options);
  }
  return editor;
};

export const initTheme = (name?: string) => {
  if (!name) name = 'darcula';
  import(`codemirror/theme/${name}.css`);
};

export const getThemes = () => {
  return themes;
};
