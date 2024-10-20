import { ActivityIndicator } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { Stack, useLocalSearchParams } from "expo-router";

import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Card } from "@/components/ui/card";
import { Image } from "@/components/ui/image";
import { getProductById } from "@/api/products";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { useCartStore } from "@/store/cart-store";
import { Button, ButtonText } from "@/components/ui/button";

const ProductDetailsScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const addProduct = useCartStore((state) => state.addProduct);
  const cartItems = useCartStore((state) => state.items);

  const addToCart = () => {
    addProduct(product);
  };

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products", id],
    queryFn: () => getProductById(id),
  });

  if (isLoading) return <ActivityIndicator />;

  if (error) return <Text>Product not found</Text>;

  return (
    <Box className="flex-1 items-center p-3">
      <Stack.Screen options={{ title: product.name }} />
      <Card className="p-5 rounded-lg w-full max-w-[960px] flex-1">
        <Image
          source={{ uri: product.image }}
          alt={`${product.name} image`}
          className="mb-6 h-[240px] w-full rounded-md"
          resizeMode="contain"
        />
        <Text className="text-sm font-normal mb-2 text-typography-700">
          {product.name}
        </Text>
        <VStack className="mb-6">
          <Heading size="md" className="mb-4">
            ${product.price}
          </Heading>
          <Text size="sm">{product.description}</Text>
        </VStack>
        <Box className="flex-col sm:flex-row">
          <Button onPress={addToCart}>
            <ButtonText size="sm">Add to cart</ButtonText>
          </Button>
          <Button
            variant="outline"
            className="px-4 py-2 border-outline-300 sm:flex-1"
          >
            <ButtonText size="sm" className="text-typography-600">
              Wishlist
            </ButtonText>
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default ProductDetailsScreen;
