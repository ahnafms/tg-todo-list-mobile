import { YStack, XStack, Text, ScrollView } from "tamagui";
import { tasksAtom } from "@/stores/tasks";
import { useAtomValue } from "jotai";
import { EditTasksRow } from "./edit-task-row";
import { SafeAreaView } from "react-native";

const headers = ["name", "status", "check", "delete"];

export const TasksList = () => {
  const tasks = useAtomValue(tasksAtom);

  return (
    <SafeAreaView style={{ paddingVertical: 20 }}>
      <YStack padding={10} width="100%" maxWidth={900}>
        <Text
          color={"black"}
          fontSize={24}
          fontWeight="bold"
          marginBottom={10}
          textAlign="center"
        >
          To do list app
        </Text>

        <XStack
          backgroundColor="$gray300"
          justifyContent="space-between"
          padding={8}
          borderRadius={8}
          marginBottom={10}
        >
          {headers.map((header, index) => (
            <Text
              key={index}
              flex={1}
              textAlign="center"
              fontWeight="bold"
              color={"black"}
            >
              {header}
            </Text>
          ))}
        </XStack>

        <ScrollView contentContainerStyle={{ paddingBottom: 125 }}>
          {tasks.length > 0 ? (
            tasks.map((task) => <EditTasksRow key={task.id} {...task} />)
          ) : (
            <YStack alignItems="center" justifyContent="center" padding={20}>
              <Text fontSize={16} color="black" textAlign="center">
                No data entries yet.
              </Text>
            </YStack>
          )}
        </ScrollView>
      </YStack>
    </SafeAreaView>
  );
};
