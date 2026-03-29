/**
 * Securely stringifies a JSON-LD object for embedding in a <script> tag.
 * This prevents XSS by escaping characters that could be interpreted as HTML tags,
 * specifically the sequence "</script>".
 */
export const serializeSchema = (schema: object): string =>
	JSON.stringify(schema)
		.replace(/</g, '\\u003c')
		.replace(/>/g, '\\u003e')
		.replace(/&/g, '\\u0026')
		.replace(/\u2028/g, '\\u2028')
		.replace(/\u2029/g, '\\u2029');
