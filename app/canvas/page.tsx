'use client';

import { useEffect, useState } from 'react';

interface CanvasData {
  status: string;
  message: string;
  signedRequestFirst20Chars: string;
  timestamp: string;
  mockUser?: {
    userId: string;
    userName: string;
    fullName: string;
  };
  mockContext?: {
    organizationId: string;
    instanceUrl: string;
    environment: string;
  };
}

interface ErrorResponse {
  error: string;
}

export default function CanvasPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<CanvasData | null>(null);

  useEffect(() => {
    async function loadCanvasData() {
      try {
        // Get the signed request from sessionStorage
        const signedRequest = sessionStorage.getItem('sfdc_signed_request');

        if (!signedRequest) {
          setError('No signed_request token found. Please access this page from Salesforce Canvas.');
          setLoading(false);
          return;
        }

        // Call the mock backend API
        const response = await fetch('/api/v1/canvas', {
          method: 'GET',
          headers: {
            'X-Signed-Request': signedRequest,
          },
        });

        if (!response.ok) {
          const errorData: ErrorResponse = await response.json();
          setError(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
          setLoading(false);
          return;
        }

        const canvasData: CanvasData = await response.json();
        setData(canvasData);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
        setLoading(false);
      }
    }

    loadCanvasData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <p className="text-gray-900 text-lg">Loading Canvas data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen flex-col bg-white px-4">
        <h1 className="text-red-600 text-2xl font-bold mb-4">Error</h1>
        <p className="text-gray-900 text-center max-w-2xl">{error}</p>
      </div>
    );
  }

  if (data) {
    return (
      <div className="p-8 max-w-4xl mx-auto min-h-screen bg-white">
        <h1 className="text-3xl font-bold mb-4 text-gray-900">Salesforce Canvas Demo</h1>
        <h2 className="text-xl mb-6 text-gray-700">Canvas Data (Mock)</h2>
        <pre className="bg-gray-100 text-gray-900 p-4 rounded border border-gray-300 overflow-auto text-sm">
          {JSON.stringify(data, null, 2)}
        </pre>
        <div className="mt-8">
          <button
            onClick={() => {
              sessionStorage.removeItem('sfdc_signed_request');
              window.location.href = '/';
            }}
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition-colors cursor-pointer"
          >
            Clear Session & Return Home
          </button>
        </div>
      </div>
    );
  }

  return null;
}
