export default function Home() {
  return (
    <div className="min-h-screen p-8 bg-white text-gray-900">
      <main className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Salesforce Canvas Bridge Demo</h1>
        
        <div className="mb-8 p-6 bg-blue-50 border border-blue-300 rounded">
          <h2 className="text-xl font-semibold mb-3 text-blue-900">Overview</h2>
          <p className="mb-2 text-gray-800">
            This is a minimal demo of the Salesforce Canvas <strong>Bridge pattern</strong> for handling signed requests.
          </p>
          <p className="mb-2 text-gray-800">
            The app uses <code className="bg-blue-200 px-2 py-1 rounded text-blue-900">sessionStorage</code> to temporarily store 
            the signed request token, allowing the Canvas page to communicate with a mock backend API.
          </p>
        </div>

        <div className="mb-8 p-6 bg-gray-50 border border-gray-300 rounded">
          <h2 className="text-xl font-semibold mb-3 text-gray-900">How It Works</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-800">
            <li>
              Salesforce POSTs the <code className="bg-gray-300 px-2 py-1 rounded text-gray-900">signed_request</code> to{' '}
              <code className="bg-gray-300 px-2 py-1 rounded text-gray-900">/api/canvas-entry</code>
            </li>
            <li>
              The bridge endpoint returns HTML that stores the token in <code className="bg-gray-300 px-2 py-1 rounded text-gray-900">sessionStorage</code> 
              and redirects to <code className="bg-gray-300 px-2 py-1 rounded text-gray-900">/canvas</code>
            </li>
            <li>
              The Canvas page reads the token and calls the mock API at{' '}
              <code className="bg-gray-300 px-2 py-1 rounded text-gray-900">/api/v1/canvas</code>
            </li>
            <li>
              The mock API validates the token and returns sample data
            </li>
          </ol>
        </div>

        <div className="mb-8 p-6 bg-yellow-50 border border-yellow-400 rounded">
          <h2 className="text-xl font-semibold mb-3 text-yellow-900">Salesforce Configuration</h2>
          <p className="mb-2 text-gray-800">
            Configure your Salesforce Canvas app to POST to:
          </p>
          <code className="block bg-yellow-200 px-4 py-2 rounded mt-2 text-yellow-900">
            https://&lt;your-dev-host&gt;/api/canvas-entry
          </code>
        </div>

        <div className="mb-8 p-6 bg-green-50 border border-green-300 rounded">
          <h2 className="text-xl font-semibold mb-3 text-green-900">Testing</h2>
          <p className="mb-3 text-gray-800">
            You can manually test the Canvas page, but it will show an error unless sessionStorage contains a token:
          </p>
          <a 
            href="/canvas" 
            className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
          >
            Test Canvas Page →
          </a>
          <p className="mt-3 text-sm text-gray-700">
            (This will fail with an error message since there's no signed request in sessionStorage)
          </p>
        </div>

        <div className="p-6 bg-gray-100 border border-gray-400 rounded">
          <h2 className="text-xl font-semibold mb-3 text-gray-900">Implementation Details</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-800">
            <li><strong>Bridge Route:</strong> <code className="bg-gray-300 px-2 py-1 rounded text-gray-900">app/api/canvas-entry/route.ts</code></li>
            <li><strong>Mock API:</strong> <code className="bg-gray-300 px-2 py-1 rounded text-gray-900">app/api/v1/canvas/route.ts</code></li>
            <li><strong>Canvas Page:</strong> <code className="bg-gray-300 px-2 py-1 rounded text-gray-900">app/canvas/page.tsx</code></li>
          </ul>
        </div>
      </main>
    </div>
  );
}
