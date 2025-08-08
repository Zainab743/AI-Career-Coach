"use client";
import { useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function ResumePage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    linkedin: "",
    location: "",
    skills: "",
    experience: "",
    education: "",
    projects: ""
  });

  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateResume = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/generate-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formData })
      });

      const data = await res.json();
      setResumeData(data);
    } catch (err) {
      console.error("Error generating resume:", err);
    }
    setLoading(false);
  };

  const downloadPDF = () => {
  if (!resumeData) return;

  const doc = new jsPDF();

  // Name
  doc.setFontSize(20);
  doc.text(resumeData.personal?.name || "", 14, 20);

  // Contact
  doc.setFontSize(11);
  doc.text(
    `${resumeData.personal?.phone || ""} | ${resumeData.personal?.email || ""} | ${resumeData.personal?.linkedin || ""}`,
    14,
    28
  );

  // Professional Summary Section (NEW)
  autoTable(doc, {
    startY: 40,
    head: [["Professional Summary"]],
    body: resumeData.summary
      ? [[resumeData.summary]]
      : [["No summary provided"]],
  });

  // Skills
  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 10,
    head: [["Skills"]],
    body: resumeData.skills?.length
      ? resumeData.skills.map(skill => [skill])
      : [["No skills provided"]],
  });

  // Experience
  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 10,
    head: [["Experience"]],
    body: resumeData.experience?.length
      ? resumeData.experience.map(exp => [exp])
      : [["No experience provided"]],
  });

  // Education
  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 10,
    head: [["Education"]],
    body: resumeData.education?.length
      ? resumeData.education.map(edu => [edu])
      : [["No education provided"]],
  });

  // Projects
  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 10,
    head: [["Projects"]],
    body: resumeData.projects?.length
      ? resumeData.projects.map(proj => [proj])
      : [["No projects provided"]],
  });

  doc.save("resume.pdf");
};


  return (
    <div className="mt-[80px] flex gap-6 px-4 pb-10">
      {/* Left - Form */}
      <div className="w-1/2 space-y-3 flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-gray-300 via-white to-gray-300 bg-clip-text text-transparent">
      Resume Builder
      </h2>
      <br></br>

        <input name="name" placeholder="Full Name" className="border p-2 w-full" onChange={handleChange} />
        <input name="phone" placeholder="Phone" className="border p-2 w-full" onChange={handleChange} />
        <input name="email" placeholder="Email" className="border p-2 w-full" onChange={handleChange} />
        <input name="linkedin" placeholder="LinkedIn URL" className="border p-2 w-full" onChange={handleChange} />
        <input name="location" placeholder="Location" className="border p-2 w-full" onChange={handleChange} />
        <textarea name="skills" placeholder="Skills (comma separated)" className="border p-2 w-full" onChange={handleChange} />
        <textarea name="experience" placeholder="Experience details" className="border p-2 w-full" onChange={handleChange} />
        <textarea name="education" placeholder="Education details" className="border p-2 w-full" onChange={handleChange} />
        <textarea name="projects" placeholder="Projects details" className="border p-2 w-full" onChange={handleChange} />

        <button
          onClick={generateResume}
          disabled={loading}
          className="border border-gray-500 text-white-700 px-4 py-2 rounded hover:bg-gray-100"
        >

          {loading ? "Generating..." : "Generate Resume"}
        </button>
      </div>

      {/* Right - Preview */}
      <div className="w-1/2 bg-white text-black !text-black shadow p-4 rounded overflow-y-auto max-h-[calc(100vh-100px)]">
        {resumeData ? (
          <>
            <h1 className="text-2xl font-bold">{resumeData.personal?.name}</h1>
            <p className="text-sm text-gray-600">
              {resumeData.personal?.phone} | {resumeData.personal?.email} | {resumeData.personal?.linkedin}
            </p>
            <h2 className="text-xl font-semibold mt-4 border-b pb-1">Professional Summary</h2>
            <p>{resumeData.summary}</p>


            <h2 className="text-xl font-semibold mt-4 border-b pb-1">Skills</h2>
            <ul className="list-disc list-inside">
              {resumeData.skills?.map((skill, i) => <li key={i}>{skill}</li>)}
            </ul>

            <h2 className="text-xl font-semibold mt-4 border-b pb-1">Experience</h2>
            <ul className="list-disc list-inside">
              {resumeData.experience?.map((exp, i) => <li key={i}>{exp}</li>)}
            </ul>

            <h2 className="text-xl font-semibold mt-4 border-b pb-1">Education</h2>
            <ul className="list-disc list-inside">
              {resumeData.education?.map((edu, i) => <li key={i}>{edu}</li>)}
            </ul>

            <h2 className="text-xl font-semibold mt-4 border-b pb-1">Projects</h2>
            <ul className="list-disc list-inside">
              {resumeData.projects?.map((proj, i) => <li key={i}>{proj}</li>)}
            </ul>

            <button
              onClick={downloadPDF}
              className="mt-4 bg-blue-600 text-black px-4 py-2 rounded hover:bg-blue-700"
            >
              Download PDF
            </button>
          </>
        ) : (
          <p className="text-gray-500">Fill the form and click Generate Resume to preview here.</p>
        )}
      </div>
    </div>
  );
}
