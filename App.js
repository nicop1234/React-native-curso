/** @format */
import { LogBox } from "react-native";
import { AppNavigations } from "./src/navigation/AppNavigation";
import { NavigationContainer } from "@react-navigation/native"
import Toast  from "react-native-toast-message";
import { initFirebase } from "./src/utils";

LogBox.ignoreAllLogs()
export default function App() {
  return (
    <>
      <NavigationContainer>
        <AppNavigations />
      </NavigationContainer>

      <Toast/>
    </>
  );
}
