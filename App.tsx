import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Platform, StatusBar, StyleSheet, SafeAreaView } from 'react-native';
import TestScreen from './screens/Test';
import GyroNavigation from './screens/GyroNavigation';
const Stack = createStackNavigator();
import colors from './style/colors';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <GyroNavigation />
      {/* {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Hello" component={TestScreen} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.backgroundDark
  },
});
