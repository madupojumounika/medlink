import React from 'react';
import { ErrorState } from '@/components/common/ErrorState';
import { Link } from 'react-router-dom';
import { Button } from '@/components/common/Button';

export default function NotFound() {
  return (
    <div className="h-screen w-screen flex items-center justify-center p-4">
      <ErrorState 
        title="404 - Page Not Found" 
        description="The page you are looking for doesn't exist." 
        action={<Link to="/"><Button>Return Home</Button></Link>}
      />
    </div>
  );
}
