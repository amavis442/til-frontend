import { marked, type Token } from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css'; // or any other theme
import DOMPurify from 'dompurify';

// Custom code renderer using the new API
const renderer = {
  code(this: any, token: Token) {
    const { text: code, lang } = token as Token & { text: string; lang?: string };
    const validLang = lang && hljs.getLanguage(lang);
    const highlighted = validLang
      ? hljs.highlight(code, { language: lang }).value
      : hljs.highlightAuto(code).value;

    return `<pre><code class="hljs language-${lang || 'plaintext'}">${highlighted}</code></pre>`;
  }
};

const newlineBreaksExtension = {
  name: 'newlineBreaks',
  start(src: any) { return src.indexOf('\n'); },
  tokenizer(src: any) {
    const match = src.match(/^\n+/);
    if (match) {
      return {
        type: 'newlineBreaks',
        raw: match[0],
        text: match[0],
      };
    }
  },
  renderer(token: any) {
    return token.text.replace(/\n/g, '<br>\n');
  },
};

const newlineBreaks = {
  extensions: [
    {
      ...newlineBreaksExtension,
      level: 'block',
    },
    {
      ...newlineBreaksExtension,
      level: 'inline',
    },
  ],
};
//marked.use(newlineBreaks);
marked.use({ renderer });

export function renderMarkdown(md: string): string {
  //md = md.replace(/\r\n/g, '\n');

  const html = marked.parse(md.trimStart(), {
    gfm: true,
    breaks: false,
  }) as string;

  console.log("==== Markdown Rendered Output ====");
  console.log(html);
  return html;

}
