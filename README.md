### Key Features

1. **Bottom Toolbar Positioning**:

1. The toolbar is positioned at the bottom of the screen when the keyboard is not visible
2. Uses `position: 'absolute'` with `bottom: 0` when keyboard is hidden



2. **Keyboard Awareness**:

1. Uses Keyboard API listeners to detect when the keyboard appears/disappears
2. Animates the toolbar to position it above the keyboard when it appears



3. **Dynamic Positioning**:

1. Gets the keyboard height from the keyboard event (`e.endCoordinates.height`)
2. Uses `Animated` API to smoothly transition the toolbar position
3. Works across different screen sizes and orientations



4. **Additional Features**:

1. Includes a text input for captions
2. Has a send button that activates when text is entered
3. Provides a placeholder for file previews
4. Includes a proper modal header with close button
5. Uses `KeyboardAvoidingView` for additional positioning support
