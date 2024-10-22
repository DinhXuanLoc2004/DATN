export interface category {
  _id: string;
  name_category: string;
  parent_id: string | null;
  image_category: {
    public_id: string;
    url: string;
  };
  depth: number;
}

export interface categoriesResponse extends Response {
  metadata: {
    categories: Array<category>
  };
}
