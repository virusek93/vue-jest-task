type productItem = {
  id: string;
  name: string;
  description: string;
  price: string;
  category: {
    id: string | number;
    title: string;
  };
};

export default productItem;
