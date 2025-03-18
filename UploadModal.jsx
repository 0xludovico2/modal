import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  Text,
  StyleSheet,
  Keyboard,
  TextInput,
  Animated,
  SafeAreaView,
  Platform,
  InputAccessoryView,
} from 'react-native';
import { Camera, Image, X, Send, Paperclip } from 'react-native-feather';

const UploadModal = ({ visible, onClose, onSend }) => {
  const [message, setMessage] = useState('');
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const inputAccessoryViewID = "uniqueID";

  useEffect(() => {
    const keyboardWillShowListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      (e) => {
        setKeyboardVisible(true);
        setKeyboardHeight(e.endCoordinates.height);
      }
    );

    const keyboardWillHideListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
        setKeyboardHeight(0);
      }
    );

    return () => {
      keyboardWillShowListener.remove();
      keyboardWillHideListener.remove();
    };
  }, []);

  const handleSend = () => {
    if (message.trim()) {
      onSend(message);
      setMessage('');
    }
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  // Input toolbar component
  const renderInputToolbar = () => (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Add a caption..."
        value={message}
        onChangeText={setMessage}
        multiline
        maxLength={200}
        inputAccessoryViewID={Platform.OS === 'ios' ? inputAccessoryViewID : undefined}
      />
      <TouchableOpacity 
        style={[
          styles.sendButton, 
          { opacity: message.trim() ? 1 : 0.5 }
        ]} 
        onPress={handleSend}
        disabled={!message.trim()}
      >
        <Send width={24} height={24} color="#FFF" />
      </TouchableOpacity>
    </View>
  );

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.modalContainer}>
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={dismissKeyboard}
        >
          <View style={styles.modalContent}>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Upload File</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <X width={24} height={24} color="#000" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.uploadArea}>
              <TouchableOpacity style={styles.uploadButton}>
                <Paperclip width={24} height={24} color="#007AFF" />
                <Text style={styles.uploadText}>Select File</Text>
              </TouchableOpacity>
              
              <View style={styles.previewContainer}>
                {/* Preview would go here */}
                <View style={styles.previewPlaceholder}>
                  <Image width={32} height={32} color="#999" />
                  <Text style={styles.previewText}>Preview</Text>
                </View>
              </View>
            </View>
            
            {/* For Android, render the input toolbar at the bottom */}
            {Platform.OS === 'android' && renderInputToolbar()}
          </View>
        </TouchableOpacity>
      </SafeAreaView>

      {/* For iOS, use InputAccessoryView to ensure the input sticks to the keyboard */}
      {Platform.OS === 'ios' && (
        <InputAccessoryView nativeID={inputAccessoryViewID}>
          {renderInputToolbar()}
        </InputAccessoryView>
      )}
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '80%',
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 4,
  },
  uploadArea: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F8FF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  uploadText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
  },
  previewContainer: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    backgroundColor: '#F6F6F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  previewPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewText: {
    marginTop: 8,
    color: '#999',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#EFEFEF',
    backgroundColor: 'white',
    width: '100%',
  },
  input: {
    flex: 1,
    backgroundColor: '#F6F6F6',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: '#007AFF',
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
});

export default UploadModal;
