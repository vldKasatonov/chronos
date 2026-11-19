import FloatingDots from './FloatingDots';
import './AuthLayout.css';

export default function AuthLayout({ title, children, footer }) {
    return (
        <main className="auth-page">
            <FloatingDots />
            <div className="auth-card">
                <h1 className="auth-title">{title}</h1>
                {children}
                <p className="auth-footer">{footer}</p>
            </div>
        </main>
    );
}