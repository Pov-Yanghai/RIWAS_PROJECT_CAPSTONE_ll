

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiChevronDown, FiMail, FiCalendar, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import SideBar from "../components/SideBar";

const CandidateInfo = () => {
  const navigate = useNavigate();
  
  // Sample applications data with dates - FIXED: Unique IDs
  const [applications, setApplications] = useState([
    {
      id: 1,
      name: 'Eng Mengeang',
      position: 'Data Scientist',
      email: 'engmeneang@example.com',
      appliedDate: '2025-02-12',
      displayDate: '12/Feb/2025',
      status: 'Application',
      stage: 'Application',
      summary: 'Data Science student specializing in healthcare analytics and machine-learning-based health monitoring',
      skills: [
        'Programming: Python, JavaScript, SQL, R',
        'Frameworks: React, Flask, Node.js',
        'Tools: Git, Tableau, PostgreSQL, VS Code',
        'Soft Skills: Teamwork, Problem Solving, Adaptability, Time Management'
      ],
      certifications: [
        'CCNA Final Exam – Cisco Networking Academy (2024)'
      ],
      education: [
        'Bachelor of Computer Science - Royal University of Phnom Penh (2021-2025)',
        'GPA: 3.8/4.0'
      ],
      workExperience: [
        'Data Analysis Intern - ABC Healthcare (2024)',
        'Research Assistant - RUPP Data Lab (2023-2024)'
      ],
      avatar: '👤'
    },
    {
      id: 2,
      name: 'Touch Sopheak',
      position: 'Mobile App Developer',
      email: 'touchsopheak@example.com',
      appliedDate: '2025-02-11',
      displayDate: '11/Feb/2025',
      status: 'Screening',
      stage: 'Screening',
      summary: 'Mobile developer with 2 years of experience building cross-platform applications using React Native and Flutter',
      skills: [
        'Programming: JavaScript, Dart, Swift, Kotlin',
        'Frameworks: React Native, Flutter, Expo',
        'Tools: Xcode, Android Studio, Firebase',
        'Soft Skills: Communication, Leadership, Problem Solving'
      ],
      certifications: [
        'Mobile App Development Certificate – Google (2024)',
        'React Native Professional – Udemy (2023)'
      ],
      education: [
        'Bachelor of Software Engineering - Institute of Technology of Cambodia (2020-2024)',
        'GPA: 3.6/4.0'
      ],
      workExperience: [
        'Mobile Developer - Tech Startup Co. (2023-2025)',
        'Frontend Developer Intern - Digital Agency (2022-2023)'
      ],
      avatar: '👤'
    },
    {
      id: 3,
      name: 'Keo Veasna',
      position: 'Backend Developer',
      email: 'keoveasna@example.com',
      appliedDate: '2025-02-10',
      displayDate: '10/Feb/2025',
      status: 'Interview',
      stage: 'Interview',
      summary: 'Backend engineer specializing in microservices architecture and cloud-based solutions',
      skills: [
        'Programming: Java, Python, Go, SQL',
        'Frameworks: Spring Boot, Django, Express',
        'Tools: Docker, Kubernetes, AWS, MongoDB',
        'Soft Skills: Analytical Thinking, Team Collaboration'
      ],
      certifications: [
        'AWS Certified Solutions Architect (2024)',
        'Docker Certified Associate (2023)'
      ],
      education: [
        'Bachelor of Information Technology - National University of Management (2019-2023)',
        'GPA: 3.7/4.0'
      ],
      workExperience: [
        'Backend Engineer - FinTech Company (2023-Present)',
        'Software Developer - E-commerce Platform (2021-2023)'
      ],
      avatar: '👤'
    },
    {
      id: 4,
      name: 'Sok Dara',
      position: 'Data Analysis Intern',
      email: 'sokdara@example.com',
      appliedDate: '2025-02-09',
      displayDate: '09/Feb/2025',
      status: 'Assessment',
      stage: 'Assessment',
      summary: 'Creative designer with strong focus on user-centered design and accessibility',
      skills: [
        'Design Tools: Figma, Adobe XD, Sketch, Illustrator',
        'Prototyping: InVision, Framer, Principle',
        'Skills: User Research, Wireframing, Visual Design',
        'Soft Skills: Creativity, Empathy, Communication'
      ],
      certifications: [
        'Google UX Design Professional Certificate (2024)'
      ],
      education: [
        'Bachelor of Graphic Design - Royal University of Fine Arts (2020-2024)',
        'GPA: 3.9/4.0'
      ],
      workExperience: [
        'UX Designer Intern - Design Studio (2023-2024)',
        'Freelance Graphic Designer (2022-2023)'
      ],
      avatar: '👤'
    },
    {
      id: 5,
      name: 'Lim Chenda',
      position: 'Data Science Intern',
      email: 'limchenda@example.com',
      appliedDate: '2025-02-09',
      displayDate: '09/Feb/2025',
      status: 'Assessment',
      stage: 'Assessment',
      summary: 'Data science student with passion for AI and predictive modeling',
      skills: [
        'Programming: Python, R, SQL',
        'ML Libraries: scikit-learn, pandas, numpy',
        'Tools: Jupyter, Excel, Power BI',
        'Soft Skills: Analytical Thinking, Research, Communication'
      ],
      certifications: [
        'Google Data Analytics Certificate (2024)'
      ],
      education: [
        'Bachelor of Statistics - Royal University of Phnom Penh (2021-2025)',
        'GPA: 3.7/4.0'
      ],
      workExperience: [
        'Data Analyst Intern - Market Research Firm (2024)',
        'Statistics Tutor - RUPP (2023-2024)'
      ],
      avatar: '👤'
    },
    {
      id: 6,
      name: 'Pheakdey Chan',
      position: 'UI/UX Designer',
      email: 'pheakdey@example.com',
      appliedDate: '2025-02-09',
      displayDate: '09/Feb/2025',
      status: 'Assessment',
      stage: 'Assessment',
      summary: 'Creative designer with strong focus on user-centered design and accessibility',
      skills: [
        'Design Tools: Figma, Adobe XD, Sketch, Illustrator',
        'Prototyping: InVision, Framer, Principle',
        'Skills: User Research, Wireframing, Visual Design',
        'Soft Skills: Creativity, Empathy, Communication'
      ],
      certifications: [
        'Google UX Design Professional Certificate (2024)'
      ],
      education: [
        'Bachelor of Graphic Design - Royal University of Fine Arts (2020-2024)',
        'GPA: 3.9/4.0'
      ],
      workExperience: [
        'UI/UX Designer - Tech Company (2023-Present)',
        'Design Intern - Advertising Agency (2022-2023)'
      ],
      avatar: '👤'
    },
    {
      id: 7,
      name: 'Chhay Sophea',
      position: 'Data Scientist',
      email: 'chhaysophea@example.com',
      appliedDate: '2025-02-08',
      displayDate: '08/Feb/2025',
      status: 'Decision',
      stage: 'Decision',
      summary: 'Data scientist with expertise in machine learning and predictive analytics',
      skills: [
        'Programming: Python, R, SQL, Scala',
        'ML Libraries: TensorFlow, PyTorch, scikit-learn',
        'Tools: Jupyter, Tableau, Power BI',
        'Soft Skills: Critical Thinking, Presentation, Research'
      ],
      certifications: [
        'IBM Data Science Professional Certificate (2024)',
        'Machine Learning Specialization – Stanford (2023)'
      ],
      education: [
        'Master of Data Science - Royal University of Phnom Penh (2023-2025)',
        'Bachelor of Mathematics - RUPP (2019-2023)'
      ],
      workExperience: [
        'Data Scientist - AI Research Lab (2023-Present)',
        'ML Engineer - Tech Startup (2022-2023)',
        'Data Analyst - Consulting Firm (2021-2022)'
      ],
      avatar: '👤'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStage, setSelectedStage] = useState('All');
  const [selectedFilter, setSelectedFilter] = useState('Summary');
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 1)); // February 2025

  // Filter options
  const stages = ['All', 'Application', 'Screening', 'Interview', 'Assessment', 'References', 'Decision'];
  const filterOptions = ['Summary', 'Work Experience', 'Skill', 'Certification', 'Education'];
  
  // Status colors
  const getStatusColor = (status) => {
    const colors = {
      'Application': 'bg-blue-100 text-blue-700',
      'Screening': 'bg-purple-100 text-purple-700',
      'Interview': 'bg-yellow-100 text-yellow-700',
      'Assessment': 'bg-orange-100 text-orange-700',
      'References': 'bg-cyan-100 text-cyan-700',
      'Decision': 'bg-green-100 text-green-700'
    };
    return colors[status] || 'bg-gray-100 text-gray-700'
  };

  // Calendar functions
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const days = [];
    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    // Add actual days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const getApplicationCountForDate = (day) => {
    if (!day) return 0;
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return applications.filter(app => app.appliedDate === dateStr).length;
  };

  const handleDateClick = (day) => {
    if (!day) return;
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    setSelectedDate(dateStr);
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  // Handle search
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter applications
  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         app.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         app.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStage = selectedStage === 'All' || app.stage === selectedStage;
    const matchesDate = !selectedDate || app.appliedDate === selectedDate;
    
    return matchesSearch && matchesStage && matchesDate;
  });

  // Handle View CV
  const handleViewCV = (applicationId) => {
    console.log('Viewing CV for application:', applicationId);
    navigate(`/view-cv/${applicationId}`);
  };

  // Handle Reject - Auto send rejection email
  const handleReject = (applicationId) => {
    const app = applications.find(a => a.id === applicationId);
    if (window.confirm(`Are you sure you want to reject ${app.name}'s application?`)) {
      console.log(`Sending rejection email to ${app.name}`);
      alert(`Rejection email sent to ${app.name}`);
      setApplications(applications.filter(a => a.id !== applicationId));
    }
  };

  // Handle Next Stage - Smart navigation based on status
  const handleNextStage = (applicationId) => {
    const app = applications.find(a => a.id === applicationId);
    
    // If Application stage - auto send to Screening
    if (app.stage === 'Application') {
      console.log(`Auto-sending screening notification to ${app.name}`);
      alert(`Screening notification sent to ${app.name}!`);
      // Update status
      setApplications(applications.map(a => 
        a.id === applicationId ? { ...a, status: 'Screening', stage: 'Screening' } : a
      ));
    }
    // If Screening or Interview - go to notification page
    else if (app.stage === 'Screening' || app.stage === 'Interview') {
      navigate(`/send-notification/${applicationId}`, { state: { candidate: app } });
    }
    // If Assessment - go to Decision
    else if (app.stage === 'Assessment') {
      console.log(`Moving ${app.name} to Decision stage`);
      alert(`${app.name} moved to Decision stage`);
      setApplications(applications.map(a => 
        a.id === applicationId ? { ...a, status: 'Decision', stage: 'Decision' } : a
      ));
    }
    // If Decision - send offer letter
    else if (app.stage === 'Decision') {
      navigate(`/send-offer/${applicationId}`, { state: { candidate: app } });
    }
  };

  const days = getDaysInMonth(currentMonth);
  const monthName = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });

  // Count positions from applications
  const positionCount = applications.reduce((acc, app) => {
    const position = app.position;
    if (!position) return acc;
    acc[position] = (acc[position] || 0) + 1;
    return acc;
  }, {});

  // Total applications
  const totalApplications = applications.length;

  // Convert to array + calculate percentage
  const positionStats = Object.keys(positionCount)
    .map((position) => ({
      name: position,
      count: positionCount[position],
      percentage: Math.round(
        (positionCount[position] / totalApplications) * 100
      ),
    }))
    .sort((a, b) => b.count - a.count);

  // Dynamic color list
  const colors = [
    "bg-blue-400",
    "bg-green-400",
    "bg-purple-400",
    "bg-orange-400",
    "bg-red-400",
    "bg-indigo-400",
    "bg-pink-400",
    "bg-teal-400",
  ];

  const finalStats = positionStats.map((item, index) => ({
    ...item,
    color: colors[index % colors.length],
  }));

  return (
    <div className="min-h-screen font-sans text-slate-900 bg-gray-50">
      <style>{`
        /* Hide scrollbar for Chrome, Safari and Opera */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        /* Hide scrollbar for IE, Edge and Firefox */
        .scrollbar-hide {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>
      
      <div className="max-w-7xl mx-auto p-6 mr-20">
        <SideBar />
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Manage Application</h1>
          <div className="h-1 w-full bg-gradient-to-r from-green-400 to-green-500 rounded-full"></div>
        </div>

        <div className="grid grid-cols-3 lg:grid-cols-5 gap-6 mb-6">

          {/* Left Side - Filters and Applications (3 columns) */}
          <div className="lg:col-span-3 space-y-6">
            {/* Filters */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex flex-wrap gap-4 items-center">
                {/* Filter by Content Type */}
                <div className="relative">
                  <select
                    value={selectedFilter}
                    onChange={(e) => setSelectedFilter(e.target.value)}
                    className="appearance-none px-6 py-3 pr-10 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 bg-white cursor-pointer font-medium"
                  >
                    {filterOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>

                {/* Filter by Stage */}
                <div className="relative">
                  <select
                    value={selectedStage}
                    onChange={(e) => setSelectedStage(e.target.value)}
                    className="appearance-none px-6 py-3 pr-10 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 bg-white cursor-pointer font-medium"
                  >
                    {stages.map(stage => (
                      <option key={stage} value={stage}>{stage}</option>
                    ))}
                  </select>
                  <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>

                {/* Search */}
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearch}
                    placeholder="Search by name, position, or email..."
                    className="w-full px-6 py-3 pl-12 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500"
                  />
                  <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                </div>
              </div>
            </div>

            {/* Results Count */}
            <div>
              <p className="text-gray-600 font-medium">
                Showing <span className="text-gray-900 font-bold">{filteredApplications.length}</span> application{filteredApplications.length !== 1 ? 's' : ''}
                {selectedDate && ` on ${new Date(selectedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`}
              </p>
            </div>

            {/* Applications List - FIXED: Added scrollbar-hide class */}
            <div className="space-y-4 max-h-[700px] overflow-y-auto scrollbar-hide">   
              {filteredApplications.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                  <p className="text-xl text-gray-500">No applications found</p>
                  <p className="text-gray-400 mt-2">Try adjusting your filters or search query</p>
                </div>
              ) : (
                filteredApplications.map((app) => (
                  <div key={app.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    {/* Application Header */}
                    <div className="p-6">
                      <div className="flex items-start justify-between">
                        {/* Left Side - Applicant Info */}
                        <div className="flex items-start gap-4 flex-1">
                          {/* Avatar */}
                          <div className="w-16 h-16 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center text-white text-2xl flex-shrink-0">
                            {app.avatar}
                          </div>

                          {/* Info */}
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <h3 className="text-xl font-bold text-gray-900">{app.name}</h3>
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(app.status)}`}>
                                {app.status}
                              </span>
                            </div>
                            
                            <p className="text-gray-700 font-medium mb-2">{app.position}</p>
                            
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <div className="flex items-center gap-2">
                                <FiMail className="text-gray-400" />
                                <span>{app.email}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <FiCalendar className="text-gray-400" />
                                <span>Applied: {app.displayDate}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Content Display based on Filter - FIXED: Now properly responds to filter */}
                      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                        <h4 className="text-sm font-bold text-gray-700 mb-2 uppercase">
                          {selectedFilter}
                        </h4>
                        
                        {selectedFilter === 'Summary' && (
                          <p className="text-gray-700">{app.summary}</p>
                        )}
                        
                        {selectedFilter === 'Skill' && (
                          <ul className="space-y-1">
                            {app.skills.map((skill, idx) => (
                              <li key={idx} className="text-gray-700">• {skill}</li>
                            ))}
                          </ul>
                        )}
                        
                        {selectedFilter === 'Certification' && (
                          <ul className="space-y-1">
                            {app.certifications.map((cert, idx) => (
                              <li key={idx} className="text-gray-700">• {cert}</li>
                            ))}
                          </ul>
                        )}

                        {selectedFilter === 'Education' && (
                          <ul className="space-y-1">
                            {app.education.map((edu, idx) => (
                              <li key={idx} className="text-gray-700">• {edu}</li>
                            ))}
                          </ul>
                        )}

                        {selectedFilter === 'Work Experience' && (
                          <ul className="space-y-1">
                            {app.workExperience && app.workExperience.length > 0 ? (
                              app.workExperience.map((exp, idx) => (
                                <li key={idx} className="text-gray-700">• {exp}</li>
                              ))
                            ) : (
                              <p className="text-gray-500 italic">No work experience listed</p>
                            )}
                          </ul>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="border-t border-gray-200 p-4 bg-gray-50 rounded-b-xl flex items-center justify-between">
                      <button
                        onClick={() => handleViewCV(app.id)}
                        className="flex items-center gap-2 px-6 py-2.5 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-white transition-colors font-semibold"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z" />
                        </svg>
                        View CV
                      </button>

                      <div className="flex gap-3">
                        <button
                          onClick={() => handleReject(app.id)}
                          className="px-8 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-semibold"
                        >
                          Reject
                        </button>
                        <button
                          onClick={() => handleNextStage(app.id)}
                          className="px-8 py-2.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-semibold"
                        >
                          {app.stage === 'Decision' ? 'Send Offer' : 'Next Stage'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          
          {/* Right Side - Calendar Widget (2 columns) */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-xl text-gray-900">Applications</h3>
                <div className="flex gap-1">
                  <button onClick={prevMonth} className="p-1 hover:bg-gray-100 rounded">
                    <FiChevronLeft />
                  </button>
                  <button onClick={nextMonth} className="p-1 hover:bg-gray-100 rounded">
                    <FiChevronRight />
                  </button>
                </div>
              </div>
              
              <p className="text-sm text-gray-500 mb-4">{monthName}</p>
              
              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1 text-center text-xs">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                  <div key={i} className="font-semibold text-gray-600 py-1">{day}</div>
                ))}
                
                {days.map((day, index) => {
                  const count = getApplicationCountForDate(day);
                  const year = currentMonth.getFullYear();
                  const month = currentMonth.getMonth();
                  const dateStr = day ? `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}` : null;
                  const isSelected = dateStr === selectedDate;
                  
                  return (
                    <button
                      key={index}
                      onClick={() => handleDateClick(day)}
                      disabled={!day}
                      className={`aspect-square flex items-center justify-center rounded-lg text-sm relative transition-all ${
                        !day ? 'invisible' :
                        isSelected ? 'bg-green-400 text-white font-bold' :
                        count > 0 ? 'bg-green-50 text-gray-600 font-semibold hover:bg-green-100' :
                        'text-gray-400 hover:bg-gray-100'
                      }`}
                    >
                      {day}
                      {count > 0 && !isSelected && (
                        <span className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full"></span>
                      )}
                    </button>
                  );
                })}
              </div>

              {selectedDate && (
                <button
                  onClick={() => setSelectedDate(null)}
                  className="mt-4 w-full text-xs text-green-500 hover:text-green-400 font-medium"
                >
                  Clear date filter
                </button>
              )}
            </div>

            {/* Top Products Style Stats */}
            <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
              <h3 className="font-bold text-gray-900 mb-4">
                Top Positions
              </h3>
              {finalStats.length === 0 ? (
                <p className="text-gray-500 text-sm">
                  No applications yet
                </p>
              ) : (
                <div className="space-y-4">
                  {finalStats.map((item, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-gray-600">
                          {item.name}
                        </span>

                        <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
                          {item.percentage}%
                        </span>
                      </div>

                      <div className="w-full bg-gray-100 rounded-full h-2 relative">
                        <div
                          className={`${item.color} h-2 rounded-full transition-all duration-500`}
                          style={{ width: `${item.percentage}%` }}
                          title={`${item.count} candidate(s) applied`}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateInfo;






