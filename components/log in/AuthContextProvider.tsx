import AuthContext from "./AuthContext";
import { PropsWithChildren, useState } from "react";

function AuthContextProvider(props: PropsWithChildren<any>) {
  const [mobile, setMobile] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [hasAccount, setHasAccount] = useState<boolean>(false);
  const [step, setStep] = useState("");
  const [role, setRole] = useState(0);
  const [redirectFrom, setRedirectFrom] = useState("login");

  return (
    <AuthContext.Provider
      value={{
        mobile,
        setMobile,
        id,
        setId,
        hasAccount,
        setHasAccount,
        step,
        setStep,
        redirectFrom,
        setRedirectFrom,
        role,
        setRole,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
export default AuthContextProvider;
