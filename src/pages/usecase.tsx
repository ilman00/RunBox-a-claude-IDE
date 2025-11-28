const UseCase = () => {
  return (
    <div className="min-h-screen bg-[#0b0c15] text-white px-4 py-16">

      {/* HEADING */}
      <h1 className="text-center text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
        Use Cases
      </h1>

      {/* MAIN BOX */}
      <div className="w-full  bg-[#161a2b] p-10 rounded-3xl shadow-xl border border-gray-800">

        {/* Intro text centered */}
        <p className="text-gray-300 mb-10 text-center">
          See how different users benefit from our cloud development platform.
        </p>

        {/* CONTENT */}
        <div className="space-y-8">

          {/* 1 — Students */}
          <section className="bg-[#1c2033] p-6 rounded-2xl border border-gray-700 shadow-md">
            <h2 className="text-2xl font-semibold mb-3">⭐ Students & Beginners</h2>
            <p className="text-gray-300 leading-relaxed">
              Students can start coding instantly without installing software.
              Everything runs online, making learning simple and fast.
            </p>
          </section>

          {/* 2 — Freelancers */}
          <section className="bg-[#1c2033] p-6 rounded-2xl border border-gray-700 shadow-md">
            <h2 className="text-2xl font-semibold mb-3">⭐ Freelancers & Developers</h2>
            <p className="text-gray-300 leading-relaxed">
              Build and ship projects directly from the browser.
              Access your workspace anywhere and share with clients easily.
            </p>
          </section>

          {/* 3 — Teams */}
          <section className="bg-[#1c2033] p-6 rounded-2xl border border-gray-700 shadow-md">
            <h2 className="text-2xl font-semibold mb-3">⭐ Teams & Startups</h2>
            <p className="text-gray-300 leading-relaxed">
              Remote teams collaborate in one cloud workspace.
              No setup issues — everything stays synced.
            </p>
          </section>

          {/* 4 — Educators */}
          <section className="bg-[#1c2033] p-6 rounded-2xl border border-gray-700 shadow-md">
            <h2 className="text-2xl font-semibold mb-3">⭐ Educators & Bootcamps</h2>
            <p className="text-gray-300 leading-relaxed">
              Teachers assign coding tasks and students complete them online.
              No installation required.
            </p>
          </section>

          {/* 5 — Open Source */}
          <section className="bg-[#1c2033] p-6 rounded-2xl border border-gray-700 shadow-md">
            <h2 className="text-2xl font-semibold mb-3">⭐ Open-Source Contributors</h2>
            <p className="text-gray-300 leading-relaxed">
              Fork, edit, run, and submit pull requests from the browser.
              Fast and efficient workflow.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};

export default UseCase;
