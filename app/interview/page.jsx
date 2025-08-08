"use client";
import { useRouter } from "next/navigation";
import { FaJava, FaReact, FaGitAlt, FaDatabase, FaCode, FaCogs } from "react-icons/fa";
import { FaSitemap, FaPython } from "react-icons/fa";


export default function InterviewPage() {
  const router = useRouter();

  const domains = [
    { name: "Java", description: "Core Java concepts and interview questions.", icon: <FaJava size={40} color="rgba(233, 231, 98, 1)" /> },
    { name: "OOP", description: "Master Object-Oriented Programming principles.", icon: <FaCogs size={40} color="rgba(233, 231, 98, 1)" /> },
    { name: "SQL", description: "Practice SQL queries and database concepts.", icon: <FaDatabase size={40} color="rgba(233, 231, 98, 1)" /> },
    { name: "DSA", description: "Sharpen your problem-solving skills.", icon: <FaSitemap size={40} color="rgba(233, 231, 98, 1)" /> },
    { name: "Python", description: "Python programming concepts and interview questions.", icon: <FaPython size={40} color="rgba(233, 231, 98, 1)" /> },

    { name: "React", description: "React.js fundamentals and advanced questions.", icon: <FaReact size={40} color="rgba(233, 231, 98, 1)" /> },
    { name: "Vanilla JS", description: "Server-side programming and APIs.", icon: <FaCode size={40} color="rgba(233, 231, 98, 1)" /> },
    { name: "Version Control Systems", description: "Git and version control interview prep.", icon: <FaGitAlt size={40} color="rgba(233, 231, 98, 1)" /> },
  ];

  const handleCardClick = (domain) => {
    router.push(`/interview/${encodeURIComponent(domain)}`);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col justify-center items-center px-6">
      {/* Page Heading */}
      <div className=" mt-28 mb-10 text-center">
        <h1 className="text-4xl font-bold">Get Ready to Prepare</h1>
        
        <p className="text-lg mt-7 text-gray-300">Boost your confidence for your next interview</p>
        <br></br>
        <p className="text-md mt-8 text-gray-400">Please choose your domain</p>
      </div>

      {/* Domains Section */}
      <div className="max-w-5xl mx-auto grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {domains.map((domain, index) => (
          <div
            key={index}
            onClick={() => handleCardClick(domain.name)}
            className="bg-gray-800 rounded-xl p-6 hover:shadow-xl hover:shadow-white/20 cursor-pointer transition transform hover:scale-105 flex flex-col items-center text-center"
          >
            <div className="mb-4">{domain.icon}</div>
            <h2 className="text-2xl font-semibold">{domain.name}</h2>
            <p className="text-gray-400 mt-2">{domain.description}</p>
          </div>
        ))}
      </div>
      <br></br>
    </div>
  );
}
