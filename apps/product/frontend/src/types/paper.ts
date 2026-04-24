export interface PaperSection {
  slug: string;
  title: string;
  content: string;
  order: number;
}

export interface PaperData {
  title: string;
  sections: PaperSection[];
}

export type ViewMode = 'markdown' | 'pdf';
