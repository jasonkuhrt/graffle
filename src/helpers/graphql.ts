/**
 * Clean a GraphQL document to send it via a GET query
 */
export const cleanQuery = (str: string): string => str.replace(/([\s,]|#[^\n\r]+)+/g, ` `).trim()
