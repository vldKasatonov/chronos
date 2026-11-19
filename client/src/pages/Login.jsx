import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../api/auth';
import AuthLayout from '../components/AuthLayout';
import Input from '../components/Input';
import Button from '../components/Button';

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
            newErrors.identifier = 'Login or email is required';
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
            await login({ ...formData, identifier: formData.identifier.trim() });
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
        <AuthLayout
            title="Login"
            footer={
                <>
                    Don&apos;t have an account? <Link to="/register">Sign up</Link>
                </>
            }
        >
            <form className="auth-form" onSubmit={handleSubmit} noValidate>
                <Input
                    label="Login or Email:"
                    name="identifier"
                    value={formData.identifier}
                    onChange={handleChange}
                    error={errors.identifier}
                    autoComplete="username"
                    placeholder="your login or email"
                />
                <Input
                    label="Password:"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    error={errors.password}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                />

                {serverError && <p className="auth-error" role="alert">{serverError}</p>}

                <Button loading={loading} loadingText="Logging in...">Login</Button>
            </form>
        </AuthLayout>
    );
}