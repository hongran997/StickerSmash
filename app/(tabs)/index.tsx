import { StyleSheet, Platform, View } from 'react-native';
import ImageView from '@/components/ImageViewer';
import Button from '@/components/Button';
import CircleButton from '@/components/CircleButton';
import IconButton from '@/components/IconButton';
import EmojiPicker from '@/components/EmojiPicker';
import EmojiList from '@/components/EmojiList';
const PlaceholderImage = require('@/assets/images/background-image.png');
import * as ImagePicker from 'expo-image-picker';
import { type ImageSource } from 'expo-image';
import { useState, useRef } from 'react';
import EmojiSticker from '@/components/EmojiSticker';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as MediaLibrary from 'expo-media-library';
import { captureRef } from 'react-native-view-shot';
import domtoimage from 'dom-to-image';


export default function HomeScreen() {

  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [pickedEmoji, setPickedEmoji] = useState<ImageSource | undefined>(undefined);
  const [permission, requestPermission] = MediaLibrary.usePermissions();
  const imageRef = useRef<View>(null);

  if (permission == null) { 
    requestPermission();
  }
  const pickImageAsync = async () => { 
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    })
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    } else { 
      console.log('User cancelled image picker');
    }
  }

  const onReset = () => { 
    setShowAppOptions(false);
  }

  const onAddSticker = () => { 
    setIsModalVisible(true);
  }

  const onSaveImageAsync = async () => {
    if (Platform.OS !== 'web') {
      try {
        const localUri = await captureRef(imageRef, {
          height: 440,
          quality: 1,
        });

        await MediaLibrary.saveToLibraryAsync(localUri);
        if (localUri) {
          alert('Saved!');
        }
      } catch (e) {
        console.log(e);
      }
    } else { 
      try {
        const dataUrl = await domtoimage.toJpeg(imageRef.current, {
          quality: 0.8,
          width: 320,
          height: 440,
        });
        let link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'sticker-smash.jpg';
        link.click();
      } catch (e) { 
        console.log(e);
      }
    }
    
  };

  const onModalClose = () => { 
    setIsModalVisible(false);
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <View ref={imageRef} collapsable={false}>
            <ImageView imgProps={PlaceholderImage} selectedImage={selectedImage} />
            {  pickedEmoji && <EmojiSticker imageSize={40} stickerSource={pickedEmoji}/> }
          </View> 
          </View>
          { 
            showAppOptions
              ? (
                <View style={styles.optionsContainer}>
                  <View style={ styles.optionsRow}>
                    <IconButton icon="refresh" label="Reset" onPress={ onReset} />
                    <CircleButton onPress={onAddSticker}/>
                    <IconButton icon="save-alt" label="Save"  onPress={ onSaveImageAsync } />
                  </View>
                </View>
              )
              : (
              <View style={styles.footerContainer}>
                <Button label="Choose a photo" theme='primary' onPress={ pickImageAsync } />
                <Button label="Take a photo" onPress={ ()=> setShowAppOptions(true) } />
              </View>
            )
          }
          <EmojiPicker isVisible={isModalVisible } onClose={ onModalClose } >
            <EmojiList  onCloseModal={onModalClose} onSelect={setPickedEmoji}/>
          </EmojiPicker>
          
          
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#25292e',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 1,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 80
  },
  optionsRow: {
    flexDirection: 'row',
  }
});
