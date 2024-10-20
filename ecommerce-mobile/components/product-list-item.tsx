import { Text } from "react-native";

export const ProductListItem = ({ product }: { product: any }) => {
  return <Text style={{ fontSize: 30 }}>{product.name}</Text>;
};
