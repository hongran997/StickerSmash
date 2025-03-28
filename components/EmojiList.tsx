import { FlatList, Pressable, StyleSheet, Platform } from 'react-native';
import { Image, type ImageSource } from 'expo-image';
import { useState } from 'react';

type Props = {
  onSelect: (iamge: ImageSource) => void,
  onCloseModal: () => void
}
export default function EmojiList({ onSelect, onCloseModal }: Props) { 

  const [emoji] = useState<ImageSource[]>([
    require('@/assets/images/emoji1.png'),
    require('@/assets/images/emoji2.png'),
    require('@/assets/images/emoji3.png'),
    require('@/assets/images/emoji4.png'),
    require('@/assets/images/emoji5.png'),
    require('@/assets/images/emoji6.png'),
  ])
  
  return (
    <FlatList
      data={emoji}
      renderItem={({ item, index }) => (
        <Pressable onPress={() => {
            onSelect(item),
            onCloseModal()
        }}>
          <Image source={item} key={index} style={styles.image}></Image>
        </Pressable>
      )}
      horizontal
      contentContainerStyle={styles.listContainer}
      showsHorizontalScrollIndicator={Platform.OS === 'web'}
    >
    </FlatList>
  )
}


const styles = StyleSheet.create({
  listContainer: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 20,
  }
})