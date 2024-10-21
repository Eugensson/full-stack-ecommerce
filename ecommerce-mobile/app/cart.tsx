import { FlatList } from "react-native";

import { Text } from "@/components/ui/text";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { useCartStore } from "@/store/cart-store";
import { Button, ButtonText } from "@/components/ui/button";
import { Redirect } from "expo-router";

const CartScreen = () => {
  const items = useCartStore((state) => state.items);
  const resetCart = useCartStore((state) => state.resetCart);

  const onCheckout = async () => {
    console.log("checkout");

    resetCart();
  };

  if (items.length === 0) return <Redirect href="/" />;

  return (
    <FlatList
      data={items}
      contentContainerClassName="gap-2 p-2 w-full max-w-[960px] mx-auto"
      renderItem={({ item }) => (
        <HStack className="bg-white p-3 rounded-lg">
          <VStack space="sm">
            <Text bold>{item.product.name}</Text>
            <Text>{item.product.price}</Text>
          </VStack>
          <Text className="ml-auto">{item.quantity}</Text>
        </HStack>
      )}
      ListFooterComponent={() => (
        <Button onPress={onCheckout}>
          <ButtonText>Checkout</ButtonText>
        </Button>
      )}
    />
  );
};

export default CartScreen;
