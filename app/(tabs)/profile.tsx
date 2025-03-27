import { View, StyleSheet, Alert, Platform } from 'react-native';
import { WebView } from 'react-native-webview';

export default function Test() {

  const startLoad = () => { 
    Alert.alert('Loading', '开始加载');
  }
  const handleError = () => { 
    Alert.alert('Error', '请求超时');

  }

  if (Platform.OS === 'web') {
    return (
      <View style={styles.container}>
        <iframe
          src="https://profile.hongran.xyz/"
          style={styles.container}
        ></iframe>
      </View>
    )
  } else { 
    return (
      <View style={styles.container}>
        <WebView style={styles.container}
          source={{ uri: 'https://profile.hongran.xyz/' }}
          mixedContentMode='compatibility'
          onLoadStart={ startLoad}
          onError={handleError}
          javaScriptEnabled={true}
          mediaPlaybackRequiresUserAction={false}
          >
        </WebView>
      </View>
    )  
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    width: '100%',
    height: '100%',
  }
})