import { FlatList } from "react-native";

import products from "@/assets/products.json";
import { ProductListItem } from "@/components/product-list-item";
import { useBreakpointValue } from "@/components/ui/utils/use-break-point-value";

const HomeScreen = () => {
  const numColumns = useBreakpointValue({
    default: 2,
    sm: 3,
    xl: 4,
  });

  return (
    <FlatList
      key={numColumns}
      data={products}
      numColumns={numColumns}
      contentContainerClassName="gap-2 w-full max-w-[960px] mx-auto"
      columnWrapperClassName="gap-2"
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <ProductListItem product={item} />}
    />
  );
};

export default HomeScreen;
