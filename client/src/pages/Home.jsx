import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../api/auth';
import Button from '../components/Button';
import './Home.css';

export default function Home() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            setLoading(true);
            await logout();
        } finally {
            setLoading(false);
            navigate('/login', { replace: true });
        }
    };

    return (
        <main className="home">
            <h1 className="home-title">Calendar</h1>
            <Button type="button" loading={loading} loadingText="Logging out..." onClick={handleLogout}>
                Log out
            </Button>
        </main>
    );
}