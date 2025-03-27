
import { Tabs } from 'expo-router';
import { Ionicons, AntDesign } from '@expo/vector-icons';

export default function Layout() { 
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: '#ffd33d',
      headerStyle: { backgroundColor: '#25292e' },
      headerShadowVisible: false,
      headerTintColor: '#fff',
      tabBarStyle: { backgroundColor: '#25292e' },
    }}>
      <Tabs.Screen name="index" options={{
        title: 'Home',
        tabBarIcon: ({ color, focused }) =>
          (<Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />)
      }} />
      <Tabs.Screen name="about" options={{
        title: 'About',
        tabBarIcon: ({ color, focused }) => (
          <AntDesign name='HTML'  color={color} size={24} />
        )
       }} /> 
      <Tabs.Screen name="profile" options={{
        title: 'profile',
        tabBarIcon: ({ color, focused }) => (
          <AntDesign name="profile" color={color} size={24}/>
        )
      }} />
    </Tabs>
  );
}