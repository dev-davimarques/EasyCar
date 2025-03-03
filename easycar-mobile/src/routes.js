import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importando minhas telas
import Home from "./screens/home/home";
import Passenger from "./screens/passenger/passenger";
import Ride from "./screens/ride/ride";
import RideDetail from "./screens/ride-detail/ride-detail";

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

                    {/* Tela de Motoristas */}
                    <Stack.Screen name="ride" component={Ride}
                    options={{
                        headerTitle: "Viagens Disponíveis",
                        headerTitleAlign: "center"
                    }}/>

                    {/* Tela de Detalhe dos Motoristas */}
                    <Stack.Screen name="ride-detail" component={RideDetail}
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