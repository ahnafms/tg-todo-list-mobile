# To-do List Mobile App

This is a To-do list mobile application built with React Native. It allows users to create, edit, and delete tasks, providing a clean and responsive user interface. The app utilizes Tamagui for UI components, Jotai for state management, and follows a modular architecture to ensure scalability and maintainability.

## Project Structure

- **/app**: Entry point for the application, managing routes and pages.
- **/component**: Contains UI components. I use Tamagui for UI elements such as buttons and forms.
- **/config**: Stores library and framework configuration. This includes configuration for third-party libraries, constants, or environment-specific settings.
- **/features**: The controller for task data. This folder contains logic for creating, editing, and deleting tasks.
- **/entities**: Data models such as the Task entity, which includes properties like id, name.
- **/lib**: Stores reusable helper function.
- **/stores**: Manages the app's state using Jotai. It defines atoms to manage the global state of the app.

## Features

- **Create Task**: Allows users to add new tasks.
- **Edit Task**: Users can edit existing tasks.
- **Delete Task**: Each task has a delete button to remove it from the list.
- **Responsive Design**: The app works across different screen sizes, ensuring a consistent experience on both web and mobile.

## Technologies Used

- **React Native**: For building the user interface.
- **Tamagui**: For UI components such as buttons, forms, etc.
- **Jotai**: For state management.
- **Expo**: For cross-platform development tools and build
