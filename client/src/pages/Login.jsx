import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../api/auth';

export default function Login() {
    const [formData, setFormData] = useState({ identifier: '', password: '' });
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.identifier.trim()) {
            newErrors.identifier = 'Identifier is required';
        }
        if (!formData.password) {
            newErrors.password = 'Password is required';
        }
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validate();
        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            return;
        }

        setServerError('');
        
        try {
            setLoading(true);
            await login(formData);
            navigate('/');
        } catch (err) {
            setServerError(
                err.response?.data?.message || 'Login failed. Please try again.'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} noValidate>
            <h1>Login</h1>

            <div>
                <label htmlFor="identifier">Username or email</label>
                <input
                    id="identifier"
                    name="identifier"
                    type="text"
                    value={formData.identifier}
                    onChange={handleChange}
                    autoComplete="username"
                    aria-invalid={Boolean(errors.identifier)}
                    aria-describedby={errors.identifier ? 'identifier-error' : undefined}
                />
                {errors.identifier && (
                    <p id="identifier-error" role="alert">
                        {errors.identifier}
                    </p>
                )}
            </div>

            <div>
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                    aria-invalid={Boolean(errors.password)}
                    aria-describedby={errors.password ? 'password-error' : undefined}
                />
                {errors.password && (
                    <p id="password-error" role="alert">
                        {errors.password}
                    </p>
                )}
            </div>

            {serverError && <p role="alert">{serverError}</p>}

            <button type="submit" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
            </button>

            <p>
                Don't have an account? <Link to="/register">Register</Link>
            </p>
        </form>
    );
}