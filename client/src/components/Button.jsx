import './Button.css';

export default function Button({ children, loading = false, type = 'submit' }) {
    return (
        <button type={type} className="button" disabled={loading}>
        {loading ? 'Loading...' : children}
        </button>
    );
}