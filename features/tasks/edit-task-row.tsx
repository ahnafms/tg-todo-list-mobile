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
      status: status === taskContracts.Status.FINISH,
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
          {status ? "Completed" : "On going"}
        </Text>
      </View>

      <View width="25%" justifyContent="center" alignItems="center">
        <Controller
          control={form.control}
          name="status"
          render={({ field }) => (
            <Checkbox
              checked={field.value}
              onCheckedChange={(value) => {
                field.onChange(value);
                onSubmit(value as boolean);
              }}
              size="$4"
            >
              <Checkbox.Indicator>
                <CheckIcon size={16} />
              </Checkbox.Indicator>
            </Checkbox>
          )}
        />
      </View>

      <View width="25%" justifyContent="center" alignItems="center">
        <Button onPress={onDelete} fontWeight="bold" size="$3">
          Delete
        </Button>
      </View>
    </XStack>
  );
}
