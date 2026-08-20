import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View } from "react-native";

const heroImage = require("../../../../assets/images/auth/sign-in-hero.jpg");

export function HeroBackground() {
  return (
    <View className="absolute inset-0 bg-black">
      <Image
        source={heroImage}
        style={[StyleSheet.absoluteFill, { opacity: 0.50 }]}
        contentFit="cover"
      />
      <View className="absolute inset-0 bg-black/35" />
      <LinearGradient
        colors={[
          "rgba(0, 0, 0, 0.35)",
          "rgba(0, 0, 0, 0.58)",
          "rgba(0, 0, 0, 0.84)",
          "rgba(0, 0, 0, 0.98)",
        ]}
        locations={[0, 0.32, 0.58, 1]}
        style={StyleSheet.absoluteFill}
      />
    </View>
  );
}
