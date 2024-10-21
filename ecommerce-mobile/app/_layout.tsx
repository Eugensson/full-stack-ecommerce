import { Text } from "react-native";
import { Link, Stack } from "expo-router";
import { ShoppingCart } from "lucide-react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "@/global.css";

import { Icon } from "@/components/ui/icon";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { Pressable } from "react-native";
import { useCartStore } from "@/store/cart-store";

const queryClient = new QueryClient();

const RootLayout = () => {
  const cartItemsNumber = useCartStore((state) => state.items.length);

  return (
    <QueryClientProvider client={queryClient}>
      <GluestackUIProvider>
        <Stack
          screenOptions={{
            headerRight: () => (
              <Link href="/cart" asChild>
                <Pressable className="flex-row items-center gap-2">
                  <Icon as={ShoppingCart} />
                  <Text>{cartItemsNumber}</Text>
                </Pressable>
              </Link>
            ),
          }}
        >
          <Stack.Screen name="index" options={{ title: "Shop" }} />
          <Stack.Screen name="product/[id]" options={{ title: "Product" }} />
        </Stack>
      </GluestackUIProvider>
    </QueryClientProvider>
  );
};

export default RootLayout;
