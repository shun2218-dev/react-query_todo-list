import { lazy, useCallback, useEffect } from "react";
import "./styles/app.css";
import { onIdTokenChanged } from "firebase/auth";
import { auth } from "./utils/firebase";
import { useStore } from "./store";
import { Asynchronous } from "./components/Asynchronous";
import { Center } from "@mantine/core";
// import Auth from "./components/Auth";
const Auth = lazy(async () => await import("./components/Auth"));
// import { DashBoard } from "./components/DashBoard";
const DashBoard = lazy(async () => await import("./components/DashBoard"));

function App() {
  const session = useStore((state) => state.session);
  const _setSession = useStore((state) => state.setSession);
  const setSession = useCallback(async () => {
    const user = auth.currentUser;
    if (user !== null) {
      _setSession(user);
    } else {
      _setSession(null);
    }
  }, [_setSession]);

  useEffect(() => {
    setSession();
    onIdTokenChanged(auth, async (user) => {
      _setSession(user);
    });
  }, [_setSession]);
  return (
    <Center h="100%">
      <Asynchronous>{!session ? <Auth /> : <DashBoard />}</Asynchronous>
    </Center>
  );
}

export default App;
