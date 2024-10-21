import { useState } from "react";
import { Redirect } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import { EyeIcon, EyeOffIcon } from "lucide-react-native";

import { login, signUp } from "@/api/auth";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Heading } from "@/components/ui/heading";
import { FormControl } from "@/components/ui/form-control";
import { Button, ButtonText } from "@/components/ui/button";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { useAuthStore } from "@/store/auth-store";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const setUser = useAuthStore((s) => s.setUser);
  const setToken = useAuthStore((s) => s.setToken);
  const isLoggedIn = useAuthStore((s) => !!s.token);

  const loginMutation = useMutation({
    mutationFn: () => login(email, password),
    onSuccess: (data) => {
      console.log("Success login: ", data);
      if (data.user && data.token) {
        setUser(data.user);
        setToken(data.token);
      }
    },
    onError: (error) => console.log("Error: ", error),
  });

  const signUpMutation = useMutation({
    mutationFn: () => signUp(email, password),
    onSuccess: (data) => {
      console.log("Success sign up: ", data);
      if (data.user && data.token) {
        setUser(data.user);
        setToken(data.token);
      }
    },
    onError: (error) => console.log("Error: ", error),
  });

  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };

  if (isLoggedIn) return <Redirect href="/" />;

  return (
    <FormControl
      isInvalid={loginMutation.error || signUpMutation.error}
      className="p-4 m-2 border rounded-lg border-outline-300 bg-white"
    >
      <VStack space="xl">
        <Heading className="text-typography-900 leading-3 pt-6">Login</Heading>
        <VStack space="xs">
          <Text className="text-typography-500 leading-1">Email</Text>
          <Input>
            <InputField type="text" value={email} onChangeText={setEmail} />
          </Input>
        </VStack>
        <VStack space="xs">
          <Text className="text-typography-500 leading-1">Password</Text>
          <Input className="text-center">
            <InputField
              value={password}
              onChangeText={setPassword}
              type={showPassword ? "text" : "password"}
            />
            <InputSlot className="pr-3" onPress={handleState}>
              <InputIcon
                as={showPassword ? EyeIcon : EyeOffIcon}
                className="text-slate-500"
              />
            </InputSlot>
          </Input>
        </VStack>
        <HStack space="sm" className="mt-4">
          <Button
            className="flex-1"
            variant="outline"
            onPress={() => signUpMutation.mutate()}
          >
            <ButtonText>Sign up</ButtonText>
          </Button>
          <Button className="flex-1" onPress={() => loginMutation.mutate()}>
            <ButtonText>Sign in</ButtonText>
          </Button>
        </HStack>
      </VStack>
    </FormControl>
  );
};

export default LoginScreen;
