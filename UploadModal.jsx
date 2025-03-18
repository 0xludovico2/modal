import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  Text,
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Dimensions,
  Animated,
  SafeAreaView,
} from 'react-native';
import { Camera, Image, X, Send, Paperclip } from 'react-native-feather';

const UploadModal = ({ visible, onClose, onSend }) => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [message, setMessage] = useState('');
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const bottomPosition = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const keyboardWillShowListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      (e) => {
        setKeyboardVisible(true);
        setKeyboardHeight(e.endCoordinates.height);
        Animated.timing(bottomPosition, {
          toValue: e.endCoordinates.height,
          duration: 250,
          useNativeDriver: false,
        }).start();
      }
    );

    const keyboardWillHideListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
        setKeyboardHeight(0);
        Animated.timing(bottomPosition, {
          toValue: 0,
          duration: 250,
          useNativeDriver: false,
        }).start();
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
            
            {/* This is the bottom toolbar that will move with the keyboard */}
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={styles.keyboardAvoidingView}
              keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}
            >
              <Animated.View 
                style={[
                  styles.inputContainer,
                  { bottom: isKeyboardVisible ? keyboardHeight : 0 }
                ]}
              >
                <TextInput
                  style={styles.input}
                  placeholder="Add a caption..."
                  value={message}
                  onChangeText={setMessage}
                  multiline
                  maxLength={200}
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
              </Animated.View>
            </KeyboardAvoidingView>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
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
  keyboardAvoidingView: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#EFEFEF',
    backgroundColor: 'white',
    position: 'absolute',
    left: 0,
    right: 0,
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