/**
 * Shared navigation configuration for SHILPAKALE
 * Used across header components and navigation menus
 */

export const primaryNavigation = [
  { label: 'HOME', href: '/' },
  { label: 'COLLECTIONS', href: '/collections' },
  { label: 'STORIES', href: '/stories' },
  { label: 'ABOUT US', href: '/about' },
  { label: 'FAQS', href: '/faqs' },
  { label: 'LOG IN', href: '/account' },
] as const;

export type NavigationItem = typeof primaryNavigation[number];
