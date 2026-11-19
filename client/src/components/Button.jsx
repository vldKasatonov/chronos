import './Button.css';

export default function Button({
    children,
    loading = false,
    loadingText = 'Loading...',
    type = 'submit',
    ...rest
}) {
    return (
        <button type={type} className="button" disabled={loading} {...rest}>
            {loading ? loadingText : children}
        </button>
    );
}