
import { View, StyleSheet, Alert } from 'react-native';
import LocalWebView from '@/components/LocalWebView';

export default function About() {

  const handleMessage = (message: string) => { 
    Alert.alert('收到消息', message);
  }

  return (
    <View style={styles.container}>
      <LocalWebView onMessage={handleMessage}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#25292e',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
  }
});
