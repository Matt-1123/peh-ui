import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import {useMutation} from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { registerUser } from '@/api/auth';
import { AxiosError } from 'axios' 


export const Route = createFileRoute('/signup/')({
  component: SignupComponent,
})

function SignupComponent() {
    const navigate = useNavigate();
      
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const { mutateAsync, isPending } = useMutation({
        mutationFn: registerUser,
        onSuccess: (data) => {
            console.log('registerUser data: ', data);
            navigate({to: '/cleanups'});
            toast.success('User registration successful!');
        },
        onError: (err) => {
            if (err instanceof AxiosError) {
                if (err.response?.status === 409) {
                    if(err.response.data.message === 'Username is taken') {
                        toast.error('This username is taken.')
                        return;
                    } else {
                        toast.error('An account with this email address already exists.')
                    }
                }
            } else {
                console.log('Unexpected error', err)
                toast.error('An error has occurred. Please try again.')
            }
        }
    });
    
    const submitForm = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error('Please fill in all required fields.');
            window.alert('Please fill in all required fields')
            return;
        }

        if (password.length < 8) {
            toast.error('Password must be at least 8 characters.');
            window.alert('Password must be at least 8 characters.')
            return;
        }

        try {
            await mutateAsync({
                email,
                password,
                username
            });
        } catch (error) {
            console.log('Error: ', error)
        }
    }
  
  return <div className='backgroundImage'>
    <form className="authForm bg-dark" onSubmit={submitForm}>
        <h1>Sign Up</h1>
      
        <div className="form-group">
            <label htmlFor="name">Username</label>
            <input
                id="name"
                type="text"
                name="name"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
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
            //   disabled={isPending}
                className="mt-2 btn btn-primary--dark btn-block"
            />
        </div>

        <p className="font-sm">* required</p>
        <p className="my-2">Already have an account? <Link to="/login">Login</Link></p>
    </form>
  </div>
}
