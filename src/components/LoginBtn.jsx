import React, {useEffect} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { setSession, clearSesssion } from "../features/auth/authSlice";

const LoginButton = () => {
    const { loginWithRedirect, isAuthenticated, user, getAccessTokenSilently } = useAuth0();
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.auth.user);
    const setAuth = async () => {
        if(isAuthenticated) {
            const token = await getAccessTokenSilently();
            console.log(user);
            console.log(token)
            dispatch(setSession({isAuthenticated, user, token}));
        } else {
            dispatch(clearSesssion());
        }
    }

    useEffect(() => {
        setAuth();
    }, [isAuthenticated, user, getAccessTokenSilently, dispatch]);

    if(isAuthenticated && sessionUser) {
        return <span>{sessionUser.name}</span>
    }
    return <button onClick={() => loginWithRedirect()}>Log In</button>;
};

export default LoginButton;