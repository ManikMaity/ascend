import { useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { authClient } from "@/lib/auth-client";
import { GoogleSignInButton } from "./google-sign-in-button";
import { HeroBackground } from "./hero-background";

export function SignInScreen() {
  const insets = useSafeAreaInsets();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleGoogleSignIn() {
    setIsLoading(true);
    setError(null);

    try {
      const result = await authClient.signIn.social({
        provider: "google",
        callbackURL: "ascend://",
      });

      if (result.error) {
        setError("Authentication failed. Retry.");
        return;
      }

      await authClient.getSession();
      router.replace("/(app)");
    } catch {
      setError("Authentication failed. Retry.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <View className="flex-1 bg-black">
      <HeroBackground />

      <View className="flex-1 justify-end">
        <View
          className="items-center px-s-24"
          style={{ paddingBottom: insets.bottom + 48 }}
        >
          <GoogleSignInButton isLoading={isLoading} onPress={handleGoogleSignIn} />

          {error ? (
            <Text className="mt-s-12 text-center text-body-2 text-error-500">{error}</Text>
          ) : null}
        </View>
      </View>

      {isLoading ? (
        <View className="absolute inset-0 items-center justify-center bg-black/60">
          <ActivityIndicator color="#1A7AFF" />
        </View>
      ) : null}
    </View>
  );
}
