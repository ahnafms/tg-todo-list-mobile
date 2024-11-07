import { Image, StyleSheet, Platform } from "react-native";

import { CreateTask } from "@/features/tasks/create-tasks";
import { YStack } from "tamagui";

export default function HomeScreen() {
  return (
    <YStack f={1} ai="center" jc="center">
      <CreateTask />
    </YStack>
  );
}
