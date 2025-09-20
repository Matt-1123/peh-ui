import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import {useMutation} from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { registerUser } from '@/api/auth';


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
            // @ts-ignore
            if(data.code === 'ER_DUP_ENTRY') {
                console.log('error: ER_DUP_ENTRY. Add a message to the user.')
                toast.error('An account with this email address already exists.')
                return;
            }
            navigate({to: '/cleanups'});
            toast.success('User registration successful!');
            window.alert('User registered successfully')
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
