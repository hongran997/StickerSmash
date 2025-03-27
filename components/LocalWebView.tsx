import { WebView } from 'react-native-webview';
import { View, StyleSheet, Platform } from 'react-native';

type Props = {
  onMessage?:(message: string) => void
}

export default function LocalWebView({ onMessage }: Props) { 
  const source = Platform.select({
    android: { uri: 'file:///android_asset/webview.html' },
    ios: require('../assets/webview.html'),
    web: { uri: 'assets/webview.html' }
  })

  console.log('htmluri:' + JSON.stringify(source));

  if (Platform.OS === 'web') {
    return (
      <View style={styles.container}>
        <iframe
          src={source.uri}
          style={{ width: '100%', height: '100%', border: '1px solid red' }} />
      </View>
    )
  } else { 
    return (
    <View style={styles.container}>
      <WebView
        source={ source}
        style={styles.webview}
        onMessage={(event) => { 
          onMessage?.(event.nativeEvent.data);
        }}
        javaScriptEnabled={true}
      ></WebView>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  webview: {
    flex: 1,
  }
})