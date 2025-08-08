export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="bg-gray-800 rounded-xl p-8 max-w-lg w-full shadow-lg border border-gray-700 text-center">
        <h1 className="text-3xl font-bold text-white mb-4">About This App</h1>
        <br></br>
        <p className="text-gray-300 leading-relaxed">
          This application is a personal project created by me to help users
          prepare for interviews and build their resumes effectively. It
          features an interactive MCQ section for various domains, a resume
          builder, and other tools aimed at boosting confidence and readiness
          for job opportunities.
        </p>
        <br></br>
        <p className="mt-4 text-gray-400 text-sm">
          Designed and developed with ❤️ using Next.js, Tailwind CSS, and modern
          UI components.
        </p>
      </div>
    </div>
  );
}
