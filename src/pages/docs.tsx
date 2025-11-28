

const Docs = () => {
    return (
        <div>
            <div className="min-h-screen bg-[#0b0c15] text-white p-10">

                <h1 className="text-center text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">Documentation</h1>


                <div className="w-full bg-[#161a2b] p-10 rounded-3xl shadow-xl border border-gray-800">
                <p className="text-gray-300 mb-8">
                    Welcome to the official documentation. Here you will find everything you
                    need to get started using our platform.
                </p>

                {/* Introduction */}
                <section className="mb-10">
                    <h2 className="text-2xl font-semibold mb-3">Introduction</h2>
                    <p className="text-gray-300">
                        Our platform is a simple and powerful online code editor. Write, run,
                        and deploy your applications directly from your browser without
                        installing anything.
                    </p>
                </section>

                {/* Getting Started */}
                <section className="mb-10">
                    <h2 className="text-2xl font-semibold mb-3">Getting Started</h2>
                    <p className="text-gray-300 mb-4">
                        Follow these quick steps to start coding:
                    </p>

                    <ul className="list-disc list-inside text-gray-300 space-y-2">
                        <li>Create an account</li>
                        <li>Create a new workspace</li>
                        <li>Start coding in the online editor</li>
                        <li>Run your project instantly</li>
                    </ul>
                </section>

                {/* Code Example */}
                <section className="mb-10">
                    <h2 className="text-2xl font-semibold mb-3">Example Code</h2>
                    <pre className="bg-black/40 p-4 rounded-lg text-purple-300 text-sm">
                        {`// JavaScript Example
console.log("Hello World!");`}
                    </pre>
                </section>

                {/* Deployment */}
                <section className="mb-10">
                    <h2 className="text-2xl font-semibold mb-3">Deployment</h2>
                    <p className="text-gray-300 mb-3">
                        Deploy your project in one click. The system will build and host your
                        app automatically.
                    </p>

                    <pre className="bg-black/40 p-4 rounded-lg text-purple-300 text-sm">
                        {`1. Click "Deploy"
2. Wait for build
3. Get your live link`}
                    </pre>
                </section>

                {/* FAQ */}
                <section className="mb-10">
                    <h2 className="text-2xl font-semibold mb-3">FAQ</h2>

                    <p className="text-gray-300"><strong>Q:</strong> Is the editor free?</p>
                    <p className="text-gray-400 mb-4">Yes, basic usage is completely free.</p>

                    <p className="text-gray-300"><strong>Q:</strong> What languages are supported?</p>
                    <p className="text-gray-400">JavaScript, TypeScript, Python, HTML, CSS.</p>
                </section>
                            </div>
            </div>
        </div>
    )
}

export default Docs
