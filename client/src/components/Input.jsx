import './Input.css';

export default function Input({
    label, name, type = 'text', value, onChange, error, autoComplete,
}) {
    return (
        <div className={`form-field ${error ? 'form-field-error' : ''}`}>
        <label htmlFor={name} className="form-label">{label}</label>
        <input
            id={name}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            autoComplete={autoComplete}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${name}-error` : undefined}
            className="form-input"
        />
        {error && (
            <span id={`${name}-error`} role="alert" className="form-error-text">
            {error}
            </span>
        )}
        </div>
    );
}