import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from "./screens/home/home";
import Passenger from "./screens/passenger/passenger";

const Stack = createNativeStackNavigator();

function Routes(){
    return(
        <>
            <NavigationContainer>
                <Stack.Navigator>
                    {/* Tela de Home */}
                    <Stack.Screen name="home" component={Home}
                        options={{
                            headerShown: false
                    }}/>

                    {/* Tela de Passageiros */}
                    <Stack.Screen name="passenger" component={Passenger}
                    options={{
                        headerShadowVisible: false,
                        headerTitle: "",
                        headerTransparent: true
                    }}/>
                </Stack.Navigator>
            </NavigationContainer>
        </>
    )
}

export default Routes;