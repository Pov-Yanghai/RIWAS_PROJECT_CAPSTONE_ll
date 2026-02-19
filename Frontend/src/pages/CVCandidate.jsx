// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { FiArrowLeft, FiDownload, FiPrinter } from 'react-icons/fi';
// import { SideBar } from '../components/SideBar';

// const CVCandidate = () => {
//   const navigate = useNavigate();
//   const { applicationId } = useParams();
//   const [isEditing, setIsEditing] = useState(false);
  
//   const [formData, setFormData] = useState({
//     // Personal Info
//     name: 'Eng Mengeang',
//     position: 'Data Scientist',
//     email: 'engmeneang@example.com',
//     phone: '+855 12 345 678',
//     location: 'Phnom Penh, Cambodia',
    
//     // Experience
//     experience: [
//       {
//         position: 'Data Analyst Intern',
//         company: 'TechLab Cambodia',
//         startDate: '01/06/2024',
//         endDate: '01/08/2024',
//         description: 'Data Analyst Intern – TechLab Cambodia (June 2024 – August 2024)\n1. Analyzed datasets using Python (Pandas, NumPy)\n2. Created visual dashboards with Tableau\n3. Presented insights to improve customer engagement'
//       }
//     ],
    
//     // Projects
//     projects: [
//       'AI for Fitness Growth – Developed a system for performance optimization and flexible scheduling using Python and React.',
//       'Job Recommendation System – Built a recommendation engine that suggests jobs based on user skills and experience.'
//     ],
    
//     // Skills
//     programming: 'Python, JavaScript, R',
//     frameworks: 'React, Flask, Node.js',
//     tools: 'Tableau, Git, VS Code',
//     softSkills: 'Teamwork, Problem Solving, Time Management',
    
//     // Certifications
//     certifications: [
//       'CCNA Final Exam – Cisco Networking Academy (2024)'
//     ],
    
//     // Extracurricular Activities
//     extracurricular: {
//       role: 'Event Organizer',
//       organization: 'High School Alumni Meeting',
//       year: 'Event 2022',
//       description: 'Helped organize and coordinate alumni event for grade A students.'
//     },
    
//     // Languages
//     languages: [
//       { language: 'Khmer', level: 'Native or bilingual proficiency' },
//       { language: 'English', level: 'Native or bilingual proficiency' }
//     ],

//     // Education
//     education: [
//       {
//         degree: 'Bachelor of Computer Science',
//         school: 'Royal University of Phnom Penh',
//         year: '2021 - 2025',
//         gpa: '3.8/4.0'
//       }
//     ]
//   });

//   const handleChange = (section, index, field, value) => {
//     setFormData(prev => {
//       const newData = { ...prev };
      
//       if (Array.isArray(newData[section])) {
//         newData[section] = [...newData[section]];
//         if (typeof newData[section][index] === 'object') {
//           newData[section][index] = { ...newData[section][index], [field]: value };
//         } else {
//           newData[section][index] = value;
//         }
//       } else if (typeof newData[section] === 'object' && !Array.isArray(newData[section])) {
//         newData[section] = { ...newData[section], [field]: value };
//       } else {
//         newData[section] = value;
//       }
      
//       return newData;
//     });
//   };

//   const handleSave = () => {
//     console.log('Saving CV data:', formData);
//     setIsEditing(false);
//     alert('CV updated successfully!');
//   };

//   const handlePrint = () => {
//     window.print();
//   };

//   const handleDownload = () => {
//     alert('Download CV as PDF (Feature coming soon)');
//   };

//   return (
//     <div className="min-h-screen font-sans text-slate-900 bg-gray-50 ">
//       <div className="max-w-7xl mx-auto p-6 mr-20 ">

//       <SideBar />

//         {/* Header */}
//         <div className="flex justify-between items-center mb-6">
//           <button
//             onClick={() => navigate('/manage-application')}
//             className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
//           >
//             <FiArrowLeft className="text-xl" />
//             <span className="font-semibold">Back to Applications</span>
//           </button>

//           <div className="flex gap-3">
//             <button
//               onClick={handlePrint}
//               className="flex items-center gap-2 px-4 py-2 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//             >
//               <FiPrinter />
//               <span className="font-medium">Print</span>
//             </button>
//             <button
//               onClick={handleDownload}
//               className="flex items-center gap-2 px-4 py-2 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//             >
//               <FiDownload />
//               <span className="font-medium">Download</span>
//             </button>
//           </div>
//         </div>

//         {/* CV Header */}
//         <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900 mb-1">{formData.name}</h1>
//               <p className="text-xl text-gray-600 mb-3">{formData.position}</p>
//               <div className="flex gap-4 text-sm text-gray-600">
//                 <span>{formData.email}</span>
//                 <span>•</span>
//                 <span>{formData.phone}</span>
//                 <span>•</span>
//                 <span>{formData.location}</span>
//               </div>
//             </div>
//             <div className="flex gap-3">
//               {!isEditing ? (
//                 <button 
//                   onClick={() => setIsEditing(true)}
//                   className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
//                 >
//                   Edit Resume
//                 </button>
//               ) : (
//                 <>
//                   <button 
//                     onClick={() => setIsEditing(false)}
//                     className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
//                   >
//                     Cancel
//                   </button>
//                   <button 
//                     onClick={handleSave}
//                     className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
//                   >
//                     Save Changes
//                   </button>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Education Section */}
//         <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
//           <h2 className="text-xl font-bold text-gray-900 mb-6">Education</h2>
//           {formData.education.map((edu, index) => (
//             <div key={index} className="space-y-4">
//               <div className="grid md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Degree</label>
//                   <input
//                     type="text"
//                     disabled={!isEditing}
//                     value={edu.degree}
//                     onChange={(e) => handleChange('education', index, 'degree', e.target.value)}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">School/University</label>
//                   <input
//                     type="text"
//                     disabled={!isEditing}
//                     value={edu.school}
//                     onChange={(e) => handleChange('education', index, 'school', e.target.value)}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
//                   />
//                 </div>
//               </div>
//               <div className="grid md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
//                   <input
//                     type="text"
//                     disabled={!isEditing}
//                     value={edu.year}
//                     onChange={(e) => handleChange('education', index, 'year', e.target.value)}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">GPA</label>
//                   <input
//                     type="text"
//                     disabled={!isEditing}
//                     value={edu.gpa}
//                     onChange={(e) => handleChange('education', index, 'gpa', e.target.value)}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
//                   />
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Experience Section */}
//         <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
//           <h2 className="text-xl font-bold text-gray-900 mb-6">Experience</h2>
          
//           {formData.experience.map((exp, index) => (
//             <div key={index} className="space-y-4">
//               <div className="grid md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
//                   <input
//                     type="text"
//                     disabled={!isEditing}
//                     value={exp.position}
//                     onChange={(e) => handleChange('experience', index, 'position', e.target.value)}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
//                   <input
//                     type="text"
//                     disabled={!isEditing}
//                     value={exp.company}
//                     onChange={(e) => handleChange('experience', index, 'company', e.target.value)}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
//                   />
//                 </div>
//               </div>
              
//               <div className="grid md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
//                   <input
//                     type="text"
//                     disabled={!isEditing}
//                     value={exp.startDate}
//                     onChange={(e) => handleChange('experience', index, 'startDate', e.target.value)}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
//                     placeholder="01/06/2024"
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
//                   <input
//                     type="text"
//                     disabled={!isEditing}
//                     value={exp.endDate}
//                     onChange={(e) => handleChange('experience', index, 'endDate', e.target.value)}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
//                     placeholder="01/08/2024"
//                   />
//                 </div>
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
//                 <textarea
//                   disabled={!isEditing}
//                   value={exp.description}
//                   onChange={(e) => handleChange('experience', index, 'description', e.target.value)}
//                   rows="5"
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
//                 />
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Projects Section */}
//         <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
//           <h2 className="text-xl font-bold text-gray-900 mb-6">Projects</h2>
          
//           {formData.projects.map((project, index) => (
//             <div key={index} className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Project {index + 1}
//               </label>
//               <textarea
//                 disabled={!isEditing}
//                 value={project}
//                 onChange={(e) => handleChange('projects', index, null, e.target.value)}
//                 rows="2"
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
//               />
//             </div>
//           ))}
//         </div>

//         {/* Skills Section */}
//         <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
//           <h2 className="text-xl font-bold text-gray-900 mb-6">Skills</h2>
          
//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Programming</label>
//               <input
//                 type="text"
//                 disabled={!isEditing}
//                 value={formData.programming}
//                 onChange={(e) => handleChange('programming', null, null, e.target.value)}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
//               />
//             </div>
            
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Frameworks</label>
//               <input
//                 type="text"
//                 disabled={!isEditing}
//                 value={formData.frameworks}
//                 onChange={(e) => handleChange('frameworks', null, null, e.target.value)}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
//               />
//             </div>
            
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Tools</label>
//               <input
//                 type="text"
//                 disabled={!isEditing}
//                 value={formData.tools}
//                 onChange={(e) => handleChange('tools', null, null, e.target.value)}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
//               />
//             </div>
            
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Soft-skill</label>
//               <input
//                 type="text"
//                 disabled={!isEditing}
//                 value={formData.softSkills}
//                 onChange={(e) => handleChange('softSkills', null, null, e.target.value)}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Certifications Section */}
//         <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
//           <h2 className="text-xl font-bold text-gray-900 mb-6">Certifications</h2>
          
//           {formData.certifications.map((cert, index) => (
//             <div key={index} className="mb-4">
//               <input
//                 type="text"
//                 disabled={!isEditing}
//                 value={cert}
//                 onChange={(e) => handleChange('certifications', index, null, e.target.value)}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
//               />
//             </div>
//           ))}
//         </div>

//         {/* Extracurricular Activities Section */}
//         <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
//           <h2 className="text-xl font-bold text-gray-900 mb-6">Extracurricular Activities</h2>
          
//           <div className="grid md:grid-cols-2 gap-4 mb-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
//               <input
//                 type="text"
//                 disabled={!isEditing}
//                 value={formData.extracurricular.role}
//                 onChange={(e) => handleChange('extracurricular', null, 'role', e.target.value)}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
//               />
//             </div>
            
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Organization</label>
//               <input
//                 type="text"
//                 disabled={!isEditing}
//                 value={formData.extracurricular.organization}
//                 onChange={(e) => handleChange('extracurricular', null, 'organization', e.target.value)}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
//               />
//             </div>
//           </div>
          
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
//             <input
//               type="text"
//               disabled={!isEditing}
//               value={formData.extracurricular.year}
//               onChange={(e) => handleChange('extracurricular', null, 'year', e.target.value)}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
//             />
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
//             <textarea
//               disabled={!isEditing}
//               value={formData.extracurricular.description}
//               onChange={(e) => handleChange('extracurricular', null, 'description', e.target.value)}
//               rows="3"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
//             />
//           </div>
//         </div>

//         {/* Languages Section */}
//         <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
//           <h2 className="text-xl font-bold text-gray-900 mb-6">Languages</h2>
          
//           {formData.languages.map((lang, index) => (
//             <div key={index} className="grid md:grid-cols-2 gap-4 mb-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Language {index + 1}
//                 </label>
//                 <input
//                   type="text"
//                   disabled={!isEditing}
//                   value={lang.language}
//                   onChange={(e) => handleChange('languages', index, 'language', e.target.value)}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
//                 <input
//                   type="text"
//                   disabled={!isEditing}
//                   value={lang.level}
//                   onChange={(e) => handleChange('languages', index, 'level', e.target.value)}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
//                 />
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CVCandidate;




import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiArrowLeft, FiDownload, FiPrinter } from 'react-icons/fi';
import { SideBar } from '../components/SideBar';

const CVCandidate = () => {
  const navigate = useNavigate();
  const { applicationId } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  
  const [formData, setFormData] = useState({
    // Personal Info
    name: 'Eng Mengeang',
    position: 'Data Scientist',
    email: 'engmeneang@example.com',
    phone: '+855 12 345 678',
    location: 'Phnom Penh, Cambodia',
    
    // Experience
    experience: [
      {
        position: 'Data Analyst Intern',
        company: 'TechLab Cambodia',
        startDate: '01/06/2024',
        endDate: '01/08/2024',
        description: 'Data Analyst Intern – TechLab Cambodia (June 2024 – August 2024)\n1. Analyzed datasets using Python (Pandas, NumPy)\n2. Created visual dashboards with Tableau\n3. Presented insights to improve customer engagement'
      }
    ],
    
    // Projects
    projects: [
      'AI for Fitness Growth – Developed a system for performance optimization and flexible scheduling using Python and React.',
      'Job Recommendation System – Built a recommendation engine that suggests jobs based on user skills and experience.'
    ],
    
    // Skills
    programming: 'Python, JavaScript, R',
    frameworks: 'React, Flask, Node.js',
    tools: 'Tableau, Git, VS Code',
    softSkills: 'Teamwork, Problem Solving, Time Management',
    
    // Certifications
    certifications: [
      'CCNA Final Exam – Cisco Networking Academy (2024)'
    ],
    
    // Extracurricular Activities
    extracurricular: {
      role: 'Event Organizer',
      organization: 'High School Alumni Meeting',
      year: 'Event 2022',
      description: 'Helped organize and coordinate alumni event for grade A students.'
    },
    
    // Languages
    languages: [
      { language: 'Khmer', level: 'Native or bilingual proficiency' },
      { language: 'English', level: 'Native or bilingual proficiency' }
    ],

    // Education
    education: [
      {
        degree: 'Bachelor of Computer Science',
        school: 'Royal University of Phnom Penh',
        year: '2021 - 2025',
        gpa: '3.8/4.0'
      }
    ]
  });

  const handleChange = (section, index, field, value) => {
    setFormData(prev => {
      const newData = { ...prev };
      
      if (Array.isArray(newData[section])) {
        newData[section] = [...newData[section]];
        if (typeof newData[section][index] === 'object') {
          newData[section][index] = { ...newData[section][index], [field]: value };
        } else {
          newData[section][index] = value;
        }
      } else if (typeof newData[section] === 'object' && !Array.isArray(newData[section])) {
        newData[section] = { ...newData[section], [field]: value };
      } else {
        newData[section] = value;
      }
      
      return newData;
    });
  };

  const handleSave = () => {
    console.log('Saving CV data:', formData);
    setIsEditing(false);
    alert('CV updated successfully!');
  };

  const handlePrint = () => {
    // Add print styles
    const style = document.createElement('style');
    style.innerHTML = `
      @media print {
        body * {
          visibility: hidden;
        }
        #cv-content, #cv-content * {
          visibility: visible;
        }
        #cv-content {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
        }
        .no-print {
          display: none !important;
        }
        @page {
          margin: 1cm;
        }
      }
    `;
    document.head.appendChild(style);
    window.print();
    document.head.removeChild(style);
  };

  const handleDownload = () => {
    // Create a printable version
    const printWindow = window.open('', '', 'height=800,width=800');
    const cvContent = document.getElementById('cv-content');
    
    printWindow.document.write(`
      <html>
        <head>
          <title>CV - ${formData.name}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; line-height: 1.6; }
            h1 { color: #1f2937; margin-bottom: 5px; }
            h2 { color: #374151; border-bottom: 2px solid #10b981; padding-bottom: 5px; margin-top: 20px; }
            .section { margin-bottom: 20px; }
            .label { font-weight: bold; color: #6b7280; }
            ul { list-style-type: disc; margin-left: 20px; }
          </style>
        </head>
        <body>
          ${cvContent.innerHTML}
        </body>
      </html>
    `);
    
    printWindow.document.close();
    printWindow.focus();
    
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-8">
        {/* Header - No Print */}
        <div className="flex justify-between items-center mb-6 no-print">
          <button
            onClick={() => navigate('/manage-application')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <FiArrowLeft className="text-xl" />
            <span className="font-semibold">Back to Applications</span>
          </button>

          <div className="flex gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <FiPrinter />
              <span className="font-medium">Print</span>
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <FiDownload />
              <span className="font-medium">Download</span>
            </button>
          </div>
        </div>

        {/* CV Content - Printable Area */}
        <div id="cv-content">
        {/* CV Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-1">{formData.name}</h1>
              <p className="text-xl text-gray-600 mb-3">{formData.position}</p>
              <div className="flex gap-4 text-sm text-gray-600">
                <span>{formData.email}</span>
                <span>•</span>
                <span>{formData.phone}</span>
                <span>•</span>
                <span>{formData.location}</span>
              </div>
            </div>
            <div className="flex gap-3 no-print">
              {!isEditing ? (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
                >
                  Edit Resume
                </button>
              ) : (
                <>
                  <button 
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleSave}
                    className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
                  >
                    Save Changes
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Education Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Education</h2>
          {formData.education.map((edu, index) => (
            <div key={index} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Degree</label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={edu.degree}
                    onChange={(e) => handleChange('education', index, 'degree', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">School/University</label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={edu.school}
                    onChange={(e) => handleChange('education', index, 'school', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={edu.year}
                    onChange={(e) => handleChange('education', index, 'year', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">GPA</label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={edu.gpa}
                    onChange={(e) => handleChange('education', index, 'gpa', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Experience Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Experience</h2>
          
          {formData.experience.map((exp, index) => (
            <div key={index} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={exp.position}
                    onChange={(e) => handleChange('experience', index, 'position', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={exp.company}
                    onChange={(e) => handleChange('experience', index, 'company', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={exp.startDate}
                    onChange={(e) => handleChange('experience', index, 'startDate', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="01/06/2024"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={exp.endDate}
                    onChange={(e) => handleChange('experience', index, 'endDate', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="01/08/2024"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  disabled={!isEditing}
                  value={exp.description}
                  onChange={(e) => handleChange('experience', index, 'description', e.target.value)}
                  rows="5"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Projects Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Projects</h2>
          
          {formData.projects.map((project, index) => (
            <div key={index} className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project {index + 1}
              </label>
              <textarea
                disabled={!isEditing}
                value={project}
                onChange={(e) => handleChange('projects', index, null, e.target.value)}
                rows="2"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>
          ))}
        </div>

        {/* Skills Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Skills</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Programming</label>
              <input
                type="text"
                disabled={!isEditing}
                value={formData.programming}
                onChange={(e) => handleChange('programming', null, null, e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Frameworks</label>
              <input
                type="text"
                disabled={!isEditing}
                value={formData.frameworks}
                onChange={(e) => handleChange('frameworks', null, null, e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tools</label>
              <input
                type="text"
                disabled={!isEditing}
                value={formData.tools}
                onChange={(e) => handleChange('tools', null, null, e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Soft-skill</label>
              <input
                type="text"
                disabled={!isEditing}
                value={formData.softSkills}
                onChange={(e) => handleChange('softSkills', null, null, e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* Certifications Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Certifications</h2>
          
          {formData.certifications.map((cert, index) => (
            <div key={index} className="mb-4">
              <input
                type="text"
                disabled={!isEditing}
                value={cert}
                onChange={(e) => handleChange('certifications', index, null, e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>
          ))}
        </div>

        {/* Extracurricular Activities Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Extracurricular Activities</h2>
          
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
              <input
                type="text"
                disabled={!isEditing}
                value={formData.extracurricular.role}
                onChange={(e) => handleChange('extracurricular', null, 'role', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Organization</label>
              <input
                type="text"
                disabled={!isEditing}
                value={formData.extracurricular.organization}
                onChange={(e) => handleChange('extracurricular', null, 'organization', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
            <input
              type="text"
              disabled={!isEditing}
              value={formData.extracurricular.year}
              onChange={(e) => handleChange('extracurricular', null, 'year', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              disabled={!isEditing}
              value={formData.extracurricular.description}
              onChange={(e) => handleChange('extracurricular', null, 'description', e.target.value)}
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>
        </div>

        {/* Languages Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Languages</h2>
          
          {formData.languages.map((lang, index) => (
            <div key={index} className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Language {index + 1}
                </label>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={lang.language}
                  onChange={(e) => handleChange('languages', index, 'language', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={lang.level}
                  onChange={(e) => handleChange('languages', index, 'level', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>
            </div>
          ))}
        </div>
        </div> {/* End CV Content */}
      </div>
    </div>
  );
};

export default CVCandidate;