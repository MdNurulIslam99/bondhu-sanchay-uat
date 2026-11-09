// Join class names, ignoring falsy values.
export const cn = (...parts) => parts.filter(Boolean).join(' ');
