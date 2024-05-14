import React, { useState } from 'react';
import axios from 'axios';

const Subscribe: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    const handleSubscribe = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:4200/subscribe', { email, firstName, lastName });
            setMessage(response.data);
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                setMessage(error.response.data);
            } else {
                setMessage('Server error');
            }
        }
    };

    return (
        <div>
            <h2>Subscribe</h2>
            <form onSubmit={handleSubscribe}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>First Name:</label>
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <button type="submit">Subscribe</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Subscribe;
