
import {AuthProvider} from "../context/AuthContext";
import MainNav from "./MainNav";



function MainContainer() {
    return(
        <AuthProvider>
           <MainNav/>
        </AuthProvider>
    );
}
export default MainContainer