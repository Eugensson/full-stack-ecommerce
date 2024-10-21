import { useQuery } from "@tanstack/react-query";
import { ActivityIndicator, FlatList, Text } from "react-native";

import { getAllProduct } from "@/api/products";
import { ProductListItem } from "@/components/product-list-item";
import { useBreakpointValue } from "@/components/ui/utils/use-break-point-value";

const HomeScreen = () => {
  const {
    data: products,
    isLoading,
    error,
  } = useQuery({ queryKey: ["products"], queryFn: getAllProduct });

  const numColumns = useBreakpointValue({
    default: 2,
    sm: 3,
    xl: 4,
  });

  if (isLoading) return <ActivityIndicator />;

  if (error) return <Text>Error fetching products</Text>;

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
