import { FlatList } from "react-native";

import products from "@/assets/products.json";
import { ProductListItem } from "../components/product-list-item";

const HomeScreen = () => {
  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <ProductListItem product={item} />}
    />
  );
};

export default HomeScreen;
