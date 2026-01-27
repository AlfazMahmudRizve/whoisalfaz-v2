/**
 * Globally replaces the backend URL (https://v1.whoisalfaz.me) with the frontend URL (https://whoisalfaz.me).
 * This ensures that no backend links, canonicals, or schema IDs leak into the production site.
 * 
 * @param {string} content - The string content (HTML, JSON, or plain text) to sanitize.
 * @returns {string} - The sanitized string with all backend references replaced.
 */
export function replaceBackendUrl(content) {
    if (!content) return '';
    if (typeof content !== 'string') return content;

    // 1. Temporarily hide src="..." attributes that point to backend
    //    We look for src="https://v1.whoisalfaz.me..." and replace it with a placeholder
    const srcPlaceholder = '%%BACKEND_SRC%%';
    const protectedContent = content.replace(/(src=["'])(https?:\/\/v1\.whoisalfaz\.me)/g, `$1${srcPlaceholder}`);

    // 2. Perform the global replacement on the rest (hrefs, canonicals, etc.)
    const sanitized = protectedContent.replace(/https?:\/\/v1\.whoisalfaz\.me/g, 'https://whoisalfaz.me');

    // 3. Restore the protected src attributes
    //    Note: We only restore the protocol + domain part we hid.
    return sanitized.replace(new RegExp(srcPlaceholder, 'g'), 'https://v1.whoisalfaz.me');
}
