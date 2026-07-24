const escapeHtml = (text) =>
  text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

// Minimal Markdown -> HTML renderer covering what the AI system prompt
// is instructed to use: bold, italics, inline code, links, and lists.
export function renderMarkdown(raw = "") {
  const safe = escapeHtml(raw);
  const lines = safe.split(/\r?\n/);

  const html = [];
  let listType = null;
  let tableRows = null;

  const closeList = () => {
    if (listType) {
      html.push(listType === "ul" ? "</ul>" : "</ol>");
      listType = null;
    }
  };

  const isTableRow = (line) => /^\|.*\|$/.test(line.trim());
  const isTableDivider = (line) => /^\|?[\s:|-]+\|?$/.test(line.trim()) && line.includes("-");

  const splitRow = (line) =>
    line.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((cell) => cell.trim());

  const closeTable = () => {
    if (!tableRows) return;
    const [headerRow, ...bodyRows] = tableRows;
    html.push('<div class="ai-chat-table-wrap"><table>');
    if (headerRow) html.push(`<thead><tr>${headerRow.map((cell) => `<th>${inline(cell)}</th>`).join("")}</tr></thead>`);
    if (bodyRows.length) {
      html.push("<tbody>");
      bodyRows.forEach((row) => {
        html.push(`<tr>${row.map((cell) => `<td>${inline(cell)}</td>`).join("")}</tr>`);
      });
      html.push("</tbody>");
    }
    html.push("</table></div>");
    tableRows = null;
  };

  const inline = (text) =>
    text
      .replace(/`([^`]+)`/g, "<code>$1</code>")
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/\*([^*]+)\*/g, "<em>$1</em>")
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

  lines.forEach((line) => {
    const trimmed = line.trim();

    if (!trimmed) {
      closeList();
      closeTable();
      return;
    }

    if (isTableRow(trimmed)) {
      if (isTableDivider(trimmed) && tableRows) return; // skip the |---|---| separator row
      closeList();
      if (!tableRows) tableRows = [];
      tableRows.push(splitRow(trimmed));
      return;
    }
    closeTable();

    const heading = trimmed.match(/^(#{1,3})\s+(.*)/);
    if (heading) {
      closeList();
      const level = heading[1].length + 3; // h4-h6, keeps sizing modest in a chat bubble
      html.push(`<h${level}>${inline(heading[2])}</h${level}>`);
      return;
    }

    const bullet = trimmed.match(/^[-*]\s+(.*)/);
    if (bullet) {
      if (listType !== "ul") { closeList(); html.push("<ul>"); listType = "ul"; }
      html.push(`<li>${inline(bullet[1])}</li>`);
      return;
    }

    const numbered = trimmed.match(/^\d+\.\s+(.*)/);
    if (numbered) {
      if (listType !== "ol") { closeList(); html.push("<ol>"); listType = "ol"; }
      html.push(`<li>${inline(numbered[1])}</li>`);
      return;
    }

    closeList();
    html.push(`<p>${inline(trimmed)}</p>`);
  });

  closeList();
  closeTable();
  return html.join("");
}