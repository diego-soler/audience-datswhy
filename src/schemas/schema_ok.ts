interface UI {
  title: {
      [language:string]: string;
    },
  hint: {
    [language:string]: string;
  }
}

interface Segment {
  name: string;
  description: string;
  ui: UI;
}

interface Subcategory {
  name: string;
  description: string;
  ui: UI;
  segments: Array<Segment>;
}

interface Category {
  name: string;
  description: string;
  ui: UI;
  subcategories: Array<Subcategory>;
}

export interface Doc {
  geographicZone: string;
  tableName: string;
  providerName: string;
  categories: Array<Category>;
}

export default Doc;