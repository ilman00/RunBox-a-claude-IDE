const Support = () => {
  return (
    <div className="min-h-screen bg-[#0b0c15] text-white px-4 py-16">

      {/* Page Title */}
      <h1 className="text-center text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
        Support
      </h1>

      {/* Main Card */}
      <div className="w-full mx-auto bg-[#161a2b] p-10 rounded-3xl shadow-xl border border-gray-800">

        <p className="text-center text-gray-300 mb-10">
          We're here to help. Find answers to common questions or reach out to our support team.
        </p>

        <div className="space-y-8">

          {/* FAQ Section */}
          <section className="bg-[#1c2033] p-6 rounded-2xl border border-gray-700 shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>

            <div className="space-y-4">
              <div>
                <p className="text-gray-300 font-medium">• How do I reset my password?</p>
                <p className="text-gray-400">
                  Go to your account settings and click “Reset Password”.
                </p>
              </div>

              <div>
                <p className="text-gray-300 font-medium">• Is my data secure?</p>
                <p className="text-gray-400">
                  Yes, all workspaces are encrypted and protected.
                </p>
              </div>

              <div>
                <p className="text-gray-300 font-medium">• Do you offer free plans?</p>
                <p className="text-gray-400">
                  Yes, our free plan includes essential features for beginners.
                </p>
              </div>
            </div>
          </section>

          {/* Contact Support */}
          <section className="bg-[#1c2033] p-6 rounded-2xl border border-gray-700 shadow-md">
            <h2 className="text-2xl font-semibold mb-3"> Contact Support</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              If you need direct help, reach out to our support team and we will respond as soon as possible.
            </p>

            <p className="text-gray-400">
              📧 Email: <span className="text-gray-200">support@gmail.com</span>
            </p>
          </section>

          {/* Report Issue */}
          <section className="bg-[#1c2033] p-6 rounded-2xl border border-gray-700 shadow-md">
            <h2 className="text-2xl font-semibold mb-3">Report a Bug or Issue</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Found something not working? Let us know so we can fix it quickly.
            </p>

            <p className="text-gray-400">
              🐞 Issue Page: <span className="text-gray-200">github.com/yourproject/issues</span>
            </p>
          </section>

          {/* Community */}
          <section className="bg-[#1c2033] p-6 rounded-2xl border border-gray-700 shadow-md">
            <h2 className="text-2xl font-semibold mb-3">Community</h2>

            <p className="text-gray-400 mb-2">💬 Join our Discord community</p>
            <p className="text-gray-400 mb-2">📘 Follow us on GitHub</p>
            <p className="text-gray-400">📺 Watch tutorials on YouTube</p>
          </section>

          {/* Help Resources */}
          <section className="bg-[#1c2033] p-6 rounded-2xl border border-gray-700 shadow-md">
            <h2 className="text-2xl font-semibold mb-3">Help Resources</h2>

            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Getting Started Guide</li>
              <li>API Documentation</li>
              <li>Troubleshooting Page</li>
              <li>Developer Tutorials</li>
            </ul>
          </section>

        </div>
      </div>
    </div>
  );
};

export default Support;
