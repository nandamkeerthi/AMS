/**
 * Trigger a client-side file download.
 * @param {string} content
 * @param {string} fileName
 * @param {string} [mimeType]
 */
export function triggerDownload(content, fileName, mimeType = 'text/plain;charset=utf-8') {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = fileName;
  anchor.click();
  URL.revokeObjectURL(url);
}

export default triggerDownload;
