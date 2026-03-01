
  const jobsData = [
  {
    id: 1,
    title: 'Backend Developer',
    department: 'Engineering',
    jobType: 'Full Time',
    minSalary: '1000',
    maxSalary: '2000',
    postedDate: '2025-11-11',
    applicationDeadline: '2025-12-31',
    location: 'Cambodia Academy of Digital Technology',
    applicants: 50,
    description: 'We are looking for an experienced Backend Developer to join our team and build scalable server-side applications.',
    requirements: [
      'Strong knowledge of Node.js and Express',
      '3+ years of experience in backend development',
      'Experience with databases (MongoDB, PostgreSQL)',
      'Understanding of RESTful APIs',
      'Familiarity with cloud platforms (AWS, Azure)',
      'Good problem-solving skills'
    ],
    responsibilities: [
      'Develop and maintain server-side applications',
      'Design and implement RESTful APIs',
      'Optimize database queries and performance',
      'Collaborate with frontend developers',
      'Write clean, maintainable code'
    ],
    status: 'active'
  },
  {
    id: 2,
    title: 'Full Stack Developer',
    department: 'Engineering',
    jobType: 'Full Time',
    minSalary: '1200',
    maxSalary: '2500',
    postedDate: '2025-11-11',
    applicationDeadline: '2025-12-31',
    location: 'Phnom Penh, Cambodia',
    applicants: 50,
    description: 'Join our team as a Full Stack Developer and work on exciting projects from frontend to backend.',
    requirements: [
      'Proficiency in React and Node.js',
      'Experience with modern web technologies',
      'Strong problem-solving skills',
      'Team player with excellent communication',
      'Experience with Git and version control',
      'Understanding of database design'
    ],
    responsibilities: [
      'Develop full-stack web applications',
      'Create responsive user interfaces',
      'Build and maintain APIs',
      'Participate in code reviews',
      'Collaborate with cross-functional teams'
    ],
    status: 'active'
  },
  {
    id: 3,
    title: 'Data Science Intern',
    department: 'Data Analytics',
    jobType: 'Internship',
    minSalary: '500',
    maxSalary: '800',
    postedDate: '2025-11-11',
    applicationDeadline: '2025-12-15',
    location: 'Remote',
    applicants: 50,
    description: 'Exciting internship opportunity for aspiring data scientists to gain hands-on experience.',
    requirements: [
      'Currently pursuing or recently completed degree in Computer Science/Statistics',
      'Knowledge of Python and data analysis libraries',
      'Understanding of machine learning concepts',
      'Strong analytical skills',
      'Familiarity with Pandas, NumPy, scikit-learn',
      'Good communication skills'
    ],
    responsibilities: [
      'Analyze large datasets',
      'Build predictive models',
      'Create data visualizations',
      'Collaborate with senior data scientists',
      'Present findings to stakeholders'
    ],
    status: 'active'
  },
  {
    id: 4,
    title: 'Cyber Security Analyst',
    department: 'Security',
    jobType: 'Full Time',
    minSalary: '1500',
    maxSalary: '3000',
    postedDate: '2025-11-11',
    applicationDeadline: '2026-01-15',
    location: 'Phnom Penh, Cambodia',
    applicants: 50,
    description: 'Protect our systems and data as a Cyber Security Analyst in our growing security team.',
    requirements: [
      'Experience in cybersecurity and threat analysis',
      'Knowledge of security frameworks and protocols',
      'Strong analytical and problem-solving skills',
      'Relevant certifications (CISSP, CEH) preferred',
      'Understanding of network security',
      'Experience with security tools and SIEM'
    ],
    responsibilities: [
      'Monitor security systems and networks',
      'Conduct security assessments',
      'Respond to security incidents',
      'Implement security policies',
      'Stay updated on latest threats'
    ],
    status: 'active'
  },
  {
    id: 5,
    title: 'Mobile App Developer',
    department: 'Mobile',
    jobType: 'Full Time',
    minSalary: '1100',
    maxSalary: '2200',
    postedDate: '2025-11-11',
    applicationDeadline: '2025-12-31',
    location: 'Phnom Penh, Cambodia',
    applicants: 50,
    description: 'Create amazing mobile experiences for iOS and Android platforms using modern frameworks.',
    requirements: [
      'Proficiency in React Native or Flutter',
      'Experience with mobile app development',
      'Understanding of mobile UI/UX principles',
      'Published apps in App Store or Play Store is a plus',
      'Knowledge of mobile architecture patterns',
      'Experience with mobile APIs and SDKs'
    ],
    responsibilities: [
      'Develop cross-platform mobile applications',
      'Implement mobile UI/UX designs',
      'Optimize app performance',
      'Integrate with backend APIs',
      'Test and debug mobile applications'
    ],
    status: 'active'
  },
  {
    id: 6,
    title: 'UI/UX Designer',
    department: 'Design',
    jobType: 'Full Time',
    minSalary: '900',
    maxSalary: '1800',
    postedDate: '2025-11-11',
    applicationDeadline: '2025-12-31',
    location: 'Phnom Penh, Cambodia',
    applicants: 50,
    description: 'Design beautiful and intuitive user interfaces and experiences for our digital products.',
    requirements: [
      'Strong portfolio showcasing UI/UX work',
      'Proficiency in Figma, Sketch, or Adobe XD',
      'Understanding of design principles and user psychology',
      'Experience with user research and testing',
      'Knowledge of design systems',
      'Good communication skills'
    ],
    responsibilities: [
      'Create user interface designs',
      'Conduct user research',
      'Develop wireframes and prototypes',
      'Collaborate with developers',
      'Maintain design systems'
    ],
    status: 'active'
  },
  {
    id: 7,
    title: 'DevOps Engineer',
    department: 'IT',
    jobType: 'Full-Time',
    location: 'Cambodia Academy of Digital Technology',
    salaryRange: '1000$ - 1800$',
    postedDate: '05/12/2025',
    deadline: '31/01/2026',
    description: 'Manage infrastructure and deployment pipelines.',
    requirements: [
      'Docker/Kubernetes',
      'CI/CD pipelines',
      'Cloud platforms (AWS/Azure)',
      'Linux administration',
      'Scripting (Bash/Python)'
    ],
    responsibilities: [
      'Manage cloud infrastructure',
      'Automate deployment processes',
      'Monitor system performance',
      'Ensure system reliability',
      'Implement security measures'
    ],
    id: 8,
    title: 'DevOps Engineer',
    department: 'Engineering',
    jobType: 'Full Time',
    minSalary: '1400',
    maxSalary: '2800',
    postedDate: '2025-11-11',
    applicationDeadline: '2026-01-31',
    location: 'Phnom Penh, Cambodia',
    applicants: 50,
    description: 'Build and maintain our infrastructure and deployment pipelines to support our growing platform.',
    requirements: [
      'Experience with CI/CD tools',
      'Knowledge of cloud platforms (AWS, Azure, GCP)',
      'Strong scripting skills',
      'Understanding of containerization (Docker, Kubernetes)',
      'Experience with infrastructure as code',
      'Knowledge of monitoring and logging tools'
    ],
    responsibilities: [
      'Maintain CI/CD pipelines',
      'Manage cloud infrastructure',
      'Automate deployment processes',
      'Monitor system performance',
      'Ensure system security and reliability'
    ],
    status: 'active'
  },
  {
    id: 9,
    title: 'IT Support Specialist',
    department: 'IT',
    jobType: 'Full-Time',
    location: 'Cambodia Academy of Digital Technology',
    salaryRange: '500$ - 900$',
    postedDate: '08/12/2025',
    deadline: '15/02/2026',
    description: 'Provide technical support to staff and users.',
    requirements: [
      'Hardware troubleshooting',
      'Windows/Mac OS',
      'Network basics',
      'Communication skills',
      'Problem-solving'
    ],
    responsibilities: [
      'Resolve technical issues',
      'Install and configure software',
      'Maintain IT equipment',
      'Document support tickets',
      'Train users on systems'
    ],
    id: 10,
    title: 'IT Support Specialist',
    jobType: 'Full Time',
    minSalary: '600',
    maxSalary: '1200',
    postedDate: '2025-11-11',
    applicationDeadline: '2025-12-20',
    location: 'Phnom Penh, Cambodia',
    applicants: 50,
    description: 'Provide technical support and maintain IT infrastructure for our growing organization.',
    requirements: [
      'Strong troubleshooting skills',
      'Experience with Windows and Mac systems',
      'Excellent communication skills',
      'Customer service oriented',
      'Knowledge of networking basics',
      'Ability to work under pressure'
    ],
    responsibilities: [
      'Provide technical support to users',
      'Troubleshoot hardware and software issues',
      'Maintain IT equipment',
      'Document support tickets',
      'Assist with IT projects'
    ],
    status: 'active'
  },
  {
    id: 11,
    title: 'QA Tester',
    department: 'IT',
    jobType: 'Full-Time',
    location: 'Cambodia Academy of Digital Technology',
    salaryRange: '600$ - 1000$',
    postedDate: '14/12/2025',
    deadline: '28/01/2026',
    description: 'Test software applications to ensure quality.',
    requirements: [
      'Testing methodologies',
      'Bug tracking tools',
      'Test case writing',
      'Attention to detail',
      'Basic programming'
    ],
    responsibilities: [
      'Create test plans',
      'Execute test cases',
      'Report and track bugs',
      'Verify bug fixes',
      'Document test results'
    ]
  },
  {
    id: 12,
    title: 'Database Administrator',
    department: 'IT',
    jobType: 'Full-Time',
    location: 'Cambodia Academy of Digital Technology',
    salaryRange: '900$ - 1600$',
    postedDate: '16/12/2025',
    deadline: '10/02/2026',
    description: 'Manage and optimize database systems.',
    requirements: [
      'SQL/PostgreSQL/MySQL',
      'Database optimization',
      'Backup strategies',
      'Security practices',
      'Performance tuning'
    ],
    responsibilities: [
      'Monitor database performance',
      'Implement backup procedures',
      'Optimize queries',
      'Ensure data security',
      'Troubleshoot database issues'
    ]
  },
  {
    id: 13,
    title: 'System Administrator',
    department: 'IT',
    jobType: 'Full-Time',
    location: 'Cambodia Academy of Digital Technology',
    salaryRange: '800$ - 1400$',
    postedDate: '11/12/2025',
    deadline: '05/02/2026',
    description: 'Maintain and configure IT systems and servers.',
    requirements: [
      'Linux/Windows Server',
      'Network configuration',
      'Security protocols',
      'Scripting',
      'System monitoring'
    ],
    responsibilities: [
      'Manage server infrastructure',
      'Configure network services',
      'Implement security policies',
      'Monitor system health',
      'Perform system upgrades'
    ]
  },
  {
    id: 14,
    title: 'Network Engineer',
    department: 'IT',
    jobType: 'Full-Time',
    location: 'Cambodia Academy of Digital Technology',
    salaryRange: '850$ - 1500$',
    postedDate: '13/12/2025',
    deadline: '20/02/2026',
    description: 'Design and maintain network infrastructure.',
    requirements: [
      'Network protocols',
      'Cisco/routing/switching',
      'Network security',
      'Troubleshooting',
      'CCNA certification preferred'
    ],
    responsibilities: [
      'Design network architecture',
      'Configure network devices',
      'Monitor network performance',
      'Troubleshoot connectivity issues',
      'Implement network security'
    ]
  },
  {
    id: 15,
    title: 'Quality Assurance Engineer',
    department: 'Quality Assurance',
    jobType: 'Full Time',
    minSalary: '700',
    maxSalary: '1400',
    postedDate: '2025-11-11',
    applicationDeadline: '2025-12-31',
    location: 'Phnom Penh, Cambodia',
    applicants: 50,
    description: 'Ensure quality and reliability of our products through rigorous testing and quality assurance.',
    requirements: [
      'Experience in software testing',
      'Knowledge of testing methodologies',
      'Attention to detail',
      'Familiarity with automation tools is a plus',
      'Understanding of SDLC',
      'Good analytical skills'
    ],
    responsibilities: [
      'Develop and execute test plans',
      'Identify and document bugs',
      'Perform regression testing',
      'Collaborate with development team',
      'Ensure product quality standards'
    ],
    status: 'active'
  }
];


export default jobsData;
