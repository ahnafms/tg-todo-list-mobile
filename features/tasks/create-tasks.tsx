import React from "react";
import { Button, View, Text, Input } from "tamagui";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import { tasksAtom } from "@/stores/tasks";
import { randomUUID } from "expo-crypto";
import { taskContracts, taskTypes } from "@/entities/task";

export const CreateTask = () => {
  const [tasks, setTasks] = useAtom(tasksAtom);

  const form = useForm<taskTypes.Task>({
    resolver: zodResolver(taskContracts.TaskSchema),
    defaultValues: {
      id: "",
      name: "",
      status: taskContracts.Status.ON_GOING,
    },
  });

  const onSubmit = (data: taskTypes.Task) => {
    setTasks([...tasks, { ...data, id: randomUUID() }]);
  };

  return (
    <View style={{ padding: 20, width: "100%" }}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          marginBottom: 10,
          color: "black",
        }}
      >
        Create Task
      </Text>
      <Controller
        control={form.control}
        name="name"
        render={({ field }) => (
          <View style={{ marginBottom: 20 }}>
            <Text style={{ marginBottom: 5, color: "black" }}>Task Name</Text>
            <Input
              placeholder="running"
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              value={field.value}
              style={{
                height: 44,
                borderColor: "gray",
                borderWidth: 1,
                paddingHorizontal: 10,
              }}
            />
            {form.formState.errors.name && (
              <Text style={{ color: "red" }}>
                {form.formState.errors.name.message}
              </Text>
            )}
          </View>
        )}
      />
      <Button onPress={form.handleSubmit(onSubmit)}>Submit</Button>
    </View>
  );
};
