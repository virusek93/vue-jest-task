type categoriesType = {
  id: number;
  parent: number | null;
  title: string;
  subcategories?: Array<categoriesType>;
};

export default categoriesType;
