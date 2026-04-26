import { useContext, useState } from "react"
import {useForm} from 'react-hook-form'
import { AuthContext } from "../context/AuthContext";

export default function Auth() {
    const [mode, setMode] = useState('signup');
    const [error, setError] = useState(null)

    const {signup, user, logout, login} = useContext(AuthContext)

    const {
        register,
        handleSubmit,
        formState : {errors}
    } = useForm();

    const onSubmit = (data) => {
        let result;
        if(mode == 'signup') {
            result = signup(data.email, data.password)
        } else {
            result = login(data.email, data.password)
        }

        if(result.success) {
            alert('logged in');
        } else {
            setError(result.error)
        }
        
    }

    return (
        <div className="page">
            <div className="container">
                <div className="auth-container">
                    {user && <p>User has logged in {user.email} - <span onClick={logout} className="auth-link">Logout?</span></p>}
                    {error && <p className="error-message">{error}</p>}
                    <h1 className="page-title">{mode === 'signup' ? "Sign Up" : "Login"}</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="auth-form">

                        <div className="form-group">
                            <label htmlFor="Email" className="form-label">Email</label>
                            <input 
                                type="email" 
                                className="form-input" 
                                id="email"
                                {...register("email", {required: "Email is required"})}
                            />
                            {errors.email && <p className="form-error">{errors.email.message}</p>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="Password" className="form-label">Password</label>
                            <input type="password" className="form-input" id="password" 
                            {...register("password",
                             {
                                required: "Password is required",
                                minLength : {
                                    value : 3,
                                    message : "Password must b atleast 3 Characters"
                                }
                                })}/>
                            {errors.password && <p className="form-error">{errors.password.message}</p>}
                        </div>

                        <button type="submit" className="btn btn-primary btn-large">{mode === 'signup' ? "Sign Up" : "Login"}</button>
                    </form>

                    <div className="auth-switch">
                        {mode === 'signup' 
                        ? 
                        <p>You already have an account? <span className="auth-link" onClick={() => setMode("login")}>Login</span></p> 
                        : 
                        <p>You don't have an account? <span className="auth-link" onClick={() => setMode("signup")}>Sign Up</span></p>
                        }
                        
                    </div>
                </div>
            </div>
        </div>
    )
}