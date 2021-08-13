import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons'
import { StatusBar } from 'react-native'

import { navigationRef } from './services/navigation'
import { colors } from './data/theme.json'

import Tour from './pages/Tour'
import Login from './pages/Login'
import Home from './pages/Home'
import Payment from './pages/Payment'
import Timer from './pages/Timer'
import Ranking from './pages/Ranking'
import Balance from './pages/Balance'


const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

const HomeTabs = () => {
    return (
        <Tab.Navigator 
            tabBarOptions={{
                style: {
                    backgroundColor: colors.dark,
                    borderTopWidth: 0
                },
                activeTintColor: colors.light
            }}
        >
            <Tab.Screen 
                options={{
                    headerShown: false,
                    tabBarLabel: "Desafio",
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="calendar-check" color={color} size={size} />
                    )
                }}
                name="Home"
                component={Home}
            />

            <Tab.Screen 
                options={{
                    headerShown: false,
                    tabBarLabel: "Ranking",
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="account-group" color={color} size={size} />
                    )
                }}
                name="Ranking"
                component={Ranking}
            />

            <Tab.Screen 
                options={{
                    headerShown: false,
                    tabBarLabel: "Saldo",
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="cash" color={color} size={size} />
                    )
                }}
                name="Saldo"
                component={Balance}
            />


        </Tab.Navigator>
    )
}



const Routes = () => {
    return (
        <>
            <StatusBar backgroundColor={colors.dark} />
            <NavigationContainer ref={navigationRef}>
                <Stack.Navigator initialRouteName="Tour">
                    <Stack.Screen 
                        options={{ headerShown: false }}
                        name="Home"
                        component={HomeTabs}
                    />

                    <Stack.Screen 
                        options={{ headerShown: false }}
                        name="Tour"
                        component={Tour}
                    />

                    <Stack.Screen 
                        options={{ headerShown: false }}
                        name="Login"
                        component={Login}
                    />

                </Stack.Navigator>

            </NavigationContainer>
        </>
    )
}

export default Routes