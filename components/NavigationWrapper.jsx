import React from 'react';
import {Image, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ListScreen from './ListScreen';
import DetailScreen from './DetailScreen';
import NavigationItems from './NavigationItems';

const Stack = createNativeStackNavigator();

// Wrapper Component for the navigation
const NavigationWrapper = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={ListScreen}
          initialParams={{searchString: ''}}
          options={{
            headerTitle: () => (
              <Text
                style={{
                  color: 'black',
                  fontSize: 20,
                  textAlignVertical:"center"
                }}>
                Shopping
              </Text>
            ),
            headerStyle: {
              backgroundColor: '#00CCCD',
            },

            headerTitleStyle: {
              fontWeight: '800',
            },
          }}
        />
        <Stack.Screen
          name="DetailScreen"
          component={DetailScreen}
          options={({route}) => ({title: route.params.item.title})}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigationWrapper;
