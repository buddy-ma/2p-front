// src/locales/services/proprietaires.js
// Copy taken verbatim from Ayman's drafts (services2p.zip). Do not rewrite.
// FAQ items are TODO placeholders (no FAQ copy in drafts). Offer cards are NOT here: the hub reads them from
// servicePages.annoncePremium.card / assistanceCommerciale.card / mandatExclusif.card.
export default {
  fr: {
    seo: {
      title: "Vendre ou louer votre bien à Agadir – Offres 2P.ma" /* PROPOSED – not in drafts, Ayman to validate */,
      description: "Annonce Premium dès 700 DH, Assistance commerciale 1 000 DH / 3 mois ou Mandat exclusif sans avance, payé au succès. Agadir et région Souss-Massa." /* PROPOSED – not in drafts, Ayman to validate */
    },
    breadcrumb: "Propriétaires" /* PROPOSED – not in drafts, Ayman to validate */,
    images: {
      hero: {
        src: "/images/services/proprietaires-hero.webp",
        srcSm: "/images/services/proprietaires-hero-sm.webp",
        alt: "Propriétaire sur la terrasse de sa villa à Agadir, vue sur la baie" /* PROPOSED – not in drafts, Ayman to validate */
      },
      platform: {
        src: "/images/services/proprietaires-plateforme.webp",
        srcSm: "/images/services/proprietaires-plateforme-sm.webp",
        alt: "Couple consultant une annonce immobilière sur smartphone dans un appartement lumineux" /* PROPOSED – not in drafts, Ayman to validate */
      },
      mobileAgency: {
        src: "/images/services/proprietaires-agence-mobile.webp",
        srcSm: "/images/services/proprietaires-agence-mobile-sm.webp",
        alt: "Conseiller de l’agence mobile 2P échangeant avec un propriétaire dans une rue d’Agadir" /* PROPOSED – not in drafts, Ayman to validate */
      },
      contact: {
        src: "/images/services/proprietaires-contact.webp",
        srcSm: "/images/services/proprietaires-contact-sm.webp",
        alt: "Conseillère immobilière prenant des notes avec une propriétaire devant une maison" /* PROPOSED – not in drafts, Ayman to validate */
      }
    },
    hero: {
      title: "Vous avez un bien à vendre ou à louer à Agadir ou dans la région de Souss-Massa ?",
      subtitle: "Chaque propriétaire a ses propres besoins et son budget. C’est pourquoi nous ne vous imposons pas une solution unique : nous vous proposons trois offres pour commercialiser votre bien."
    },
    why: {
      title: "Pourquoi choisir 2P.ma ?",
      solutions: {
        title: "Des solutions de commercialisation adaptées à vos besoins",
        subtitle: "Vous choisissez le niveau de service",
        text: "De la publication de l’annonce, avec photos et visite virtuelle à 360°, au suivi des prospects et à l’organisation des visites, jusqu’à la prise en charge des différentes étapes de la commercialisation et à l’accompagnement de la transaction jusqu’à sa conclusion, selon l’offre choisie."
      },
      reach: {
        title: "Nous rapprochons votre bien des personnes intéressées, en ligne et sur le terrain",
        items: [
          {
            eyebrow: "",
            title: "Le site et l’application 2P.ma",
            text: "Nous présentons votre bien sur notre plateforme numérique et menons également des actions sur le terrain pour rechercher des acheteurs ou des locataires potentiels, selon le service choisi.",
            image: "platform"
          },
          {
            eyebrow: "Une présence sur le terrain, au plus près de vous",
            title: "Agence mobile 2P",
            text: "Nous allons à la rencontre des propriétaires à Agadir et dans les environs afin d’échanger directement avec eux, de comprendre leurs besoins et de leur présenter nos solutions de commercialisation.",
            image: "mobileAgency"
          }
        ]
      }
    },
    sections: {
      offers: "Nos 3 offres",
      details: "Détail des prestations",
      how: "Comment ça marche ?",
      faq: "Questions fréquentes",
      contact: "Formulaire de contact",
      compare: "Comparer les offres" /* PROPOSED – not in drafts, Ayman to validate */
    },
    closing: {
      title: "Votre bien, l’immobilier autrement.",
      text: "Choisissez le service dont vous avez besoin et laissez-nous vous accompagner dans la commercialisation de votre bien, selon la formule qui vous convient."
    },
    faq: [
      {
        topic: "commission",
        q: "[TODO FAQ – commission : question à rédiger par Ayman]" /* TODO – placeholder, must be resolved before deploy */,
        a: "[TODO FAQ – commission : réponse à rédiger par Ayman]" /* TODO – placeholder, must be resolved before deploy */
      },
      {
        topic: "exclusivité",
        q: "[TODO FAQ – exclusivité : question à rédiger par Ayman]" /* TODO – placeholder, must be resolved before deploy */,
        a: "[TODO FAQ – exclusivité : réponse à rédiger par Ayman]" /* TODO – placeholder, must be resolved before deploy */
      },
      {
        topic: "paiement",
        q: "[TODO FAQ – paiement : question à rédiger par Ayman]" /* TODO – placeholder, must be resolved before deploy */,
        a: "[TODO FAQ – paiement : réponse à rédiger par Ayman]" /* TODO – placeholder, must be resolved before deploy */
      },
      {
        topic: "durée",
        q: "[TODO FAQ – durée : question à rédiger par Ayman]" /* TODO – placeholder, must be resolved before deploy */,
        a: "[TODO FAQ – durée : réponse à rédiger par Ayman]" /* TODO – placeholder, must be resolved before deploy */
      }
    ],
    compare: {
      columns: [
        "Annonce Premium",
        "Assistance commerciale",
        "MANDAT EXCLUSIF"
      ],
      rows: [
        {
          label: "Tarif" /* PROPOSED – not in drafts, Ayman to validate */,
          cells: [
            "À partir de 700 DH",
            "1 000 DH — 3 MOIS",
            "0 DH D’AVANCE"
          ]
        },
        {
          label: "Commission" /* PROPOSED – not in drafts, Ayman to validate */,
          cells: [
            "0 % DE COMMISSION SUR LA VENTE OU LA LOCATION",
            "0 % DE COMMISSION",
            "VOUS PAYEZ UNIQUEMENT EN CAS DE RÉUSSITE"
          ]
        },
        {
          label: "Photos & visite virtuelle 360°" /* PROPOSED – not in drafts, Ayman to validate */,
          cells: [
            "Des photos professionnelles du bien · Une visite virtuelle à 360°",
            "Visite et photos du bien · Visite virtuelle à 360°",
            "Publication de l’annonce et promotion du bien"
          ]
        },
        {
          label: "Gestion des contacts" /* PROPOSED – not in drafts, Ayman to validate */,
          cells: [
            "Un contact direct",
            "Réception des demandes · Filtrage et qualification des prospects",
            "Réception et qualification des prospects"
          ]
        },
        {
          label: "Visites" /* PROPOSED – not in drafts, Ayman to validate */,
          cells: [
            "Vous gérez vous-même les contacts, les visites et les négociations.",
            "Organisation des rendez-vous de visite",
            "Organisation des visites et accompagnement des clients"
          ]
        },
        {
          label: "Négociation" /* PROPOSED – not in drafts, Ayman to validate */,
          cells: [
            "Liberté de négociation et de décision",
            "Vous gardez la main sur les visites physiques et la négociation finale.",
            "Négociation en votre nom"
          ]
        }
      ]
    }
  },
  ar: {
    seo: {
      title: "بيع أو كراء عقارك في أكادير – عروض 2P.ma" /* PROPOSED – not in drafts, Ayman to validate */,
      description: "إعلان مميز ابتداءً من 700 درهم، مساعدة تجارية 1,000 درهم لمدة 3 أشهر، أو تفويض حصري دون تسبيق والأداء عند النجاح. أكادير والنواحي." /* PROPOSED – not in drafts, Ayman to validate */
    },
    breadcrumb: "الملاك" /* PROPOSED – not in drafts, Ayman to validate */,
    images: {
      hero: {
        src: "/images/services/proprietaires-hero.webp",
        srcSm: "/images/services/proprietaires-hero-sm.webp",
        alt: "مالك على شرفة فيلته في أكادير مطلة على الخليج" /* PROPOSED – not in drafts, Ayman to validate */
      },
      platform: {
        src: "/images/services/proprietaires-plateforme.webp",
        srcSm: "/images/services/proprietaires-plateforme-sm.webp",
        alt: "زوجان يتصفحان إعلاناً عقارياً على الهاتف داخل شقة مضيئة" /* PROPOSED – not in drafts, Ayman to validate */
      },
      mobileAgency: {
        src: "/images/services/proprietaires-agence-mobile.webp",
        srcSm: "/images/services/proprietaires-agence-mobile-sm.webp",
        alt: "مستشار المكتب المتنقل يتحدث مع مالك عقار في أحد شوارع أكادير" /* PROPOSED – not in drafts, Ayman to validate */
      },
      contact: {
        src: "/images/services/proprietaires-contact.webp",
        srcSm: "/images/services/proprietaires-contact-sm.webp",
        alt: "مستشارة عقارية تدوّن ملاحظات مع مالكة أمام منزل" /* PROPOSED – not in drafts, Ayman to validate */
      }
    },
    hero: {
      title: "لديك عقار للبيع أو الكراء في أكادير أو جهة سوس ماسة درعة؟",
      subtitle: "لكل مالك احتياجاته وميزانيته. لذلك، لا نفرض عليك حلاً واحداً، بل نمنحك الاختيار بين ثلاثة عروض لتسويق عقارك."
    },
    why: {
      title: "لماذا تختار 2P.ma؟",
      solutions: {
        title: "حلول تسويقية تناسب احتياجاتك",
        subtitle: "",
        text: "أنت تختار مستوى الخدمة، من نشر الإعلان والتصوير والزيارة الافتراضية 360°، إلى متابعة المهتمين وتنظيم الزيارات، وصولاً إلى التكفّل بمراحل التسويق ومواكبة الصفقة حتى إتمامها، وفق العرض المختار."
      },
      reach: {
        title: "نقرّب عقارك من المهتمين، رقمياً وميدانياً",
        items: [
          {
            eyebrow: "",
            title: "موقع وتطبيق 2P.ma",
            text: "نعرض عقارك عبر منصتنا الرقمية، ونعمل ميدانياً على البحث عن مشترين أو مستأجرين محتملين، وفق الخدمة التي تختارها.",
            image: "platform"
          },
          {
            eyebrow: "حضور ميداني، أقرب إليك",
            title: "المكتب المتنقل",
            text: "نقترب من ملاك العقارات في أكادير والنواحي، للتواصل معهم مباشرة والتعرف على احتياجاتهم وتقديم حلولنا التسويقية.",
            image: "mobileAgency"
          }
        ]
      }
    },
    sections: {
      offers: "عروضنا الثلاثة" /* PROPOSED – not in drafts, Ayman to validate */,
      details: "تفاصيل الخدمات" /* PROPOSED – not in drafts, Ayman to validate */,
      how: "كيف تتم العملية؟" /* PROPOSED – not in drafts, Ayman to validate */,
      faq: "الأسئلة الشائعة" /* PROPOSED – not in drafts, Ayman to validate */,
      contact: "استمارة التواصل" /* PROPOSED – not in drafts, Ayman to validate */,
      compare: "قارن بين العروض" /* PROPOSED – not in drafts, Ayman to validate */
    },
    closing: {
      title: "عقارك، بصيغة مختلفة.",
      text: "اختر الخدمة التي تحتاجها، ودعنا نساعدك على تسويق عقارك بالطريقة المناسبة."
    },
    faq: [
      {
        topic: "العمولة",
        q: "[TODO FAQ – العمولة: السؤال]" /* TODO – placeholder, must be resolved before deploy */,
        a: "[TODO FAQ – العمولة: الجواب]" /* TODO – placeholder, must be resolved before deploy */
      },
      {
        topic: "الحصرية",
        q: "[TODO FAQ – الحصرية: السؤال]" /* TODO – placeholder, must be resolved before deploy */,
        a: "[TODO FAQ – الحصرية: الجواب]" /* TODO – placeholder, must be resolved before deploy */
      },
      {
        topic: "الأداء",
        q: "[TODO FAQ – الأداء: السؤال]" /* TODO – placeholder, must be resolved before deploy */,
        a: "[TODO FAQ – الأداء: الجواب]" /* TODO – placeholder, must be resolved before deploy */
      },
      {
        topic: "المدة",
        q: "[TODO FAQ – المدة: السؤال]" /* TODO – placeholder, must be resolved before deploy */,
        a: "[TODO FAQ – المدة: الجواب]" /* TODO – placeholder, must be resolved before deploy */
      }
    ],
    compare: {
      columns: [
        "الإعلان المميز",
        "المساعدة التجارية",
        "التفويض الحصري"
      ],
      rows: [
        {
          label: "السعر" /* PROPOSED – not in drafts, Ayman to validate */,
          cells: [
            "ابتداءً من 700 درهم",
            "1,000 درهم لمدة 3 أشهر",
            "الأداء بعد البيع، 0 درهم تسبيق"
          ]
        },
        {
          label: "العمولة" /* PROPOSED – not in drafts, Ayman to validate */,
          cells: [
            "0% عمولة على البيع أو الكراء",
            "0% عمولة على البيع أو الكراء",
            "لا تؤدي أتعابنا إلا عند نجاح العملية."
          ]
        },
        {
          label: "التصوير والزيارة الافتراضية 360°" /* PROPOSED – not in drafts, Ayman to validate */,
          cells: [
            "تصوير احترافي للعقار · إعداد زيارة افتراضية 360°",
            "معاينة العقار وتصويره · إعداد الزيارة الافتراضية 360°",
            "نشر الإعلان والترويج للعقار"
          ]
        },
        {
          label: "تدبير الاتصالات" /* PROPOSED – not in drafts, Ayman to validate */,
          cells: [
            "تواصل مباشر",
            "استقبال طلبات التواصل · تصفية المهتمين وتأهيل المشترين أو المستأجرين",
            "استقبال المهتمين وتأهيل المرشحين"
          ]
        },
        {
          label: "الزيارات" /* PROPOSED – not in drafts, Ayman to validate */,
          cells: [
            "يتولى المالك التواصل المباشر مع المهتمين وإدارة الزيارات والمفاوضات بنفسه ضمن هذا العرض.",
            "تنظيم مواعيد الزيارات",
            "تنظيم الزيارات ومرافقة العملاء"
          ]
        },
        {
          label: "التفاوض" /* PROPOSED – not in drafts, Ayman to validate */,
          cells: [
            "حرية التفاوض واتخاذ القرار",
            "أنت تحتفظ بقرار البيع أو الكراء والتفاوض النهائي، ونحن نتولى متابعة الاتصالات وتنظيم المواعيد.",
            "التفاوض نيابة عنك"
          ]
        }
      ]
    }
  },
}
