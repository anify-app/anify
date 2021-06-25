/**
 * Narrows the type of a value to T. Useful as a filter function to narrow array types
 *
 * ```
 * const dirtyArr: (T | undefined | null)[]
 *
 * const cleanArr: T[] = dirtyArr.filter(isPresent)
 * ```
 * @typedef T - Type to narrow to
 * @param t - Loosely typed value possibly undefined/null
 * @returns Type assertion that `t` is `T`
 */
const isPresent = <T>(t: T | undefined | null | void): t is T => {
  return t !== undefined && t !== null
}

export default isPresent
