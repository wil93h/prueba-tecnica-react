
import { ProgressSpinner } from 'primereact/progressspinner';

const LoadProgressSpinner = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
      <div style={overlayStyle}>
          <ProgressSpinner />
      </div>
  );
};
const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',  // semi-transparente
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
};

export default LoadProgressSpinner
