import React from "react";
import Toast from "react-native-toast-message";
import AppNavigation from "./components/navigation";

export default function App() {
  return (
    <>
      <AppNavigation />
      <Toast />
    </>
  );
}