### Key Features

1. **Bottom Toolbar Positioning**:

The toolbar is positioned at the bottom of the screen when the keyboard is not visible
Uses `position: 'absolute'` with `bottom: 0` when keyboard is hidden



2. **Keyboard Awareness**:

Uses Keyboard API listeners to detect when the keyboard appears/disappears

Animates the toolbar to position it above the keyboard when it appears



3. **Dynamic Positioning**:

Gets the keyboard height from the keyboard event (`e.endCoordinates.height`)

Uses `Animated` API to smoothly transition the toolbar position

Works across different screen sizes and orientations



4. **Additional Features**:

Includes a text input for captions

Has a send button that activates when text is entered

Provides a placeholder for file previews

Includes a proper modal header with close button

Uses `KeyboardAvoidingView` for additional positioning support
