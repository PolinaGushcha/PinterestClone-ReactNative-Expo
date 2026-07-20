import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { AuthNavigation } from './src/router';
import DataContextProvider from './src/contexts/DataContextProvider';

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <DataContextProvider>
          <AuthNavigation />
        </DataContextProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
