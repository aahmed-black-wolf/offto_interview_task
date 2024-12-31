export interface ICities {
  data: {
    items: {
      items?: {
        city?: {
          name?: string;
        };
      }[];
    }[];
  };
}
