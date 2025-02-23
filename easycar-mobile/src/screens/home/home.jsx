import { Image, ImageBackground, Text } from "react-native";
import icons from "../../constants/icons";

function Home(){

    return(
        <>
            <ImageBackground source={icons.bg} resizeMode="cover" 
            style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center"
            }}>

            <Image source={icons.logo}/>

            </ImageBackground>
        </>
    )
}

export default Home;