export const SITE_URL = 'https://www.sigtunabagskytte.se';
export const CLUB_NAME = 'Sigtuna Bågskytteklubb';
export const CLUB_EMAIL = 'sigtunabagskytte@gmail.com';
export const CLUB_PHONE = '0768638329';
export const CLUB_PHONE_HREF = 'tel:+46768638329';
export const CLUB_EMAIL_HREF = 'mailto:sigtunabagskytte@gmail.com';
export const CLUB_FOUNDED = 1979;

export const FACEBOOK_URL = 'https://www.facebook.com/SigtunaBagskytteklubb';

export const SUMMER_LOCATION = {
  name: 'Rävsta skjutbana',
  address: 'Rävstvägen 110',
  city: 'Märsta',
  postalCode: '195 92',
  mapsUrl:
    'https://maps.google.com/?q=Rävstvägen+110,+195+92+Märsta',
} as const;

export const WINTER_LOCATION = {
  name: 'Eddaskolan',
  address: '',
  city: 'Märsta',
  postalCode: '',
  mapsUrl: 'https://maps.google.com/?q=Eddaskolan,+Märsta',
} as const;

// Navigation structure — used by Header and breadcrumb components
type NavChild = { readonly label: string; readonly href: string };
type NavItem = { readonly label: string; readonly href: string; readonly children?: readonly NavChild[] };

export const NAV_ITEMS: readonly NavItem[] = [
  { label: 'Hem', href: '/' },
  { label: 'Nyheter', href: '/nyheter/' },
  {
    label: 'Prova på',
    href: '/prova-pa/',
    children: [
      { label: 'Pilbågstyper', href: '/prova-pa/pilbagar/' },
      { label: 'Grenar', href: '/prova-pa/grenar/' },
    ],
  },
  {
    label: 'Om oss',
    href: '/om-oss/',
    children: [
      { label: 'Medlemskap', href: '/om-oss/medlemskap/' },
      { label: 'Träning', href: '/om-oss/traning/' },
      { label: 'Tävling', href: '/om-oss/tavling/' },
      { label: 'Styrelse', href: '/om-oss/styrelse/' },
    ],
  },
  {
    label: 'Kontakt',
    href: '/kontakt/',
    children: [{ label: 'Hitta till oss', href: '/kontakt/hitta-till-oss/' }],
  },
];
