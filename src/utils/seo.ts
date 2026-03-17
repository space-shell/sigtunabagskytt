/**
 * SEO utilities — builds <head> meta props and JSON-LD structured data.
 * Replaces WordPress Rank Math SEO plugin functionality.
 */

export const SITE_URL = 'https://www.sigtunabagskytte.se';
export const CLUB_NAME = 'Sigtuna Bågskytteklubb';
export const DEFAULT_DESCRIPTION =
  'Sigtuna Bågskytteklubb – grundad 1979 i Märsta. Prova på bågskyttning för nybörjare, tävlingsverksamhet och träning för alla nivåer. Recurve, Compound och Långbåge.';
export const DEFAULT_OG_IMAGE = '/images/og-default.jpg';

export interface SeoProps {
  title: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  publishDate?: Date;
  noIndex?: boolean;
}

/**
 * Build complete SEO props for a page.
 * The `title` is automatically suffixed with the club name unless it already contains it.
 */
export function buildSeoProps(props: SeoProps): Required<SeoProps> {
  const title = props.title.includes(CLUB_NAME)
    ? props.title
    : `${props.title} – ${CLUB_NAME}`;

  return {
    title,
    description: props.description ?? DEFAULT_DESCRIPTION,
    canonical: props.canonical ?? SITE_URL,
    ogImage: props.ogImage ?? DEFAULT_OG_IMAGE,
    ogType: props.ogType ?? 'website',
    publishDate: props.publishDate ?? new Date(),
    noIndex: props.noIndex ?? false,
  };
}

// ── JSON-LD Structured Data ──────────────────────────────────────────────────

/**
 * JSON-LD for the club homepage: SportsClub + LocalBusiness
 */
export function sportsClubJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': ['SportsClub', 'LocalBusiness'],
    name: CLUB_NAME,
    url: SITE_URL,
    email: 'sigtunabagskytte@gmail.com',
    telephone: '+46768638329',
    foundingDate: '1979',
    description: DEFAULT_DESCRIPTION,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Rävstvägen 110',
      addressLocality: 'Märsta',
      postalCode: '195 92',
      addressCountry: 'SE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 59.6167,
      longitude: 17.85,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Monday',
        opens: '18:00',
        closes: '20:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Sunday',
        opens: '15:00',
        closes: '17:00',
      },
    ],
    sameAs: ['https://www.facebook.com/SigtunaBagskytteklubb'],
  };
}

/**
 * JSON-LD for a news post: Article
 */
export function articleJsonLd(params: {
  title: string;
  url: string;
  publishDate: Date;
  description?: string;
  imageUrl?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: params.title,
    url: params.url,
    datePublished: params.publishDate.toISOString(),
    description: params.description,
    image: params.imageUrl,
    publisher: {
      '@type': 'Organization',
      name: CLUB_NAME,
      url: SITE_URL,
    },
  };
}

/**
 * JSON-LD for an event/competition
 */
export function eventJsonLd(params: {
  name: string;
  url: string;
  startDate: Date;
  endDate?: Date;
  location: string;
  description?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SportsEvent',
    name: params.name,
    url: params.url,
    startDate: params.startDate.toISOString(),
    endDate: params.endDate?.toISOString(),
    location: {
      '@type': 'Place',
      name: params.location,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Märsta',
        addressCountry: 'SE',
      },
    },
    description: params.description,
    organizer: {
      '@type': 'Organization',
      name: CLUB_NAME,
      url: SITE_URL,
    },
  };
}

/**
 * JSON-LD breadcrumb for sub-pages
 */
export function breadcrumbJsonLd(
  items: Array<{ name: string; url: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
