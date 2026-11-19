import './FloatingDots.css';

const COLOR_VARS = [
    '--color-red',
    '--color-orange',
    '--color-primary',
    '--color-green',
    '--color-purple',
    '--color-sand',
    '--color-ice',
    '--color-lime',
];
const DOT_COUNT = 40;

const random = (min, max) => Math.random() * (max - min) + min;
const round = (value, digits = 1) => Number(value.toFixed(digits));

const DOTS = Array.from({ length: DOT_COUNT }, (_, id) => ({
    id,
    size: round(random(3, 14)),
    left: round(random(0, 100)),
    top: round(random(0, 100)),
    duration: round(random(16, 34)),
    delay: -round(random(0, 34)),
    drift: Math.round(random(-40, 40)),
    peak: round(random(0.45, 0.9), 2),
    color: COLOR_VARS[id % COLOR_VARS.length],
}));

export default function FloatingDots() {
    return (
        <div className="floating-dots" aria-hidden="true">
            {DOTS.map((dot) => (
                <span
                    key={dot.id}
                    className="floating-dot"
                    style={{
                        '--size': `${dot.size}px`,
                        '--left': `${dot.left}%`,
                        '--top': `${dot.top}%`,
                        '--duration': `${dot.duration}s`,
                        '--delay': `${dot.delay}s`,
                        '--drift': `${dot.drift}px`,
                        '--peak': dot.peak,
                        '--color': `var(${dot.color})`,
                    }}
                />
            ))}
        </div>
    );
}