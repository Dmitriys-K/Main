import React from 'react';
import { Button } from '../../components/buttons/Button';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="not-found-page">
      <h2>404 - Page Not Found</h2>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Button variant="secondary" onClick={() => alert('Return to Home')}>
        Go Back Home
      </Button>
    </div>
  );
}