import { createContext, Dispatch } from "react";
type Props = {
  mobile: string;
  setMobile: Dispatch<string>;
  id: string;
  setId: Dispatch<string>;
  hasAccount: boolean;
  setHasAccount: Dispatch<boolean>;
  step: string;
  setStep: Dispatch<string>;
  redirectFrom: string;
  setRedirectFrom: Dispatch<string>;
  role: number;
  setRole: Dispatch<number>;
};
const AuthContext = createContext<Partial<Props>>({
  mobile: "",
  id: "",
  hasAccount: false,
  step: "",
  role: 0,
});
export default AuthContext;
