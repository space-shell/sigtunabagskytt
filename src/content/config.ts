import { defineCollection, z } from 'astro:content';

// ── News (Nyheter) ───────────────────────────────────────────────────────────
const newsCollection = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      publishDate: z.coerce.date(),
      excerpt: z.string().optional(),
      featuredImage: image().optional(),
      draft: z.boolean().default(false),
    }),
});

// ── Bow Types (Pilbågstyper) ─────────────────────────────────────────────────
const bowTypesCollection = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      shortDescription: z.string(),
      heroImage: image().optional(),
      displayOrder: z.number().default(99),
    }),
});

// ── Disciplines (Grenar) ─────────────────────────────────────────────────────
const disciplinesCollection = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      shortDescription: z.string(),
      heroImage: image().optional(),
      displayOrder: z.number().default(99),
    }),
});

// ── Events (Tävlingar & Evenemang) ───────────────────────────────────────────
const eventsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    eventDate: z.coerce.date(),
    endDate: z.coerce.date().optional(),
    location: z.string(),
    registrationUrl: z.string().url().optional(),
    registrationDeadline: z.coerce.date().optional(),
    status: z.enum(['upcoming', 'cancelled', 'completed']).default('upcoming'),
  }),
});

// ── Training Schedule (singleton stored as YAML) ─────────────────────────────
const trainingScheduleCollection = defineCollection({
  type: 'data',
  schema: z.object({
    sessions: z.array(
      z.object({
        location: z.enum(['indoor', 'outdoor']),
        dayOfWeek: z.string(),
        startTime: z.string(),
        endTime: z.string(),
        audience: z.enum(['alla', 'vuxna', 'ungdomar']),
        isSeasonal: z.boolean().default(false),
        seasonLabel: z.string().optional(),
        notes: z.string().optional(),
      })
    ),
  }),
});

// ── Membership fees (singleton stored as YAML) ───────────────────────────────
const membershipCollection = defineCollection({
  type: 'data',
  schema: z.object({
    fees: z.array(
      z.object({
        category: z.string(),
        priceKr: z.number(),
        description: z.string().optional(),
        isFamilyDiscount: z.boolean().default(false),
      })
    ),
    familyDiscountNotes: z.any().optional(), // Markdoc content
    paymentSwish: z.string().optional(),
    paymentBankgiro: z.string().optional(),
    paymentNotes: z.any().optional(), // Markdoc content
    renewalPeriod: z.string().optional(),
    trialDeduction: z.string().optional(),
  }),
});

// ── Board (singleton stored as YAML) ────────────────────────────────────────
const boardCollection = defineCollection({
  type: 'data',
  schema: z.object({
    members: z.array(
      z.object({
        name: z.string(),
        role: z.string(),
        email: z.string().optional(),
        phone: z.string().optional(),
        showContact: z.boolean().default(false),
      })
    ),
    lastElected: z.coerce.date().optional(),
  }),
});

// ── Trial Program / Prova på (singleton stored as YAML) ──────────────────────
const trialProgramCollection = defineCollection({
  type: 'data',
  schema: z.object({
    priceKr: z.number(),
    sessionCount: z.number(),
    minimumAge: z.number(),
    scheduleText: z.string(),
    scheduleTime: z.string(),
    location: z.string(),
    bookingEmail: z.string(),
    introText: z.string().optional(),
    whatToExpectText: z.string().optional(),
    equipmentProvidedText: z.string().optional(),
  }),
});

// ── Site Settings (singleton stored as YAML) ─────────────────────────────────
const settingsCollection = defineCollection({
  type: 'data',
  schema: ({ image }) =>
    z.object({
      clubName: z.string().default('Sigtuna Bågskytteklubb'),
      tagline: z.string().optional(),
      logo: image().optional(),
      primaryEmail: z.string(),
      primaryPhone: z.string().optional(),
      winterLocationName: z.string(),
      winterLocationAddress: z.string().optional(),
      winterLocationCity: z.string().optional(),
      winterLocationMapsUrl: z.string().url().optional(),
      summerLocationName: z.string(),
      summerLocationAddress: z.string().optional(),
      summerLocationCity: z.string().optional(),
      summerLocationMapsUrl: z.string().url().optional(),
      facebook: z.string().url().optional(),
      instagram: z.string().url().optional(),
      footerText: z.string().optional(),
      analyticsToken: z.string().optional(),
    }),
});

export const collections = {
  news: newsCollection,
  'bow-types': bowTypesCollection,
  disciplines: disciplinesCollection,
  events: eventsCollection,
  'training-schedule': trainingScheduleCollection,
  membership: membershipCollection,
  board: boardCollection,
  settings: settingsCollection,
  'trial-program': trialProgramCollection,
};
