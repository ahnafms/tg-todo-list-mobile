import { XStack, Text, Button, View } from "tamagui";
import { Controller, useForm } from "react-hook-form";
import { Switch } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSetAtom } from "jotai";
import { updateTasksAtom, deleteTasksAtom } from "@/stores/tasks";
import { taskContracts, taskTypes } from "@/entities/task";

export function EditTasksRow({ id, name, status }: taskTypes.Task) {
  const setUpdateTask = useSetAtom(updateTasksAtom);
  const setDeleteTask = useSetAtom(deleteTasksAtom);

  const form = useForm<{ status: boolean }>({
    resolver: zodResolver(taskContracts.EditTaskSchema),
    defaultValues: {
      status: status === taskContracts.Status.FINISH,
    },
  });

  const { watch, handleSubmit } = form;
  const isChecked = watch("status");

  const onSubmit = () => {
    setUpdateTask({
      id,
      name,
      status: isChecked
        ? taskContracts.Status.FINISH
        : taskContracts.Status.ON_GOING,
    });
  };

  const onDelete = () => {
    setDeleteTask(id);
  };

  return (
    <XStack
      justifyContent="space-between"
      alignItems="center"
      marginBottom={40}
      paddingHorizontal={16}
      width="100%"
    >
      <View width="25%" justifyContent="center" alignItems="center">
        <Text
          color="black"
          fontWeight="bold"
          textDecorationLine={isChecked ? "line-through" : "none"}
          textAlign="center"
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {name}
        </Text>
      </View>

      <View width="25%" justifyContent="center" alignItems="center">
        <Text
          color="black"
          fontWeight="bold"
          textDecorationLine={isChecked ? "line-through" : "none"}
          textAlign="center"
        >
          {isChecked ? "Completed" : "On going"}
        </Text>
      </View>

      <View width="25%" justifyContent="center" alignItems="center">
        <Controller
          control={form.control}
          name="status"
          render={({ field }) => (
            <Switch
              value={field.value}
              onValueChange={(value: boolean) => {
                field.onChange(value);
                onSubmit();
              }}
            />
          )}
        />
      </View>

      <View width="25%" justifyContent="center" alignItems="center">
        <Button onPress={handleSubmit(onDelete)} fontWeight="bold" size="$3">
          Delete
        </Button>
      </View>
    </XStack>
  );
}
