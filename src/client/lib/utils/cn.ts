/**
 * DSAi Utils
 *
 * Utility functions for common operations.
 * These are pure functions with no side effects.
 *
 * @example
 * ```tsx
 * import { cn, generateId, isBrowser } from '@dsai-io/react';
 * ```
 */

/**
 * Combines class names conditionally (similar to clsx/classnames)
 *
 * @example
 * ```tsx
 * cn('btn', isActive && 'btn-active', size === 'lg' && 'btn-lg')
 * // => 'btn btn-active btn-lg' or 'btn' depending on conditions
 * ```
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
    return classes.filter(Boolean).join(" ");
}
