
const Resource = () => {
  return (
    <div>
      <div className="min-h-screen bg-[#0b0c15] text-white px-4 py-16">

      {/* Heading */}
      <h1 className="text-center text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
        Resources
      </h1>

      {/* Main Box */}
      <div className=" mx-auto bg-[#161a2b] p-10 rounded-3xl shadow-xl border border-gray-800">

        <p className="text-center text-gray-300 mb-10">
          Explore tutorials, tools, templates, and learning materials to help
          you get the most out of our cloud IDE.
        </p>

        <div className="space-y-8">

          {/* Tutorials */}
          <section className="bg-[#1c2033] p-6 rounded-2xl border border-gray-700 shadow-md">
            <h2 className="text-2xl font-semibold mb-3">📘 Tutorials</h2>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Getting Started with the Cloud IDE</li>
              <li>Building Your First React App</li>
              <li>How to Run Python Scripts Online</li>
              <li>Deploying a Full-Stack App</li>
            </ul>
          </section>

          {/* Templates */}
          <section className="bg-[#1c2033] p-6 rounded-2xl border border-gray-700 shadow-md">
            <h2 className="text-2xl font-semibold mb-3">📦 Starter Templates</h2>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>React Starter Template</li>
              <li>Node.js API Boilerplate</li>
              <li>Python Flask Template</li>
              <li>HTML/CSS Starter Pack</li>
            </ul>
          </section>

          {/* Tools */}
          <section className="bg-[#1c2033] p-6 rounded-2xl border border-gray-700 shadow-md">
            <h2 className="text-2xl font-semibold mb-3">🛠 Tools</h2>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Prettier Code Formatter</li>
              <li>Theme Pack (Dark / Neon)</li>
              <li>Cloud IDE CLI Tool (coming soon)</li>
              <li>UI Components Library</li>
            </ul>
          </section>

          {/* Quick Links */}
          <section className="bg-[#1c2033] p-6 rounded-2xl border border-gray-700 shadow-md">
            <h2 className="text-2xl font-semibold mb-3">🔗 Quick Links</h2>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Documentation</li>
              <li>SDK Page</li>
              <li>Support</li>
              <li>GitHub Repository</li>
            </ul>
          </section>

          {/* Learning Resources */}
          <section className="bg-[#1c2033] p-6 rounded-2xl border border-gray-700 shadow-md">
            <h2 className="text-2xl font-semibold mb-3">🎓 Learning Material</h2>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Learn JavaScript (Beginner)</li>
              <li>Learn TypeScript (Intermediate)</li>
              <li>Learn React (Beginner to Pro)</li>
              <li>Learn Git & GitHub</li>
            </ul>
          </section>

        </div>
      </div>
    </div>
    </div>
  )
}

export default Resource
