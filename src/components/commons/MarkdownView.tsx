import { marked } from 'marked';
import React from 'react';

const renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
  const link = marked.Renderer.prototype.link.call(this, href, title, text);
  return link.replace('<a', '<a target="_blank" ');
};

interface MarkdownViewProps {
  markdownStringBody: string;
  className?: string;
}

export const MarkdownView: React.FC<MarkdownViewProps> = (props) => {
  const options = {
    gfm: true,
    breaks: true,
    pedantic: true,
    smartLists: true,
    smartypants: true,
    renderer: renderer,
  };

  const renderMarkdown = (text: string) => {
    return marked(text, options);
  };

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: renderMarkdown(props.markdownStringBody),
      }}
      className={props.className}
    />
  );
};
