import "@/global.css";
import { Stack } from "expo-router";

import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";

const RootLayout = () => {
  return (
    <GluestackUIProvider>
      <Stack />
    </GluestackUIProvider>
  );
};

export default RootLayout;
