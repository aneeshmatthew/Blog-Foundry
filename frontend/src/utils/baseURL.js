const generateBaseURL = () => {
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL.replace(/\/$/, '');
  }

  const currentHost = window?.location?.host || 'localhost:8000';
  const currentProtocol = window?.location?.protocol || 'http:';

  // Production (Vercel): API is served from the same deployment
  if (process.env.NODE_ENV === 'production') {
    return `${currentProtocol}//${currentHost}`;
  }

  // Development: frontend on 8000, backend on 8080
  return `${currentProtocol}//${currentHost.replace('8000', '8080')}`;
};

export const baseURL = generateBaseURL();
