import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "@/global.css";

import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";

const queryClient = new QueryClient();

const RootLayout = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <GluestackUIProvider>
        <Stack>
          <Stack.Screen name="index" options={{ title: "Shop" }} />
          <Stack.Screen name="product/[id]" options={{ title: "Product" }} />
        </Stack>
      </GluestackUIProvider>
    </QueryClientProvider>
  );
};

export default RootLayout;
