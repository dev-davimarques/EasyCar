import { Alert, Image, ImageBackground, Text, TouchableOpacity } from "react-native";
import icons from "../../constants/icons";
import {styles} from "./home.style.js";

function Home(props){

    function OpenPassenger(){
        // Alert.alert("Abrir tela de passageiros...");
        props.navigation.navigate("passenger");
    }
    function OpenRide(){
        Alert.alert("Abrir tela de motoristas...");
        // props.navigation.navigate("passenger");
    }

    return(
        <>
            <ImageBackground source={icons.bg} resizeMode="cover" 
            style={styles.bg}>

                {/* Logo EasyCar */}
                <Image source={icons.logo}
                    style={styles.logo}
                />

                {/* Botão de Passageiro */}
                <TouchableOpacity style={styles.btn} onPress={OpenPassenger}>
                    <Image source={icons.passeger}
                        style={styles.img}/>
                    <Text style={styles.title}>Passageiro</Text>
                    <Text style={styles.text}>Encontre uma carona pra você</Text>
                </TouchableOpacity>

                {/* Botão de Motorista */}
                <TouchableOpacity style={styles.btn} onPress={OpenRide}>
                    <Image source={icons.driver}
                        style={styles.img}/>
                    <Text style={styles.title}>Motorista</Text>
                    <Text style={styles.text}>Ofereça carona em seu carro</Text>
                </TouchableOpacity>

            </ImageBackground>
        </>
    )
}

export default Home;