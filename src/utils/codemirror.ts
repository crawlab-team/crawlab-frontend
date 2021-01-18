import CodeMirror, {Editor, EditorConfiguration} from 'codemirror';

// import addons
import 'codemirror/addon/search/search.js';
import 'codemirror/addon/search/searchcursor';
import 'codemirror/addon/search/matchesonscrollbar.js';
import 'codemirror/addon/search/matchesonscrollbar.css';
import 'codemirror/addon/search/match-highlighter';
import 'codemirror/addon/edit/matchtags';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/comment/comment';
import 'codemirror/addon/hint/show-hint';

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

const template = `import os
def func(a):
  pass
class Class1:
  pass
`;

const optionsDefinitions: FileEditorOptionDefinition[] = [
  {
    name: 'theme',
    title: 'Theme',
    description: 'Theme of the file editor. The default is "darcula".',
    type: 'select',
    data: {
      options: themes,
    },
  },
  {
    name: 'indentUnit',
    title: 'Indent Unit',
    description: 'How many spaces a block (whatever that means in the edited language) should be indented.',
    type: 'input-number',
    data: {
      min: 1,
    }
  },
  {
    name: 'smartIndent',
    title: 'Smart Indent',
    description: 'Whether to use the context-sensitive indentation that the mode provides (or just indent the same as the line before). Defaults to true.',
    type: 'switch',
  },
  {
    name: 'tabSize',
    title: 'Tab Size',
    description: 'The width of a tab character. Defaults to 4.',
    type: 'input-number',
    data: {
      min: 1,
    }
  },
];

export const getCodemirrorEditor = (el: HTMLElement, options: EditorConfiguration): Editor => {
  return CodeMirror(el, options);
};

export const initTheme = (name?: string) => {
  if (!name) name = 'darcula';
  import(`codemirror/theme/${name}.css`);
};

export const getThemes = () => {
  return themes;
};

export const getCodeMirrorTemplate = () => {
  return template;
};

export const getOptionDefinition = (name: string): FileEditorOptionDefinition | undefined => {
  return optionsDefinitions.find(d => d.name === name);
};
