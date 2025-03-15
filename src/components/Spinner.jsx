import { memo } from 'react';
import PropTypes from 'prop-types';

const Spinner = memo(({ color = '#3498db', loading = true }) => {
    const spinnerStyle = {
        display: loading ? 'block' : 'none',
        width: '48px',
        height: '48px',
        border: `4px solid ${color}20`,
        borderTop: `4px solid ${color}`,
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
    };

    return (
        <>
            <style>
                {`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}
            </style>
            <div style={spinnerStyle} role="status">
                <span className="sr-only" style={{ display: 'none' }}>
                    Loading...
                </span>
            </div>
        </>
    );
});

Spinner.propTypes = {
    color: PropTypes.string,
    loading: PropTypes.bool,
};

Spinner.displayName = 'Spinner';

export default Spinner;