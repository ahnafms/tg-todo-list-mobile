import { XStack, Text, Checkbox, Button, View } from "tamagui";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSetAtom } from "jotai";
import { updateTasksAtom, deleteTasksAtom } from "@/stores/tasks";
import { taskContracts, taskTypes } from "@/entities/task";
import { Check as CheckIcon } from "@tamagui/lucide-icons";

export function EditTasksRow({ id, name, status }: taskTypes.Task) {
  const setUpdateTask = useSetAtom(updateTasksAtom);
  const setDeleteTask = useSetAtom(deleteTasksAtom);

  const form = useForm<{ status: boolean }>({
    resolver: zodResolver(taskContracts.EditTaskSchema),
    defaultValues: {
      status: false,
    },
  });

  const { watch } = form;
  const isChecked = watch("status");

  const onSubmit = (data: boolean) => {
    setUpdateTask({
      id,
      name,
      status: data
        ? taskContracts.Status.FINISH
        : taskContracts.Status.ON_GOING,
    });
  };

  const onDelete = () => {
    setDeleteTask(id);
  };

  return (
    <XStack justifyContent="space-around" alignItems="center" marginBottom={40}>
      <View width={"25%"}>
        <Text
          flex={2}
          color={"black"}
          fontWeight="bold"
          textDecorationLine={isChecked ? "line-through" : "none"}
          textAlign="center"
        >
          {name}
        </Text>
      </View>
      <View width={"25%"} alignContent="center" justifyContent="center">
        <Text
          flex={1}
          color={"black"}
          fontWeight="bold"
          textDecorationLine={isChecked ? "line-through" : "none"}
          textAlign="center"
        >
          {status ? "Completed" : "On going"}
        </Text>
      </View>

      <View width={"25%"} alignContent="center" justifyContent="center">
        <Controller
          control={form.control}
          name="status"
          render={({ field }) => (
            <Checkbox
              alignSelf="center"
              checked={field.value}
              onCheckedChange={(value) => {
                field.onChange(value);
                onSubmit(value as boolean);
              }}
            >
              <Checkbox.Indicator>
                <CheckIcon />
              </Checkbox.Indicator>
            </Checkbox>
          )}
        />
      </View>

      <View width={"25%"}>
        <Button onPress={onDelete} fontWeight="bold">
          Delete
        </Button>
      </View>
    </XStack>
  );
}
