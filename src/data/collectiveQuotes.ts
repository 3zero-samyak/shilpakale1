/**
 * Collectives Manuscript Quote Data
 *
 * Centralized quote content for the palm-leaf manuscript slideshow.
 * Approved historical quotes and attributions are still required.
 *
 * Do not edit component markup when replacing temporary content.
 * Replace only the values in this data file.
 */

export type CollectivePage = {
  pageNumber: number;
  quote: string;
  attribution?: string;
  languageLabel?: string;
};

export type CollectiveSpread = {
  id: string;
  leftPage: CollectivePage;
  rightPage: CollectivePage;
};

/**
 * One spread containing two pages total.
 * Current content is temporary placeholder text.
 *
 * APPROVED COPY REQUIRED for both pages.
 */
export const collectiveSpreads: CollectiveSpread[] = [
  {
    id: 'spread-01',
    leftPage: {
      pageNumber: 1,
      quote: 'QUOTE 01 — APPROVED COPY REQUIRED',
    },
    rightPage: {
      pageNumber: 2,
      quote: 'QUOTE 02 — APPROVED COPY REQUIRED',
    },
  },
];
