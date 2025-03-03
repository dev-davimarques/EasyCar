import { Text, TextInput, View } from "react-native";
import MyButton from "../../components/mybutton/mybutton.jsx";
import MapView, {Marker, PROVIDER_DEFAULT} from "react-native-maps";
import { styles } from "./ride-detail.style.js";
import { useState } from "react";
import icons from "../../constants/icons.js";

function RideDetail(props){
    
    const [myLocation, setMyLocation] = useState({
        latitude: 20,
        longitude: 20
    });
    
    return (
        <View style={styles.container}>
            <MapView style={styles.map} provider={PROVIDER_DEFAULT} 
            initialRegion={{
                latitude: -5.17817, 
                longitude: -40.67054,
                latitudeDelta: 0.08,
                longitudeDelta: 0.08
                }}>

                    <Marker coordinate={{
                        latitude: -5.17817, 
                        longitude: -40.67054}}
                        
                        title="Crateús-CE"
                        description="Crateús é um município brasileiro do estado do Ceará, na Região Nordeste."
                        image={icons.location}
                        style={styles.marker}
                    />
            </MapView>

            <View style={styles.footer}>

                <View style={styles.footerText}>
                    <Text>Encontre a sua carona</Text>
                </View>

                {/* Campo de Oigem na Tela de Passageiros */}
                <View style={styles.footerFields}>
                    <Text>Origem</Text>
                    <TextInput style={styles.input}/>
                </View>
                
                {/* Campo de Destino da Tela de Passageiros */}
                <View style={styles.footerFields}>
                    <Text>Destino</Text>
                    <TextInput style={styles.input}/>
                </View>

            </View>

            <MyButton text="Aceitar" />
        </View>
    );
}

export default RideDetail;