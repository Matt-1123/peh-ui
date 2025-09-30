import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import {useMutation} from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { loginUser } from '@/api/auth';
import { AxiosError } from 'axios';
import { useAuth } from '@/context/AuthContext';

export const Route = createFileRoute('/login/')({
  component: LoginComponent,
})

function LoginComponent() {
    const navigate = useNavigate();
    const { setAccessToken, setUser } = useAuth();
      
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const { mutateAsync, isPending } = useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {
            // @ts-ignore
            setAccessToken(data.accessToken);
            // @ts-ignore
            setUser(data.user);
            navigate({to: '/'});
            toast.success('Login successful!');
        },
        onError: (err) => {
            console.log('loginUser error data: ', err)
            if (err instanceof AxiosError) {
                if (err.response?.status === 401) {
                    toast.error('Invalid credentials. Please try again.')
                    return;
                }
            } else {
                toast.error('An error has occurred. Please try again.')
            }
        }
    });
    
    const submitForm = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error('Please fill in all required fields.');
            return;
        }

        try {
            await mutateAsync({
                email,
                password
            });
        } catch (error) {
          console.error(error)
        }
    }
  
  return <div className='backgroundImage'>
    <form className="authForm bg-dark" onSubmit={submitForm}>
        <h1>Login</h1>
      
        <div className="form-group">
            <label htmlFor="email">Email*</label>
            <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <label htmlFor="password">Password*</label>
            <input
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
        </div>

        <div>
            <input
                type="submit"
                value="Submit"
                disabled={isPending}
                className="mt-2 btn btn-primary--dark btn-block"
            />
        </div>

        <p className="font-sm">* required</p>
        <p className="my-2">Don't have an account? <Link to="/signup">Register</Link></p>
    </form>
  </div>
}
