import { Marked, Renderer } from 'marked';
import React from 'react';

const marked = new Marked({
  async: false,
  gfm: true,
  breaks: true,
  pedantic: true,
  renderer: {
    link(token) {
      const link = Renderer.prototype.link.call(this, token);
      return link.replace('<a', '<a target="_blank" ');
    },
  },
});

interface MarkdownViewProps {
  markdownStringBody: string;
  className?: string;
}

export const MarkdownView: React.FC<MarkdownViewProps> = (props) => (
  <div
    dangerouslySetInnerHTML={{
      __html: marked.parse(props.markdownStringBody, { async: false }),
    }}
    className={props.className}
  />
);
