import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../api/auth';
import AuthLayout from '../components/AuthLayout';
import Input from '../components/Input';
import Button from '../components/Button';

const EMAIL_REGEX = /^\S+@\S+\.\S+$/; // move to validation utils if needed
const MIN_PASSWORD_LENGTH = 6; // move to validation utils if needed

export default function Register() {
    const [formData, setFormData] = useState({
        fullName: '',
        login: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
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

        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Full name is required';
        }
        if (!formData.login.trim()) {
            newErrors.login = 'Username is required';
        }
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!EMAIL_REGEX.test(formData.email.trim())) {
            newErrors.email = 'Enter a valid email address';
        }
        if (formData.password.length < MIN_PASSWORD_LENGTH) {
            newErrors.password = `Password must be at least ${MIN_PASSWORD_LENGTH} characters`;
        }
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
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

        // eslint-disable-next-line no-unused-vars
        const { confirmPassword, ...rest } = formData;
        const payload = {
            ...rest,
            fullName: rest.fullName.trim(),
            login: rest.login.trim(),
            email: rest.email.trim(),
        };

        try {
            setLoading(true);
            await register(payload);
            navigate('/login');
        } catch (err) {
            setServerError(
                err.response?.data?.message || 'Registration failed. Please try again.'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout
            title="Registration"
            footer={
                <>
                    Have an account? <Link to="/login">Login</Link>
                </>
            }
        >
            <form className="auth-form" onSubmit={handleSubmit} noValidate>
                <Input
                    label="Full name:"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    error={errors.fullName}
                    autoComplete="name"
                    placeholder="Your Name"
                />
                <Input
                    label="Username:"
                    name="login"
                    value={formData.login}
                    onChange={handleChange}
                    error={errors.login}
                    autoComplete="username"
                    placeholder="username"
                />
                <Input
                    label="Email:"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                    autoComplete="email"
                    placeholder="email@example.com"
                />
                <Input
                    label="Password:"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    error={errors.password}
                    autoComplete="new-password"
                    placeholder="Enter your password"
                />
                <Input
                    label="Password confirmation:"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    error={errors.confirmPassword}
                    autoComplete="new-password"
                    placeholder="Repeat your password"
                />

                {serverError && <p className="auth-error" role="alert">{serverError}</p>}

                <Button loading={loading} loadingText="Registering...">Sign up</Button>
            </form>
        </AuthLayout>
    );
}