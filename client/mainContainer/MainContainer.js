import React from "react";

import { AuthProvider } from "../context/AuthContext";
import { View } from "react-native";
import MainNav from "./MainNav";

function MainContainer() {
  return (
    <AuthProvider>
      <MainNav />
    </AuthProvider>
  );
}
export default MainContainer;
