// Copy placeholders start with "[TODO". They are visible in dev and hidden in production builds.
export const isTodo = (v) => typeof v === 'string' && v.trim().startsWith('[TODO')

export const SHOW_TODO = import.meta.env.DEV

export const withoutTodo = (arr = []) =>
  arr.filter((x) => !Object.values(typeof x === 'object' && x !== null ? x : { x }).some(isTodo))
