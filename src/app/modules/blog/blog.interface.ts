export interface IBlog {
    title: string;
    content: string;
    featureImage?: string;
    category: string;
    tag: string[];
    createdAt: Date
  }