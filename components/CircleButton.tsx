import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialIcons} from '@expo/vector-icons'

type Props = {
  onPress: () => void;
}

export default function CircleButton({ onPress}: Props) { 
  return (
    <View style={styles.circleButtonContainer}>
      <Pressable style={ styles.circleButton} onPress={onPress}>
          <MaterialIcons name='add' size={40} color='#ffd33d' />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  circleButtonContainer: {
    width: 84, 
    height: 84,
    borderRadius: 42,
    marginHorizontal: 60,
    borderWidth: 4,
    borderColor: '#ffd33d',
    padding: 3,
  },
  circleButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 42,
    backgroundColor: '#fff',
  } 
})