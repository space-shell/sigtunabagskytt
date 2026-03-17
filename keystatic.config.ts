import { config, collection, singleton, fields } from '@keystatic/core';

export default config({
  // Local mode for development. Switch to 'github' before production launch.
  // See .env.example for required KEYSTATIC_GITHUB_CLIENT_ID / SECRET vars.
  storage: {
    kind: 'local',
  },

  // ----- COLLECTIONS --------------------------------------------------------

  collections: {
    // ── News posts (Nyheter) ─────────────────────────────────────────────────
    news: collection({
      label: 'Nyheter',
      slugField: 'title',
      path: 'src/content/news/*',
      entryLayout: 'content',
      format: {
        contentField: 'body',
      },
      schema: {
        title: fields.slug({
          name: {
            label: 'Rubrik',
            validation: { isRequired: true },
          },
        }),
        publishDate: fields.date({
          label: 'Publiceringsdatum',
          validation: { isRequired: true },
          defaultValue: { kind: 'today' },
        }),
        excerpt: fields.text({
          label: 'Ingress',
          description: 'Kort sammanfattning som visas i nyhetslistningen.',
          multiline: true,
          validation: { isRequired: false },
        }),
        featuredImage: fields.image({
          label: 'Omslagsbild',
          description: 'Visas överst i artikeln och i förhandsgranskning.',
          directory: 'src/assets/images/news',
          publicPath: '/images/news/',
          validation: { isRequired: false },
        }),
        draft: fields.checkbox({
          label: 'Spara som utkast',
          description: 'Utkast visas inte på webbplatsen.',
          defaultValue: false,
        }),
        body: fields.markdoc({
          label: 'Innehåll',
          options: {
            image: {
              directory: 'src/assets/images/news',
              publicPath: '/images/news/',
            },
          },
        }),
      },
    }),

    // ── Bow types (Pilbågstyper) ─────────────────────────────────────────────
    bowTypes: collection({
      label: 'Pilbågstyper',
      slugField: 'title',
      path: 'src/content/bow-types/*',
      entryLayout: 'content',
      format: {
        contentField: 'body',
      },
      schema: {
        title: fields.slug({
          name: {
            label: 'Namn',
            validation: { isRequired: true },
          },
        }),
        shortDescription: fields.text({
          label: 'Kort beskrivning',
          description: 'Visas i kortformat på Prova på-sidan.',
          multiline: true,
          validation: { isRequired: true },
        }),
        heroImage: fields.image({
          label: 'Omslagsbild',
          directory: 'src/assets/images/bow-types',
          publicPath: '/images/bow-types/',
          validation: { isRequired: false },
        }),
        displayOrder: fields.number({
          label: 'Visningsordning',
          description: 'Lägre siffra visas först.',
          defaultValue: 99,
          validation: { isRequired: true, min: 1, max: 99 },
        }),
        body: fields.markdoc({
          label: 'Innehåll',
        }),
      },
    }),

    // ── Disciplines (Grenar) ─────────────────────────────────────────────────
    disciplines: collection({
      label: 'Grenar',
      slugField: 'title',
      path: 'src/content/disciplines/*',
      entryLayout: 'content',
      format: {
        contentField: 'body',
      },
      schema: {
        title: fields.slug({
          name: {
            label: 'Namn',
            validation: { isRequired: true },
          },
        }),
        shortDescription: fields.text({
          label: 'Kort beskrivning',
          description: 'Visas i kortformat på Prova på-sidan.',
          multiline: true,
          validation: { isRequired: true },
        }),
        heroImage: fields.image({
          label: 'Omslagsbild',
          directory: 'src/assets/images/disciplines',
          publicPath: '/images/disciplines/',
          validation: { isRequired: false },
        }),
        displayOrder: fields.number({
          label: 'Visningsordning',
          defaultValue: 99,
          validation: { isRequired: true, min: 1, max: 99 },
        }),
        body: fields.markdoc({
          label: 'Innehåll',
        }),
      },
    }),

    // ── Events / Competitions (Tävlingar & Evenemang) ────────────────────────
    events: collection({
      label: 'Tävlingar & Evenemang',
      slugField: 'title',
      path: 'src/content/events/*',
      entryLayout: 'content',
      format: {
        contentField: 'description',
      },
      schema: {
        title: fields.slug({
          name: {
            label: 'Namn',
            validation: { isRequired: true },
          },
        }),
        eventDate: fields.date({
          label: 'Datum',
          validation: { isRequired: true },
        }),
        endDate: fields.date({
          label: 'Slutdatum',
          description: 'Fyll i om tävlingen pågår flera dagar.',
          validation: { isRequired: false },
        }),
        location: fields.text({
          label: 'Plats',
          description: 'T.ex. "Rävsta skjutbana, Märsta"',
          validation: { isRequired: true },
        }),
        registrationUrl: fields.url({
          label: 'Anmälningslänk',
          description: 'Länk till extern anmälningssida (ianseo, Laget.se, etc.)',
          validation: { isRequired: false },
        }),
        registrationDeadline: fields.date({
          label: 'Anmälningsstopp',
          validation: { isRequired: false },
        }),
        status: fields.select({
          label: 'Status',
          options: [
            { label: 'Kommande', value: 'upcoming' },
            { label: 'Inställd', value: 'cancelled' },
            { label: 'Avslutad', value: 'completed' },
          ],
          defaultValue: 'upcoming',
        }),
        description: fields.markdoc({
          label: 'Beskrivning',
        }),
      },
    }),
  },

  // ----- SINGLETONS ---------------------------------------------------------

  singletons: {
    // ── Training schedule (Träningsschema) ───────────────────────────────────
    trainingSchedule: singleton({
      label: 'Träningsschema',
      path: 'src/content/training-schedule/schema',
      format: 'yaml',
      schema: {
        sessions: fields.array(
          fields.object({
            location: fields.select({
              label: 'Lokal',
              options: [
                { label: 'Inomhus – Eddaskolan', value: 'indoor' },
                { label: 'Utomhus – Rävsta skjutbana', value: 'outdoor' },
              ],
              defaultValue: 'indoor',
            }),
            dayOfWeek: fields.select({
              label: 'Veckodag',
              options: [
                { label: 'Måndag', value: 'måndag' },
                { label: 'Tisdag', value: 'tisdag' },
                { label: 'Onsdag', value: 'onsdag' },
                { label: 'Torsdag', value: 'torsdag' },
                { label: 'Fredag', value: 'fredag' },
                { label: 'Lördag', value: 'lördag' },
                { label: 'Söndag', value: 'söndag' },
              ],
              defaultValue: 'måndag',
            }),
            startTime: fields.text({
              label: 'Starttid (HH:MM)',
              validation: { isRequired: true, length: { max: 5 } },
            }),
            endTime: fields.text({
              label: 'Sluttid (HH:MM)',
              validation: { isRequired: true, length: { max: 5 } },
            }),
            audience: fields.select({
              label: 'För vem',
              options: [
                { label: 'Alla', value: 'alla' },
                { label: 'Vuxna', value: 'vuxna' },
                { label: 'Ungdomar', value: 'ungdomar' },
              ],
              defaultValue: 'alla',
            }),
            isSeasonal: fields.checkbox({
              label: 'Säsongsbaserad',
              description: 'Markera om träningen bara sker under vissa månader.',
              defaultValue: false,
            }),
            seasonLabel: fields.text({
              label: 'Säsongsinformation',
              description: 'T.ex. "Maj–december (väderberoende)"',
              validation: { isRequired: false },
            }),
            notes: fields.text({
              label: 'Anteckningar',
              description: 'Valfri extra info som visas bredvid passet.',
              validation: { isRequired: false },
            }),
          }),
          {
            label: 'Träningspass',
            itemLabel: (props) =>
              `${props.fields.dayOfWeek.value} ${props.fields.startTime.value}–${props.fields.endTime.value} (${props.fields.location.value})`,
          }
        ),
      },
    }),

    // ── Membership fees (Medlemsavgifter) ────────────────────────────────────
    membership: singleton({
      label: 'Medlemskap & Avgifter',
      path: 'src/content/membership/avgifter',
      format: 'yaml',
      schema: {
        fees: fields.array(
          fields.object({
            category: fields.text({
              label: 'Kategori',
              description: 'T.ex. "Senior", "Junior", "Stödmedlem"',
              validation: { isRequired: true },
            }),
            priceKr: fields.number({
              label: 'Pris (kr/år)',
              validation: { isRequired: true, min: 0 },
            }),
            description: fields.text({
              label: 'Beskrivning',
              description: 'Valfri förklaring av kategorin.',
              validation: { isRequired: false },
            }),
            isFamilyDiscount: fields.checkbox({
              label: 'Familjerabatt',
              description: 'Markera om detta är en familjerabattkategori.',
              defaultValue: false,
            }),
          }),
          {
            label: 'Avgiftskategorier',
            itemLabel: (props) =>
              `${props.fields.category.value} – ${props.fields.priceKr.value} kr`,
          }
        ),
        familyDiscountNotes: fields.markdoc({
          label: 'Familjerabatt – förklaring',
          description: 'Beskriv hur familjerabatten fungerar.',
        }),
        paymentSwish: fields.text({
          label: 'Swish-nummer',
          description: 'T.ex. "123 5767 595"',
          validation: { isRequired: false },
        }),
        paymentBankgiro: fields.text({
          label: 'Bankgiro',
          description: 'T.ex. "673-5740"',
          validation: { isRequired: false },
        }),
        paymentNotes: fields.markdoc({
          label: 'Betalningsinformation',
          description: 'Extra info om betalning, friskvård, etc.',
        }),
        renewalPeriod: fields.text({
          label: 'Förnyelsepériod',
          description: 'T.ex. "1 januari – 31 mars"',
          validation: { isRequired: false },
        }),
        trialDeduction: fields.text({
          label: 'Prova-på-avdrag',
          description: 'T.ex. "100 kr (provavgiften dras av vid medlemskap)"',
          validation: { isRequired: false },
        }),
      },
    }),

    // ── Board members (Styrelse) ─────────────────────────────────────────────
    board: singleton({
      label: 'Styrelse',
      path: 'src/content/board/styrelse',
      format: 'yaml',
      schema: {
        members: fields.array(
          fields.object({
            name: fields.text({
              label: 'Namn',
              validation: { isRequired: true },
            }),
            role: fields.text({
              label: 'Roll',
              description: 'T.ex. "Ordförande", "Kassör", "Sekreterare"',
              validation: { isRequired: true },
            }),
            email: fields.text({
              label: 'E-post',
              validation: { isRequired: false },
            }),
            phone: fields.text({
              label: 'Telefon',
              validation: { isRequired: false },
            }),
            showContact: fields.checkbox({
              label: 'Visa kontaktuppgifter publikt',
              description:
                'GDPR: Markera bara om personen har gett sitt samtycke till att visa kontaktuppgifter på webbplatsen.',
              defaultValue: false,
            }),
          }),
          {
            label: 'Styrelseledamöter',
            itemLabel: (props) =>
              `${props.fields.name.value} – ${props.fields.role.value}`,
          }
        ),
        lastElected: fields.date({
          label: 'Vald vid stämma',
          description: 'Datum för senaste årsmötet då styrelsen valdes.',
          validation: { isRequired: false },
        }),
      },
    }),

    // ── Try archery program (Prova på) ───────────────────────────────────────
    tryArchery: singleton({
      label: 'Prova på – Information',
      path: 'src/content/trial-program/index',
      format: 'yaml',
      schema: {
        priceKr: fields.number({
          label: 'Pris (kr)',
          description: 'Kostnad för hela provperioden.',
          defaultValue: 100,
          validation: { isRequired: true, min: 0 },
        }),
        sessionCount: fields.number({
          label: 'Antal provtillfällen',
          defaultValue: 3,
          validation: { isRequired: true, min: 1 },
        }),
        minimumAge: fields.number({
          label: 'Minimiålder',
          defaultValue: 10,
          validation: { isRequired: true, min: 1 },
        }),
        scheduleText: fields.text({
          label: 'Schema (text)',
          description: 'T.ex. "Första måndagen varje månad"',
          validation: { isRequired: true },
        }),
        scheduleTime: fields.text({
          label: 'Tid',
          description: 'T.ex. "18:00–20:00"',
          validation: { isRequired: true },
        }),
        location: fields.text({
          label: 'Plats',
          validation: { isRequired: true },
        }),
        bookingEmail: fields.text({
          label: 'Boknings-e-post',
          description: 'E-postadress som intressenter ska kontakta.',
          validation: { isRequired: true },
        }),
        introText: fields.markdoc({
          label: 'Introduktionstext',
        }),
        whatToExpectText: fields.markdoc({
          label: 'Vad kan jag förvänta mig?',
        }),
        equipmentProvidedText: fields.markdoc({
          label: 'Utrustning',
          description: 'Förklara att utrustning tillhandahålls av klubben.',
        }),
      },
    }),

    // ── Site settings (Webbplatsinställningar) ───────────────────────────────
    siteSettings: singleton({
      label: 'Webbplatsinställningar',
      path: 'src/content/settings/site',
      format: 'yaml',
      schema: {
        clubName: fields.text({
          label: 'Klubbnamn',
          defaultValue: 'Sigtuna Bågskytteklubb',
          validation: { isRequired: true },
        }),
        tagline: fields.text({
          label: 'Slogan',
          description: 'Kort beskrivning, visas under klubbnamnet.',
          validation: { isRequired: false },
        }),
        logo: fields.image({
          label: 'Logotyp',
          directory: 'src/assets/images',
          publicPath: '/images/',
          validation: { isRequired: false },
        }),
        primaryEmail: fields.text({
          label: 'Primär e-post',
          defaultValue: 'sigtunabagskytte@gmail.com',
          validation: { isRequired: true },
        }),
        primaryPhone: fields.text({
          label: 'Telefon',
          defaultValue: '0768638329',
          validation: { isRequired: false },
        }),

        // Winter / indoor location
        winterLocationName: fields.text({
          label: 'Vinterlokal – Namn',
          defaultValue: 'Eddaskolan',
          validation: { isRequired: true },
        }),
        winterLocationAddress: fields.text({
          label: 'Vinterlokal – Adress',
          validation: { isRequired: false },
        }),
        winterLocationCity: fields.text({
          label: 'Vinterlokal – Ort',
          defaultValue: 'Märsta',
          validation: { isRequired: false },
        }),
        winterLocationMapsUrl: fields.url({
          label: 'Vinterlokal – Google Maps-länk',
          validation: { isRequired: false },
        }),

        // Summer / outdoor location
        summerLocationName: fields.text({
          label: 'Sommarlokal – Namn',
          defaultValue: 'Rävsta skjutbana',
          validation: { isRequired: true },
        }),
        summerLocationAddress: fields.text({
          label: 'Sommarlokal – Adress',
          defaultValue: 'Rävstvägen 110',
          validation: { isRequired: false },
        }),
        summerLocationCity: fields.text({
          label: 'Sommarlokal – Ort',
          defaultValue: 'Märsta',
          validation: { isRequired: false },
        }),
        summerLocationMapsUrl: fields.url({
          label: 'Sommarlokal – Google Maps-länk',
          validation: { isRequired: false },
        }),

        // Social media
        facebook: fields.url({
          label: 'Facebook-länk',
          validation: { isRequired: false },
        }),
        instagram: fields.url({
          label: 'Instagram-länk',
          validation: { isRequired: false },
        }),

        footerText: fields.text({
          label: 'Sidfot – text',
          description: 'Visas längst ner på varje sida.',
          validation: { isRequired: false },
        }),

        analyticsToken: fields.text({
          label: 'Cloudflare Web Analytics Token',
          description: 'Valfri. Aktiverar statistik utan cookies.',
          validation: { isRequired: false },
        }),
      },
    }),
  },
});
