import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../api/auth';

const EMAIL_REGEX = /^\S+@\S+\.\S+$/; // move to vaidation utils if needed
const MIN_PASSWORD_LENGTH = 6; //  move to validation utils if needed

export default function Register() {
    const [formData, setFormData] = useState({
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
        
        if (!formData.login.trim()) {
            newErrors.login = 'Login is required';
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
            login: rest.login.trim(),
            email: rest.email.trim(),
        };

        try {
            setLoading(true);
            await register(payload);
            navigate('/login');
        } catch (err) {
            setServerError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} noValidate>
            <h1>Register</h1>

            <div>
                <label htmlFor="login">Login</label>
                <input
                    id="login"
                    name="login"
                    type="text"
                    value={formData.login}
                    onChange={handleChange}
                    autoComplete="username"
                    aria-invalid={Boolean(errors.login)}
                    aria-describedby={errors.login ? 'login-error' : undefined}
                />
                {errors.login && <span id="login-error" role="alert">{errors.login}</span>}
            </div>

            <div>
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && <span id="email-error" role="alert">{errors.email}</span>}
            </div>

            <div>
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="new-password"
                    aria-invalid={Boolean(errors.password)}
                    aria-describedby={errors.password ? 'password-error' : undefined}
                />
                {errors.password && <span id="password-error" role="alert">{errors.password}</span>}
            </div>

            <div>
                <label htmlFor="confirmPassword">Confirm password</label>
                <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    autoComplete="new-password"
                    aria-invalid={Boolean(errors.confirmPassword)}
                    aria-describedby={errors.confirmPassword ? 'confirmPassword-error' : undefined}
                />
                {errors.confirmPassword && (
                    <span id="confirmPassword-error" role="alert">{errors.confirmPassword}</span>
                )}
            </div>

            {serverError && <p role="alert">{serverError}</p>}

            <button type="submit" disabled={loading}>
                {loading ? 'Registering...' : 'Register'}
            </button>

            <p>
                Already have an account? <Link to="/login">Login</Link>
            </p>
        </form>
    );
}