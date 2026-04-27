import { createContext, useContext, useState } from "react";

export const AuthContext = createContext(null);

export default function AuthProvider({children}) {

    const [user, setUser] = useState(
        localStorage.getItem("currentUser") ? {email : localStorage.getItem("currentUser")} : null
    );

    const [mode, setMode] = useState('login');

    const changeMode = () => {
        mode == 'login' ? setMode('signup') : setMode('login')
    }

    const signup = (email, password) => {
        
        const users = JSON.parse(localStorage.getItem("users")) || [];
        

        if(users.find((u) => u.email === email)) {
            return {success : false, error : "Email already exists!"}
        }
        
        const newUser = {email, password};
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("currentUser", email)

        setUser({email});

        return {success : true}
    }

    const login = (email, password) => {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        
        const loginUser = users.find((u) => u.email === email && u.password === password);

        if(!loginUser) {
            return {success : false, error : "Invalid Credentials"}
        }

        localStorage.setItem("currentUser", email)
        setUser({email})

        return {success: true}
    }

    const logout = () => {
        localStorage.removeItem("currentUser");
        setUser(null)
        return {success : true}
    }
    
    return (
        <AuthContext.Provider value={{signup, user, logout, login, mode, changeMode}}>{children}</AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext);
    return context
}