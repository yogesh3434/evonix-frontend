type ChatMessageContentProps = {
  text: string;
};

type Block =
  | { kind: 'paragraph'; lines: string[] }
  | { kind: 'list'; items: string[] }
  | { kind: 'table'; headers: string[]; rows: string[][] };

const splitRow = (line: string): string[] =>
  line
    .replace(/^\s*\|/, '')
    .replace(/\|\s*$/, '')
    .split('|')
    .map((cell) => cell.trim());

const isDividerRow = (line: string): boolean =>
  /^\s*\|?[\s:|-]+\|[\s:|-]*$/.test(line) && line.includes('-');

const parseBlocks = (text: string): Block[] => {
  const lines = text.split('\n');
  const blocks: Block[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];

    if (line.trim().startsWith('|') && isDividerRow(lines[index + 1] ?? '')) {
      const headers = splitRow(line);
      const rows: string[][] = [];
      index += 2;

      while (index < lines.length && lines[index].trim().startsWith('|')) {
        rows.push(splitRow(lines[index]));
        index += 1;
      }

      blocks.push({ kind: 'table', headers, rows });
      continue;
    }

    if (/^\s*[-*+]\s+/.test(line)) {
      const items: string[] = [];

      while (index < lines.length && /^\s*[-*+]\s+/.test(lines[index])) {
        items.push(lines[index].replace(/^\s*[-*+]\s+/, ''));
        index += 1;
      }

      blocks.push({ kind: 'list', items });
      continue;
    }

    if (line.trim().length === 0) {
      index += 1;
      continue;
    }

    const paragraph: string[] = [];

    while (
      index < lines.length &&
      lines[index].trim().length > 0 &&
      !lines[index].trim().startsWith('|') &&
      !/^\s*[-*+]\s+/.test(lines[index])
    ) {
      paragraph.push(lines[index].trim());
      index += 1;
    }

    blocks.push({ kind: 'paragraph', lines: paragraph });
  }

  return blocks;
};

const renderInline = (text: string, keyPrefix: string) => {
  const parts = text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);

  return parts.map((part, partIndex) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={`${keyPrefix}-${partIndex}`} className="font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }

    return <span key={`${keyPrefix}-${partIndex}`}>{part}</span>;
  });
};

const ChatMessageContent = ({ text }: ChatMessageContentProps) => {
  const blocks = parseBlocks(text);

  return (
    <div className="space-y-2">
      {blocks.map((block, blockIndex) => {
        if (block.kind === 'table') {
          return (
            <div key={blockIndex} className="-mx-1 overflow-x-auto">
              <table className="w-full border-collapse text-xs">
                <thead>
                  <tr>
                    {block.headers.map((header, headerIndex) => (
                      <th
                        key={headerIndex}
                        className="border border-slate-200 bg-slate-100 px-2 py-1.5 text-left font-semibold text-slate-600"
                      >
                        {renderInline(header, `h-${blockIndex}-${headerIndex}`)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {block.rows.map((row, rowIndex) => (
                    <tr key={rowIndex} className="even:bg-slate-50">
                      {row.map((cell, cellIndex) => (
                        <td
                          key={cellIndex}
                          className="border border-slate-200 px-2 py-1.5 align-top text-slate-700"
                        >
                          {renderInline(
                            cell,
                            `c-${blockIndex}-${rowIndex}-${cellIndex}`
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }

        if (block.kind === 'list') {
          return (
            <ul key={blockIndex} className="list-disc space-y-1 pl-5">
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex}>
                  {renderInline(item, `l-${blockIndex}-${itemIndex}`)}
                </li>
              ))}
            </ul>
          );
        }

        return (
          <p key={blockIndex}>
            {block.lines.map((line, lineIndex) => (
              <span key={lineIndex}>
                {renderInline(line, `p-${blockIndex}-${lineIndex}`)}
                {lineIndex < block.lines.length - 1 && <br />}
              </span>
            ))}
          </p>
        );
      })}
    </div>
  );
};

export default ChatMessageContent;
