import { Text } from "react-native";
import { Pressable } from "react-native";
import { Link, Stack } from "expo-router";
import { ShoppingCart, User } from "lucide-react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "@/global.css";

import { Icon } from "@/components/ui/icon";
import { useCartStore } from "@/store/cart-store";
import { useAuthStore } from "@/store/auth-store";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";

const queryClient = new QueryClient();

const RootLayout = () => {
  const cartItemsNumber = useCartStore((state) => state.items.length);

  const isLoggedIn = useAuthStore((s) => !!s.token);

  return (
    <QueryClientProvider client={queryClient}>
      <GluestackUIProvider>
        <Stack
          screenOptions={{
            headerRight: () =>
              cartItemsNumber > 0 && (
                <Link href={"/cart"} asChild>
                  <Pressable className="flex-row gap-2">
                    <Icon as={ShoppingCart} />
                    <Text>{cartItemsNumber}</Text>
                  </Pressable>
                </Link>
              ),
          }}
        >
          <Stack.Screen
            name="index"
            options={{
              title: "Shop",
              headerLeft: () =>
                !isLoggedIn && (
                  <Link href="/login" className="mr-12" asChild>
                    <Pressable>
                      <Icon as={User} />
                    </Pressable>
                  </Link>
                ),
            }}
          />
          <Stack.Screen name="product/[id]" options={{ title: "Product" }} />
        </Stack>
      </GluestackUIProvider>
    </QueryClientProvider>
  );
};

export default RootLayout;
