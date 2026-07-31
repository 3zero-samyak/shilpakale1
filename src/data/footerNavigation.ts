/**
 * SHILPAKALE Footer Navigation Data
 * 
 * Centralized footer link configuration for the main footer navigation.
 * Used by Footer component.
 */

export type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type FooterColumn = {
  heading: string;
  links: FooterLink[];
};

export const footerColumns: FooterColumn[] = [
  {
    heading: 'EXPLORE',
    links: [
      { label: 'HOME', href: '/' },
      { label: 'COLLECTIONS', href: '/collections' },
      { label: 'STORIES', href: '/stories' },
      { label: 'ABOUT US', href: '/about' },
    ],
  },
  {
    heading: 'HELP',
    links: [
      { label: 'SHIPPING POLICY', href: '/shipping-policy' },
      { label: 'RETURNS & EXCHANGE', href: '/returns-and-exchange' },
      { label: 'FAQ', href: '/faqs' },
      { label: 'CONTACT US', href: '/contact' },
    ],
  },
  {
    heading: 'LEARN',
    links: [
      { label: 'BLOG', href: '/blog' },
      { label: 'GIFT GUIDE', href: '/gift-guide' },
      { label: 'DECOR TIPS', href: '/decor-tips' },
    ],
  },
  {
    heading: 'CONNECT',
    links: [
      { label: 'INSTAGRAM', href: '/connect/instagram' },
      { label: 'YOUTUBE', href: '/connect/youtube' },
      { label: 'X / TWITTER', href: '/connect/twitter' },
      { label: 'WHATSAPP', href: '/connect/whatsapp' },
    ],
  },
];
