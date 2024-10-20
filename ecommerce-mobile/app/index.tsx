import { FlatList } from "react-native";

import products from "@/assets/products.json";
import { ProductListItem } from "../components/product-list-item";

const HomeScreen = () => {
  return (
    <FlatList
      data={products}
      numColumns={2}
      contentContainerClassName="gap-2"
      columnWrapperClassName="gap-2"
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <ProductListItem product={item} />}
    />
  );
};

export default HomeScreen;
