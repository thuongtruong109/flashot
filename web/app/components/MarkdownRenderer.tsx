"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        code({ node, inline, className, children, ...props }: any) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <SyntaxHighlighter
              style={oneDark}
              language={match[1]}
              PreTag="div"
              {...props}
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
        h1: ({ children }: any) => (
          <h1 className="text-4xl font-bold text-slate-900 mb-6 pb-4 border-b border-slate-200">
            {children}
          </h1>
        ),
        h2: ({ children }: any) => (
          <h2 className="text-3xl font-semibold text-slate-800 mt-12 mb-6 pb-3 border-b border-slate-100">
            {children}
          </h2>
        ),
        h3: ({ children }: any) => (
          <h3 className="text-2xl font-semibold text-slate-800 mt-8 mb-4">
            {children}
          </h3>
        ),
        h4: ({ children }: any) => (
          <h4 className="text-xl font-semibold text-slate-700 mt-6 mb-3">
            {children}
          </h4>
        ),
        p: ({ children }: any) => (
          <p className="text-slate-600 leading-relaxed mb-4">{children}</p>
        ),
        a: ({ href, children }: any) => (
          <a
            href={href}
            className="text-blue-600 hover:text-blue-800 underline transition-colors"
            target={href?.startsWith("http") ? "_blank" : undefined}
            rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
          >
            {children}
          </a>
        ),
        ul: ({ children }: any) => (
          <ul className="list-disc list-inside text-slate-600 mb-4 space-y-2">
            {children}
          </ul>
        ),
        ol: ({ children }: any) => (
          <ol className="list-decimal list-inside text-slate-600 mb-4 space-y-2">
            {children}
          </ol>
        ),
        li: ({ children }: any) => <li className="ml-4">{children}</li>,
        blockquote: ({ children }: any) => (
          <blockquote className="border-l-4 border-blue-200 bg-blue-50 p-4 my-6 italic text-slate-700">
            {children}
          </blockquote>
        ),
        table: ({ children }: any) => (
          <div className="overflow-x-auto my-6">
            <table className="min-w-full border border-slate-200 rounded-lg">
              {children}
            </table>
          </div>
        ),
        thead: ({ children }: any) => (
          <thead className="bg-slate-50">{children}</thead>
        ),
        th: ({ children }: any) => (
          <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 border-b border-slate-200">
            {children}
          </th>
        ),
        td: ({ children }: any) => (
          <td className="px-4 py-3 text-sm text-slate-600 border-b border-slate-100">
            {children}
          </td>
        ),
        pre: ({ children }: any) => (
          <div className="rounded-lg overflow-hidden my-6">{children}</div>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
