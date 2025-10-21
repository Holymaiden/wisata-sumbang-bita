export interface PublicAttraction {
  id: string;
  title: string;
  description: string;
  category: string;
  rating: number;
  duration: string;
  difficulty: string;
  location: string | null;
  ticketPrice: number;
  ticketPriceChild: number | null;
  images: PublicAttractionImage[];
  features: PublicAttractionFeature[];
}

export interface PublicAttractionImage {
  url: string;
  alt: string | null;
  caption: string | null;
  isPrimary: boolean;
  order: number;
}

export interface PublicAttractionFeature {
  name: string;
  icon: string | null;
  description: string | null;
}

export interface PublicGalleryImage {
  id: string;
  title: string;
  description: string | null;
  url: string;
  alt: string | null;
  category: string | null;
}

export interface PublicContactInfo {
  id: string;
  type: string;
  title: string;
  value: string;
  description: string | null;
  icon: string | null;
  order: number;
}

export interface PublicSiteMeta {
  title: string;
  description: string;
  heroBadgeLocation: string;
  heroHeading: string;
  heroSubheading: string;
  stats: {
    rating: string;
    opening: string;
    spots: string;
  };
  about: {
    title: string;
    description: string;
    contentTitle: string;
    paragraphs: string[];
  };
  gallery: {
    title: string;
    description: string;
  };
  footerDescription: string;
}

export interface LandingPageData {
  attractions: PublicAttraction[];
  gallery: PublicGalleryImage[];
  galleryCategories: string[];
  siteMeta: PublicSiteMeta;
  contactInfos: PublicContactInfo[];
}
