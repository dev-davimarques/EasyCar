import { ActivityIndicator, Alert, Text, TextInput, View } from "react-native";
import MyButton from "../../components/mybutton/mybutton.jsx";
import MapView, {Marker, PROVIDER_DEFAULT} from "react-native-maps";
import { styles } from "./passenger.style.js";
import { useEffect, useState } from "react";
import icons from "../../constants/icons.js";
import {getCurrentPositionAsync, requestForegroundPermissionsAsync, reverseGeocodeAsync} from "expo-location";

function Passenger(props){
    
    const userId = 1; // id. do usuario logado no app (vem do login)
    const [myLocation, setMyLocation] = useState({});
    const [title, setTitle] = useState("");
    // Endereço de retirada / Origem
    const [pickupAddress, setPickupAddress] = useState("");
    // Endereço de entrega / Destino
    const [dropoffAddress, setDropoffAddress] = useState("");
    const [status, setStatus] = useState("");
    const [rideId, setRideId] = useState(0);
    const [driverName, setDriverName] = useState("");

    async function RequestRideFromUser(){
        // Acessa dados na API...
        
        // Teste vazio
        // const response = {};

        // Teste com Status "P"
        // const response = {
        //     ride_id: 1,
        //     passenger_user_id: 1,
        //     passenger_name: "Heber Stein Mazutti",
        //     passenger_phone: "(11) 99999-9999",
        //     pickup_address: "Praça Charles Miller - Pacaembu",
        //     pickup_date: "2025-02-19",
        //     pickup_latitude: "-23.543132",
        //     pickup_longitude: "-46.665389",
        //     dropoff_address: "Shopping Center Norte",
        //     status: "P",
        //     driver_user_id: null,
        //     driver_name: null,
        //     driver_phone: null
        // }

        // Teste com Status "A"
        const response = {
            ride_id: 1,
            passenger_user_id: 1,
            passenger_name: "Heber Stein Mazutti",
            passenger_phone: "(11) 99999-9999",
            pickup_address: "Praça Charles Miller - Pacaembu",
            pickup_date: "2025-02-19",
            pickup_latitude: "-23.543132",
            pickup_longitude: "-46.665389",
            dropoff_address: "Shopping Center Norte",
            status: "A",
            driver_user_id: 2,
            driver_name: "João Martins",
            driver_phone: "(11) 5555-5555"
        }

        return response;
    };

    async function RequestPermissionAndGetLocation(){
        const {granted} = await requestForegroundPermissionsAsync();
        if (granted) {
            const currentPosition = await getCurrentPositionAsync();
            if(currentPosition.coords){
                return currentPosition.coords
            } else {
                return {};
            }
        } else {

        }
    }

    async function RequestAddressName(lat, long){
        const response = await reverseGeocodeAsync({
            latitude: lat,
            longitude: long
        });

        if (response[0].street && response[0].streetNumber && response[0].district){
            setPickupAddress(response[0].street + ", "+ response[0].streetNumber + " - "+ response[0].district);
        }
    }

    async function LoadScreen(){
        //buscar dado de corrida aberta na API para o usuario...
        const response = await RequestRideFromUser();

        if(!response.ride_id){
            const location = {latitude: -23.561747, longitude: -46.6562244}
            // const location = await RequestPermissionAndGetLocation();

            if(location.latitude){
                setTitle("Encontre a sua carona");
                setMyLocation(location);
                RequestAddressName(location.latitude, location.longitude);
            } else {
                Alert.alert("Não foi possível obter sua localização!");
            }

        } else {
            setTitle(response.status == "P" ? "Aguardando uma carona..." : "Carona confirmada");
            setMyLocation({
                latitude: Number(response.pickup_latitude),
                longitude: Number(response.pickup_longitude)
            });
            setPickupAddress(response.pickup_address);
            setDropoffAddress(response.dropoff_address);
            setStatus(response.status);
            setRideId(response.ride_id);
            setDriverName(response.driver_name + " - " + response.driver_phone);
        }
    };

    async function AskForRide(){
        const json = {
            passenger_id: userId,
            pickup_address: pickupAddress,
            dropoff_address: dropoffAddress,
            pickup_latitude: myLocation.latitude,
            pickup_longitude: myLocation.longitude
        }

        console.log("Fazer POST para o servidor: ", json);

        props.navigation.goBack();
    };

    async function CancelRide(){
        const json = {
            passenger_user_id: userId,
            ride_id: rideId
        };

        console.log("Cancelar carona",json);
        props.navigation.goBack();
    };

    async function FinishRide(){
        const json = {
            passenger_user_id: userId,
            ride_id: rideId
        };

        console.log("Finalizar carona",json);
        props.navigation.goBack();
    };

    useEffect(() => {
        LoadScreen();
    }, []);
    
    return (
        <View style={styles.container}>
            {
            myLocation.latitude ? <>
            <MapView style={styles.map} provider={PROVIDER_DEFAULT} 
                initialRegion={{
                    latitude: myLocation.latitude, 
                    longitude: myLocation.longitude,
                    latitudeDelta: 0.004,
                    longitudeDelta: 0.004
                    }}>

                        <Marker coordinate={{
                            latitude: myLocation.latitude, 
                            longitude: myLocation.longitude}}
                            
                            title="Crateús-CE"
                            description="Crateús é um município brasileiro do estado do Ceará, na Região Nordeste."
                            image={icons.location}
                            style={styles.marker}
                    />
            </MapView>

            <View style={styles.footer}>

                <View style={styles.footerText}>
                    <Text>{title}</Text>
                </View>

                {/* Campo de Oigem na Tela de Passageiros */}
                <View style={styles.footerFields}>
                    <Text>Origem</Text>
                    <TextInput style={styles.input} value={pickupAddress} 
                    onChangeText={(text) => setPickupAddress(text)} editable={status == "" ? true : false}/>
                </View>
                
                {/* Campo de Destino da Tela de Passageiros */}
                <View style={styles.footerFields}>
                    <Text>Destino</Text>
                    <TextInput style={styles.input} value={dropoffAddress} 
                    onChangeText={(text) => setDropoffAddress(text)} editable={status == "" ? true : false}/>
                </View>

                {
                    status == "A" &&    <View style={styles.footerFields}>
                                            <Text>Motorista</Text>
                                            <TextInput style={styles.input} value={driverName} 
                                            editable={false}/>
                                        </View>
                }
                

            </View>

            {status == "" && <MyButton text="CONFIRMAR" theme = "default" onClick={AskForRide}/>}
            {status == "P" && <MyButton text="CANCELAR" theme = "red" onClick={CancelRide}/>}
            {status == "A" && <MyButton text="FINALIZAR CARONA" theme = "red" onClick={FinishRide}/>}
            
            </> : <View style={styles.loading}>
                    <ActivityIndicator size="large"/>
                </View>}
        </View>
    );
}

export default Passenger;