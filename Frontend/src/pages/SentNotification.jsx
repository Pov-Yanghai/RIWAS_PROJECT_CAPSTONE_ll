

// export default SendNotification;
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import {
  FiMail, FiFileText, FiCheckCircle, FiCalendar,
  FiMapPin, FiClock, FiChevronLeft, FiChevronRight,
  FiBell, FiAlertCircle, FiAward, FiTarget, FiLink,
  FiUser, FiPhone, FiDollarSign, FiInfo
} from 'react-icons/fi';

import SideBar from '../components/SideBar';

const SendNotification = () => {
  const navigate = useNavigate();
  const { applicationId } = useParams();
  const location = useLocation();

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const candidateData = location.state?.candidate || {
    name: 'Eng Mengeang',
    email: 'engmeneang@example.com',
    position: 'Data Scientist',
    stage: 'Screening',
    status: 'Screening'
  };

  const [candidate] = useState(candidateData);
  const [selectedNextStage, setSelectedNextStage] = useState('Interview');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const [formData, setFormData] = useState({
    subject: '',
    message: '',
    // Shared date field (used differently per stage)
    scheduledDate: '',
    scheduledTime: '',
    // Interview specific
    interviewLocation: '',
    interviewLink: '',
    interviewFormat: 'in-person', // 'in-person' | 'virtual' | 'phone'
    // Assessment specific
    assessmentType: '',
    assessmentDuration: '',
    assessmentLink: '',
    assessmentDeadline: '',
    // Decision specific
    decisionDate: '',
    decisionNotes: '',
    // References specific
    referencesDeadline: '',
    referencesCount: '2',
    // Screening specific
    screeningDate: '',
    screeningTime: '',
    screeningFormat: 'phone', // 'phone' | 'video' | 'email'
    screeningLink: '',
    // Job Offer specific
    offerSalary: '',
    offerStartDate: '',
    offerBenefits: '',
    offerDeadline: '',
    offerLocation: '',
    // Additional
    additionalNotes: ''
  });

  const progressPercentage = (currentStep / totalSteps) * 100;

  const getAvailableNextStages = (current) => {
    const stageFlow = {
      'Application': ['Screening', 'Interview'],
      'Screening': ['Interview', 'Assessment'],
      'Interview': ['Assessment', 'Decision'],
      'Assessment': ['Decision', 'References'],
      'Decision': ['References', 'Job Offer'],
      'References': ['Job Offer'],
      'Job Offer': []
    };
    return stageFlow[current] || ['Interview'];
  };

  const stageConfigs = {
    'Screening': {
      emoji: '🔍', bg: 'bg-purple-400', gradient: 'from-purple-500 to-purple-400',
      light: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-300',
      ring: 'ring-purple-50', description: 'Initial profile review and qualification check',
      dateLabel: 'Screening Call Date', timeLabel: 'Call Time'
    },
    'Interview': {
      emoji: '💼', bg: 'bg-blue-400', gradient: 'from-blue-500 to-blue-400',
      light: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-300',
      ring: 'ring-blue-50', description: 'Face-to-face or virtual interview session',
      dateLabel: 'Interview Date', timeLabel: 'Interview Time'
    },
    'Assessment': {
      emoji: '📝', bg: 'bg-orange-400', gradient: 'from-orange-500 to-orange-400',
      light: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-300',
      ring: 'ring-orange-50', description: 'Technical or skills assessment evaluation',
      dateLabel: 'Assessment Deadline', timeLabel: 'Submission Time'
    },
    'Decision': {
      emoji: '🎯', bg: 'bg-green-500', gradient: 'from-green-600 to-green-500',
      light: 'bg-green-50', text: 'text-green-700', border: 'border-green-300',
      ring: 'ring-green-50', description: 'Final candidate evaluation and decision making',
      dateLabel: 'Decision Date', timeLabel: 'Expected Time'
    },
    'References': {
      emoji: 'P', bg: 'bg-gray-400', gradient: 'from-gray-500 to-gray-400',
      light: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-300',
      ring: 'ring-gray-50', description: 'Reference check and background verification',
      dateLabel: 'Submission Deadline', timeLabel: 'Deadline Time'
    },
    'Job Offer': {
      emoji: '💼', bg: 'bg-green-400', gradient: 'from-green-500 to-green-400',
      light: 'bg-green-50', text: 'text-green-700', border: 'border-green-300',
      ring: 'ring-green-50', description: 'Formal job offer with terms and conditions',
      dateLabel: 'Offer Expiry Date', timeLabel: 'Response Deadline'
    }
  };

  const stageColor = stageConfigs[selectedNextStage] || stageConfigs['Interview'];

  const requiresScreeningDetails = selectedNextStage === 'Screening';
  const requiresInterviewDetails = selectedNextStage === 'Interview';
  const requiresAssessmentDetails = selectedNextStage === 'Assessment';
  const requiresDecisionDetails = selectedNextStage === 'Decision';
  const requiresReferencesDetails = selectedNextStage === 'References';
  const requiresOfferDetails = selectedNextStage === 'Job Offer';

  // ─── Helper: format date string to readable ───────────────────────────────
  const fmtDate = (dateStr, opts = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) => {
    if (!dateStr) return null;
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-US', opts);
  };

  const fmtTime = (timeStr) => {
    if (!timeStr) return null;
    const [h, m] = timeStr.split(':');
    const hour = parseInt(h);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${m} ${ampm}`;
  };

  // ─── Build fully-resolved message (no placeholders) ──────────────────────
  const buildResolvedMessage = (stage, fd, cand) => {
    const templates = {
      'Screening': () => {
        const dateStr = fd.screeningDate ? fmtDate(fd.screeningDate) : '[Date TBD]';
        const timeStr = fd.screeningTime ? fmtTime(fd.screeningTime) : '[Time TBD]';
        const formatMap = { phone: 'Phone Call', video: 'Video Call', email: 'Email Interview' };
        const fmt = formatMap[fd.screeningFormat] || 'Phone Call';
        const linkLine = fd.screeningLink ? `\nLink / Dial-in: ${fd.screeningLink}` : '';
        return `Dear ${cand.name},

Thank you for your application for the ${cand.position} position.

We are pleased to inform you that your application has passed our initial review! We would like to schedule a screening ${fmt.toLowerCase()} with you.

 Screening Details:
Date: ${dateStr}
Time: ${timeStr}
Format: ${fmt}${linkLine}

Please confirm your availability by responding to this email. If you have any questions, don't hesitate to reach out.

${fd.additionalNotes ? `Additional Information:\n${fd.additionalNotes}\n\n` : ''}Best regards,
HR Recruitment Team`;
      },

      'Interview': () => {
        const dateStr = fd.interviewDate ? fmtDate(fd.interviewDate) : '[Date TBD]';
        const timeStr = fd.interviewTime ? fmtTime(fd.interviewTime) : '[Time TBD]';
        const formatMap = { 'in-person': 'In-Person', virtual: 'Virtual / Online', phone: 'Phone Interview' };
        const fmt = formatMap[fd.interviewFormat] || 'In-Person';
        const locationOrLink =
          fd.interviewFormat === 'virtual' && fd.interviewLink
            ? `Meeting Link: ${fd.interviewLink}`
            : fd.interviewFormat === 'phone' && fd.interviewLink
            ? `Dial-in Number: ${fd.interviewLink}`
            : fd.interviewLocation
            ? `Location: ${fd.interviewLocation}`
            : '[Location TBD]';
        return `Dear ${cand.name},

Congratulations! We would like to invite you for an interview for the ${cand.position} position.

 Interview Details:
Date: ${dateStr}
Time: ${timeStr}
Format: ${fmt}
${locationOrLink}

 Please bring a copy of your resume and be prepared to discuss your experience and background.

Please confirm your attendance by responding to this email.

${fd.additionalNotes ? `Additional Notes:\n${fd.additionalNotes}\n\n` : ''}Best regards,
HR Recruitment Team`;
      },

      'Assessment': () => {
        const deadlineStr = fd.assessmentDeadline ? fmtDate(fd.assessmentDeadline) : '[Deadline TBD]';
        const linkLine = fd.assessmentLink ? `\nAssessment Link: ${fd.assessmentLink}` : '\nYou will receive the assessment link separately via email.';
        return `Dear ${cand.name},

Thank you for your excellent interview. We would like to invite you to complete a technical assessment for the ${cand.position} position.

Assessment Details:
Type: ${fd.assessmentType || '[Type TBD]'}
Duration: ${fd.assessmentDuration || '[Duration TBD]'}
Submission Deadline: ${deadlineStr}${linkLine}

Please complete and submit the assessment before the deadline. Ensure you have a stable internet connection before starting.

${fd.additionalNotes ? `Additional Notes:\n${fd.additionalNotes}\n\n` : ''}Best regards,
HR Recruitment Team`;
      },

      'Decision': () => {
        const dateStr = fd.decisionDate ? fmtDate(fd.decisionDate) : '[Date TBD]';
        return `Dear ${cand.name},

Thank you for your patience throughout our recruitment process for the ${cand.position} position.

We are currently in the final stages of our decision-making process.

What to Expect:
You will be notified of our decision by: ${dateStr}

${fd.decisionNotes ? `Additional Information:\n${fd.decisionNotes}\n\n` : ''}We appreciate your interest and the time you have invested in this process.

${fd.additionalNotes ? ` Additional Notes:\n${fd.additionalNotes}\n\n` : ''}Best regards,
HR Recruitment Team`;
      },

      'References': () => {
        const deadlineStr = fd.referencesDeadline ? fmtDate(fd.referencesDeadline) : '[Deadline TBD]';
        const count = fd.referencesCount || '2';
        return `Dear ${cand.name},

Congratulations — you are among our top candidates for the ${cand.position} position!

As part of our final evaluation, we require professional references to complete your application.

 Reference Check Requirements:
Number of References: ${count} professional references
Submission Deadline: ${deadlineStr}

For each reference, please provide:
• Full name and job title
• Company and relationship to you
• Email address and phone number

Please send your references to this email by the deadline above.

${fd.additionalNotes ? ` Additional Notes:\n${fd.additionalNotes}\n\n` : ''}Best regards,
HR Recruitment Team`;
      },

      'Job Offer': () => {
        const startDateStr = fd.offerStartDate ? fmtDate(fd.offerStartDate, { month: 'long', day: 'numeric', year: 'numeric' }) : '[Start Date TBD]';
        const expiryStr = fd.offerDeadline ? fmtDate(fd.offerDeadline) : '[Expiry Date TBD]';
        return `Dear ${cand.name},

We are thrilled to extend a formal job offer for the position of ${cand.position}!

 Offer Details:
Position: ${cand.position}
Salary: ${fd.offerSalary || '[Salary TBD]'}
Start Date: ${startDateStr}
Work Location: ${fd.offerLocation || '[Location TBD]'}
Benefits: ${fd.offerBenefits || '[Benefits TBD]'}

Offer Expiry: Please review and respond by ${expiryStr}

We are excited about the possibility of having you join our team and look forward to your positive response.

${fd.additionalNotes ? ` Additional Notes:\n${fd.additionalNotes}\n\n` : ''}Best regards,
HR Recruitment Team`;
      }
    };

    return templates[stage] ? templates[stage]() : '';
  };

  // ─── Email subject templates ──────────────────────────────────────────────
  const getSubject = (stage, position) => {
    const subjects = {
      'Screening': ` Screening Call Invitation — ${position}`,
      'Interview': `Interview Invitation — ${position}`,
      'Assessment': ` Technical Assessment — ${position}`,
      'Decision': `Application Status Update — ${position}`,
      'References': ` Reference Check Request — ${position}`,
      'Job Offer': ` Congratulations — Job Offer for ${position}!`
    };
    return subjects[stage] || `Notification — ${position}`;
  };

  // ─── Sync subject when stage changes ─────────────────────────────────────
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      subject: getSubject(selectedNextStage, candidate.position),
      // Reset stage-specific fields
      scheduledDate: '',
      scheduledTime: '',
      interviewDate: '',
      interviewTime: '',
      interviewLocation: '',
      interviewLink: '',
      interviewFormat: 'in-person',
      assessmentDeadline: '',
      assessmentLink: '',
      assessmentType: '',
      assessmentDuration: '',
      decisionDate: '',
      decisionNotes: '',
      referencesDeadline: '',
      referencesCount: '2',
      screeningDate: '',
      screeningTime: '',
      screeningFormat: 'phone',
      screeningLink: '',
      offerSalary: '',
      offerStartDate: '',
      offerBenefits: '',
      offerDeadline: '',
      offerLocation: '',
      additionalNotes: ''
    }));
    setSelectedDate(null);
  }, [selectedNextStage]);

  // ─── Live-update message as user types ───────────────────────────────────
  useEffect(() => {
    const resolved = buildResolvedMessage(selectedNextStage, formData, candidate);
    setFormData(prev => {
      if (prev.message === resolved) return prev;
      return { ...prev, message: resolved };
    });
  }, [
    selectedNextStage,
    formData.screeningDate, formData.screeningTime, formData.screeningFormat, formData.screeningLink,
    formData.interviewDate, formData.interviewTime, formData.interviewLocation,
    formData.interviewLink, formData.interviewFormat,
    formData.assessmentType, formData.assessmentDuration, formData.assessmentLink, formData.assessmentDeadline,
    formData.decisionDate, formData.decisionNotes,
    formData.referencesDeadline, formData.referencesCount,
    formData.offerSalary, formData.offerStartDate, formData.offerBenefits, formData.offerDeadline, formData.offerLocation,
    formData.additionalNotes
  ]);

  // ─── Determine which date field calendar should drive ─────────────────────
  const getActiveDateField = () => {
    if (requiresScreeningDetails) return 'screeningDate';
    if (requiresInterviewDetails) return 'interviewDate';
    if (requiresAssessmentDetails) return 'assessmentDeadline';
    if (requiresDecisionDetails) return 'decisionDate';
    if (requiresReferencesDetails) return 'referencesDeadline';
    if (requiresOfferDetails) {
      if (currentStep === 3) return 'offerStartDate';
      return 'offerDeadline';
    }
    return null;
  };

  // ─── Calendar ─────────────────────────────────────────────────────────────
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(i);
    return days;
  };

  const handleDateClick = (day) => {
    if (!day) return;
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    setSelectedDate(dateStr);
    const field = getActiveDateField();
    if (field) setFormData(prev => ({ ...prev, [field]: dateStr }));
  };

  const handleChange = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

  const handleSendNotification = () => {
    if (!formData.subject.trim()) return alert('Please enter an email subject');
    if (!formData.message.trim()) return alert('Please enter an email message');
    if (requiresScreeningDetails && !formData.screeningDate) return alert('Please select a screening date');
    if (requiresInterviewDetails && !formData.interviewDate) return alert('Please select an interview date');
    if (requiresInterviewDetails && !formData.interviewTime) return alert('Please enter interview time');
    if (requiresAssessmentDetails && !formData.assessmentType) return alert('Please enter assessment type');
    if (requiresOfferDetails && !formData.offerSalary) return alert('Please enter offer salary');

    alert(`${selectedNextStage} notification sent to ${candidate.name}!`);
    navigate('/manage-application');
  };

  const days = getDaysInMonth(currentMonth);
  const monthName = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });
  const availableStages = getAvailableNextStages(candidate.stage);

  // Calendar date label per stage
  const getCalendarLabel = () => {
    if (requiresScreeningDetails) return 'Screening Call Date';
    if (requiresInterviewDetails) return 'Interview Date';
    if (requiresAssessmentDetails) return 'Assessment Deadline';
    if (requiresDecisionDetails) return 'Decision By Date';
    if (requiresReferencesDetails) return 'References Deadline';
    if (requiresOfferDetails) return currentStep === 3 ? 'Proposed Start Date' : 'Offer Expiry Date';
    return 'Select Date';
  };

  // Get currently active date for calendar display
  const getActiveDate = () => {
    if (requiresScreeningDetails) return formData.screeningDate;
    if (requiresInterviewDetails) return formData.interviewDate;
    if (requiresAssessmentDetails) return formData.assessmentDeadline;
    if (requiresDecisionDetails) return formData.decisionDate;
    if (requiresReferencesDetails) return formData.referencesDeadline;
    if (requiresOfferDetails) return formData.offerStartDate || formData.offerDeadline;
    return selectedDate;
  };

  const activeDate = getActiveDate();

  const steps = [
    { number: 1, title: 'Stage Selection', icon: FiTarget },
    { number: 2, title: 'Email Content', icon: FiMail },
    {
      number: 3,
      title: requiresInterviewDetails ? 'Interview Details'
        : requiresAssessmentDetails ? 'Assessment Details'
        : requiresOfferDetails ? 'Offer Details'
        : requiresScreeningDetails ? 'Screening Details'
        : requiresDecisionDetails ? 'Decision Details'
        : requiresReferencesDetails ? 'References Details'
        : 'Additional Info',
      icon: requiresInterviewDetails ? FiCalendar
        : requiresAssessmentDetails ? FiFileText
        : requiresOfferDetails ? FiAward
        : requiresScreeningDetails ? FiPhone
        : requiresDecisionDetails ? FiTarget
        : requiresReferencesDetails ? FiPhone
        : FiFileText
    },
    { number: 4, title: 'Review & Send', icon: FiCheckCircle }
  ];

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
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Send Notification</h1>
          <div className="h-1 w-full bg-gradient-to-r from-green-400 to-green-500 rounded-full"></div>
        </div>

        {/* ═══ OUTER GRID: fixed left, scrollable right ═══════════════════════ */}
        <div className="flex gap-8 items-start">

          {/* ──── LEFT SIDEBAR (sticky) ──────────────────────────────────────── */}
          <div className="w-72 flex-shrink-0 sticky top-6 space-y-4">

            {/* Candidate Card */}
            <div className="bg-white rounded-xl shadow-sm p-5 border-2 border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                  {candidate.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-gray-900 truncate">{candidate.name}</p>
                  <p className="text-sm text-gray-500 truncate">{candidate.position}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-600">
                  <FiMail className="text-blue-500 flex-shrink-0 text-sm" />
                  <span className="text-sm break-all">{candidate.email}</span>
                </div>
                <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-sm font-medium">
                  Current: {candidate.stage}
                </span>
              </div>
            </div>

            {/* Calendar — always visible, adapts label per stage */}
            <div className="bg-white rounded-xl shadow-sm p-4 border-2 border-gray-100">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <h3 className="font-bold text-gray-900 text-sm leading-tight">{getCalendarLabel()}</h3>
                  {activeDate && (
                    <p className={`text-sm font-semibold mt-0.5 ${stageColor.text}`}>
                      {fmtDate(activeDate, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  )}
                </div>
                <div className="flex gap-0.5">
                  <button
                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                  >
                    <FiChevronLeft className="text-sm" />
                  </button>
                  <button
                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                  >
                    <FiChevronRight className="text-sm" />
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-400 mb-2">{monthName}</p>
              <div className="grid grid-cols-7 gap-0.5 text-center">
                {['S','M','T','W','T','F','S'].map((d, i) => (
                  <div key={i} className="text-sm font-semibold text-gray-400 py-1">{d}</div>
                ))}
                {days.map((day, idx) => {
                  const year = currentMonth.getFullYear();
                  const month = currentMonth.getMonth();
                  const dateStr = day ? `${year}-${String(month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}` : null;
                  const isSelected = dateStr === activeDate;
                  const isToday = dateStr === new Date().toISOString().split('T')[0];
                  const isPast = dateStr && new Date(dateStr) < new Date(new Date().setHours(0,0,0,0));
                  return (
                    <button key={idx} onClick={() => handleDateClick(day)}
                      disabled={!day || isPast}
                      className={`aspect-square flex items-center justify-center rounded text-sm transition-all ${
                        !day ? 'invisible' :
                        isPast ? 'text-gray-300 cursor-not-allowed' :
                        isSelected ? `bg-gradient-to-br ${stageColor.gradient} text-white font-bold shadow` :
                        isToday ? 'bg-green-100 text-green-700 font-semibold ring-1 ring-green-400' :
                        'hover:bg-gray-100 text-gray-700'
                      }`}>
                      {day}
                    </button>
                  );
                })}
              </div>
              {!activeDate && (
                <p className="text-sm text-center mt-2 text-gray-400">Click a date to select</p>
              )}
            </div>

            {/* Stage Status Card */}
            <div className={`${stageColor.light} rounded-xl p-4 border-2 ${stageColor.border}`}>
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-10 h-10 bg-gradient-to-br ${stageColor.gradient} rounded-full flex items-center justify-center text-white shadow-sm text-lg flex-shrink-0`}>
                  {stageColor.emoji}
                </div>
                <div>
                  <p className="text-sm text-gray-400">Moving To</p>
                  <p className={`font-bold text-sm ${stageColor.text}`}>{selectedNextStage}</p>
                </div>
              </div>
              <p className="text-sm text-gray-500 mb-2">{stageColor.description}</p>
              <div className="border-t border-gray-200 pt-2 flex justify-between text-sm">
                <span className="text-gray-400">From: <span className="font-semibold text-gray-700">{candidate.stage}</span></span>
                <span className={`font-bold ${stageColor.text}`}> To: {selectedNextStage}</span>
              </div>
            </div>

            {/* Notices */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-7">
              <div className="flex items-start gap-2">
                <FiCheckCircle className="text-green-500 mt-0.5 flex-shrink-0 text-lg" />
                <p className="text-sm text-green-700"><span className="font-bold">Auto-Tracking:</span> Notifications are logged automatically.</p>
              </div>
            </div>

            {availableStages.length > 1 && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-7">
                <div className="flex items-start gap-2">
                  <FiAlertCircle className="text-blue-500 mt-0.5 flex-shrink-0 text-lg" />
                  <p className="text-sm text-blue-700"><span className="font-bold">Stage Flexibility:</span> Select the most appropriate next stage.</p>
                </div>
              </div>
            )}
          </div>

          {/* ──── RIGHT CONTENT (scrollable) ────────────────────────────────── */}
          <div className="flex-1 min-w-0 space-y-6 overflow-y-auto max-h-screen pb-8">

            {/* Progress Steps */}
            <div className="bg-white rounded-xl shadow-sm p-5 border-2 border-gray-100">
              <div className="flex items-center justify-between">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  const isActive = currentStep === step.number;
                  const isCompleted = currentStep > step.number;
                  return (
                    <React.Fragment key={step.number}>
                      <button
                        onClick={() => { if (step.number <= currentStep) setCurrentStep(step.number); }}
                        disabled={step.number > currentStep}
                        className="flex flex-col items-center gap-1.5 flex-1"
                      >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-sm ${
                          isCompleted ? `bg-gradient-to-br ${stageColor.gradient} text-white` :
                          isActive ? `bg-gradient-to-br ${stageColor.gradient} text-white ring-4 ${stageColor.ring}` :
                          'bg-gray-100 text-gray-400'
                        } ${step.number > currentStep ? 'cursor-not-allowed opacity-40' : 'cursor-pointer'}`}>
                          {isCompleted ? <FiCheckCircle className="text-base" /> : <Icon className="text-base" />}
                        </div>
                        <span className={`text-sm font-semibold text-center leading-tight ${
                          isActive ? stageColor.text : isCompleted ? 'text-gray-600' : 'text-gray-400'
                        }`}>{step.title}</span>
                      </button>
                      {index < steps.length - 1 && (
                        <div className={`h-0.5 flex-1 mx-2 ${isCompleted ? `bg-gradient-to-r ${stageColor.gradient}` : 'bg-gray-200'}`} />
                      )}
                    </React.Fragment>
                  );
                })}
              </div>

              {/* Progress bar */}
              <div className="mt-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-semibold text-gray-500">Progress</span>
                  <span className={`text-sm font-bold ${stageColor.text}`}>{Math.round(progressPercentage)}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div className={`bg-gradient-to-r ${stageColor.gradient} h-2 rounded-full transition-all duration-700`}
                    style={{ width: `${progressPercentage}%` }} />
                </div>
              </div>
            </div>

            {/* ── Content Card ── */}
            <div className="bg-white rounded-xl shadow-sm p-8 border-2 border-gray-100">

              {/* ════ STEP 1: Stage Selection ════════════════════════════════ */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">Select Next Stage</h2>
                    <p className="text-gray-500 text-sm">Choose which stage to move this candidate to</p>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4 border-2 border-gray-200">
                    <label className="block text-sm font-semibold text-gray-600 mb-2">Current Stage</label>
                    <div className="flex items-center gap-3 p-3 bg-white rounded-lg border-2 border-gray-200">
                      <div className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center text-lg">📋</div>
                      <div>
                        <p className="font-bold text-gray-900">{candidate.stage}</p>
                        <p className="text-sm text-gray-500">Current pipeline position</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Select Next Stage <span className="text-red-500">*</span>
                    </label>
                    {availableStages.length === 0 ? (
                      <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6 text-center">
                        <p className="text-yellow-800 font-semibold">This candidate is at the final stage.</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {availableStages.map(stage => {
                          const config = stageConfigs[stage];
                          const isSelected = selectedNextStage === stage;
                          return (
                            <button key={stage} onClick={() => setSelectedNextStage(stage)}
                              className={`p-5 rounded-xl border-2 transition-all text-left ${
                                isSelected
                                  ? `${config.border} ${config.light} shadow-lg scale-105`
                                  : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                              }`}>
                              <div className="flex items-start gap-3 mb-2">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl flex-shrink-0 ${
                                  isSelected ? `bg-gradient-to-br ${config.gradient} text-white shadow` : 'bg-gray-100'
                                }`}>
                                  {config.emoji}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className={`font-bold ${isSelected ? config.text : 'text-gray-900'}`}>{stage}</p>
                                  <p className="text-sm text-gray-500 mt-0.5">{config.description}</p>
                                </div>
                              </div>
                              {isSelected && (
                                <div className={`flex items-center gap-1 text-sm font-semibold ${config.text}`}>
                                  <FiCheckCircle /><span>Selected</span>
                                </div>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Flow Visualization */}
                  <div className="bg-blue-50 border-2 border-blue-100 rounded-xl p-4">
                    <p className="text-sm font-bold text-blue-800 mb-3">📍 Typical Hiring Flow</p>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {['Application','Screening','Interview','Assessment','Decision','References','Job Offer'].map((stage, idx, arr) => (
                        <React.Fragment key={stage}>
                          <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                            stage === candidate.stage ? 'bg-blue-600 text-white font-bold' :
                            stage === selectedNextStage ? 'bg-green-600 text-white font-bold' :
                            'bg-white text-blue-700 border border-blue-200'
                          }`}>{stage}</span>
                          {idx < arr.length - 1 && <span className="text-blue-300 text-sm">→</span>}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ════ STEP 2: Email Content ═══════════════════════════════════ */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">Email Content</h2>
                    <p className="text-gray-500 text-sm">Customize the notification email</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Subject <span className="text-red-500">*</span>
                    </label>
                    <input type="text" value={formData.subject}
                      onChange={(e) => handleChange('subject', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-400"
                      placeholder="Enter email subject" />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mt-1">
                      Email Message Preview <span className="text-red-500">*</span>
                    </label>
                    <textarea value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      rows="10"
                      className="w-full mt-3 px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 resize-none text-sm"
                      placeholder="Edit message here..." />
                    <p className="text-sm text-gray-400">
                      💡 Message auto-fills as you enter details in Step 3. You can also edit directly below.
                    </p>
                  </div>
                </div>
              )}

              {/* ════ STEP 3: Stage-Specific Details ════════════════════════ */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">
                      {requiresScreeningDetails ? 'Screening Details'
                        : requiresInterviewDetails ? 'Interview Details'
                        : requiresAssessmentDetails ? 'Assessment Details'
                        : requiresDecisionDetails ? 'Decision Details'
                        : requiresReferencesDetails ? 'References Details'
                        : requiresOfferDetails ? 'Offer Details'
                        : 'Additional Information'}
                    </h2>
                    <p className="text-gray-500 text-sm">
                      These details will be included directly in the email sent to {candidate.name}.
                    </p>
                  </div>

                  {/* ── Screening ── */}
                  {requiresScreeningDetails && (
                    <div className="space-y-5">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Screening Format</label>
                        <div className="grid grid-cols-3 gap-3">
                          {[
                            { value: 'phone', label: 'Phone Call' },
                            { value: 'video', label: 'Video Call' },
                            { value: 'email', label: ' Email Q&A' }
                          ].map(opt => (
                            <button key={opt.value}
                              onClick={() => handleChange('screeningFormat', opt.value)}
                              className={`py-2 px-3 rounded-lg border-2 text-sm font-medium transition-all ${
                                formData.screeningFormat === opt.value
                                  ? `${stageColor.border} ${stageColor.light} ${stageColor.text}`
                                  : 'border-gray-200 text-gray-600 hover:border-gray-300'
                              }`}>
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                            <FiCalendar className="text-purple-500" /> Screening Date <span className="text-red-500">*</span>
                          </label>
                          <input type="date" value={formData.screeningDate}
                            onChange={(e) => { handleChange('screeningDate', e.target.value); setSelectedDate(e.target.value); }}
                            min={new Date().toISOString().split('T')[0]}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-400" />
                        </div>
                        <div>
                          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                            <FiClock className="text-purple-500" /> Screening Time <span className="text-red-500">*</span>
                          </label>
                          <input type="time" value={formData.screeningTime}
                            onChange={(e) => handleChange('screeningTime', e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-400" />
                        </div>
                      </div>
                      {formData.screeningFormat !== 'email' && (
                        <div>
                          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                            <FiLink className="text-purple-500" />
                            {formData.screeningFormat === 'phone' ? 'Dial-in Number / Link' : 'Meeting Link (Zoom / Google Meet / Teams)'}
                          </label>
                          <input type="text" value={formData.screeningLink}
                            onChange={(e) => handleChange('screeningLink', e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-400"
                            placeholder={formData.screeningFormat === 'phone' ? 'e.g., +1-800-555-0100' : 'e.g., https://zoom.us/j/...'} />
                        </div>
                      )}
                    </div>
                  )}

                  {/* ── Interview ── */}
                  {requiresInterviewDetails && (
                    <div className="space-y-5">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Interview Format</label>
                        <div className="grid grid-cols-3 gap-3">
                          {[
                            { value: 'in-person', label: 'In-Person' },
                            { value: 'virtual', label: ' Virtual' },
                            { value: 'phone', label: ' Phone' }
                          ].map(opt => (
                            <button key={opt.value}
                              onClick={() => handleChange('interviewFormat', opt.value)}
                              className={`py-2 px-3 rounded-lg border-2 text-sm font-medium transition-all ${
                                formData.interviewFormat === opt.value
                                  ? `${stageColor.border} ${stageColor.light} ${stageColor.text}`
                                  : 'border-gray-200 text-gray-600 hover:border-gray-300'
                              }`}>
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                            <FiCalendar className="text-blue-500" /> Interview Date <span className="text-red-500">*</span>
                          </label>
                          <input type="date" value={formData.interviewDate}
                            onChange={(e) => { handleChange('interviewDate', e.target.value); setSelectedDate(e.target.value); }}
                            min={new Date().toISOString().split('T')[0]}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-400" />
                        </div>
                        <div>
                          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                            <FiClock className="text-blue-500" /> Interview Time <span className="text-red-500">*</span>
                          </label>
                          <input type="time" value={formData.interviewTime}
                            onChange={(e) => handleChange('interviewTime', e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-400" />
                        </div>
                      </div>
                      {formData.interviewFormat === 'in-person' ? (
                        <div>
                          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                            <FiMapPin className="text-red-500" /> Interview Location <span className="text-red-500">*</span>
                          </label>
                          <input type="text" value={formData.interviewLocation}
                            onChange={(e) => handleChange('interviewLocation', e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-400"
                            placeholder="e.g., Room 301, 3rd Floor, HQ Building, Phnom Penh" />
                        </div>
                      ) : (
                        <div>
                          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                            <FiLink className="text-blue-500" />
                            {formData.interviewFormat === 'virtual' ? 'Meeting Link (Zoom / Google Meet / Teams)' : 'Dial-in Number'}
                            <span className="text-red-500">*</span>
                          </label>
                          <input type="text" value={formData.interviewLink}
                            onChange={(e) => handleChange('interviewLink', e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-400"
                            placeholder={formData.interviewFormat === 'virtual' ? 'https://zoom.us/j/123456789' : '+855-962-882-444 '} />
                        </div>
                      )}
                    </div>
                  )}

                  {/* ── Assessment ── */}
                  {requiresAssessmentDetails && (
                    <div className="space-y-5">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Assessment Type <span className="text-red-500">*</span>
                        </label>
                        <select value={formData.assessmentType}
                          onChange={(e) => handleChange('assessmentType', e.target.value)}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-2x00 bg-white">
                          <option value="">Select assessment type...</option>
                          <option value="Technical Coding Assessment">Technical Coding Assessment</option>
                          <option value="Case Study Analysis">Case Study Analysis</option>
                          <option value="Personality & Aptitude Test">Personality & Aptitude Test</option>
                          <option value="Skills Test">Skills Test</option>
                          <option value="Portfolio Review">Portfolio Review</option>
                          <option value="Written Assessment">Written Assessment</option>
                          <option value="Custom Assessment">Custom Assessment</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Expected Duration</label>
                          <input type="text" value={formData.assessmentDuration}
                            onChange={(e) => handleChange('assessmentDuration', e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-400"
                            placeholder="e.g., 2 hours, 48 hours" />
                        </div>
                        <div>
                          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                            <FiCalendar className="text-orange-500" /> Submission Deadline
                          </label>
                          <input type="date" value={formData.assessmentDeadline}
                            onChange={(e) => { handleChange('assessmentDeadline', e.target.value); setSelectedDate(e.target.value); }}
                            min={new Date().toISOString().split('T')[0]}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-400" />
                        </div>
                      </div>
                      <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                          <FiLink className="text-orange-500" /> Assessment Link (if available)
                        </label>
                        <input type="text" value={formData.assessmentLink}
                          onChange={(e) => handleChange('assessmentLink', e.target.value)}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-400"
                          placeholder="e.g., https://assessment-platform.com/test/abc123" />
                      </div>
                    </div>
                  )}

                  {/* ── Decision ── */}
                  {requiresDecisionDetails && (
                    <div className="space-y-5">
                      <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                          <FiCalendar className="text-green-600" /> Decision By Date
                        </label>
                        <input type="date" value={formData.decisionDate}
                          onChange={(e) => { handleChange('decisionDate', e.target.value); setSelectedDate(e.target.value); }}
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-400" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Decision Notes (optional)</label>
                        <textarea value={formData.decisionNotes}
                          onChange={(e) => handleChange('decisionNotes', e.target.value)}
                          rows="3"
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-400 resize-none"
                          placeholder="e.g., We are comparing top 3 candidates. You will be notified via email." />
                      </div>
                    </div>
                  )}

                  {/* ── References ── */}
                  {requiresReferencesDetails && (
                    <div className="space-y-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                            <FiCalendar className="text-teal-600" /> Submission Deadline
                          </label>
                          <input type="date" value={formData.referencesDeadline}
                            onChange={(e) => { handleChange('referencesDeadline', e.target.value); setSelectedDate(e.target.value); }}
                            min={new Date().toISOString().split('T')[0]}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-teal-400" />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Number of References Required
                          </label>
                          <select value={formData.referencesCount}
                            onChange={(e) => handleChange('referencesCount', e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-teal-400 bg-white">
                            <option value="1">1 reference</option>
                            <option value="2">2 references</option>
                            <option value="3">3 references</option>
                            <option value="4">4 references</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ── Job Offer ── */}
                  {requiresOfferDetails && (
                    <div className="space-y-5">
                      <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                          <FiDollarSign className="text-pink-500" /> Salary Offer <span className="text-red-500">*</span>
                        </label>
                        <input type="text" value={formData.offerSalary}
                          onChange={(e) => handleChange('offerSalary', e.target.value)}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-pink-400"
                          placeholder="e.g., $1,200 – $1,500 / month or $72,000 / year" />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                            <FiCalendar className="text-pink-500" /> Proposed Start Date
                          </label>
                          <input type="date" value={formData.offerStartDate}
                            onChange={(e) => { handleChange('offerStartDate', e.target.value); setSelectedDate(e.target.value); }}
                            min={new Date().toISOString().split('T')[0]}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-pink-400" />
                        </div>
                        <div>
                          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                            <FiCalendar className="text-pink-500" /> Offer Expiry Date
                          </label>
                          <input type="date" value={formData.offerDeadline}
                            onChange={(e) => handleChange('offerDeadline', e.target.value)}
                            min={new Date().toISOString().split('T')[0]}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-pink-400" />
                        </div>
                      </div>
                      <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                          <FiMapPin className="text-pink-500" /> Work Location
                        </label>
                        <input type="text" value={formData.offerLocation}
                          onChange={(e) => handleChange('offerLocation', e.target.value)}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-pink-400"
                          placeholder="e.g., Phnom Penh Office / Remote / Hybrid" />
                      </div>
                      {/* <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Benefits Package</label>
                        <textarea value={formData.offerBenefits}
                          onChange={(e) => handleChange('offerBenefits', e.target.value)}
                          rows="3"
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-pink-400 resize-none"
                          placeholder="e.g., Health insurance, 15 days annual leave, performance bonus, laptop" />
                      </div> */}
                    </div>
                  )}

                  {/* Additional Notes — always shown */}
                  {/* <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                      <FiInfo className="text-gray-500" /> Additional Notes (optional)
                    </label>
                    <textarea value={formData.additionalNotes}
                      onChange={(e) => handleChange('additionalNotes', e.target.value)}
                      rows="3"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 resize-none"
                      placeholder="Any extra instructions, directions, dress code, documents to bring, etc." />
                  </div> */}

                  {/* Live Preview Banner */}
                  <div className={`${stageColor.light} border-2 ${stageColor.border} rounded-xl p-4`}>
                    <p className={`text-sm font-bold ${stageColor.text} mb-2`}> Live Email Preview</p>
                    <div className="bg-white rounded-lg p-4 max-h-48 overflow-y-auto">
                      <pre className="text-gray-700 whitespace-pre-wrap font-sans text-sm leading-relaxed">{formData.message}</pre>
                    </div>
                  </div>
                </div>
              )}

              {/* ════ STEP 4: Review & Send ══════════════════════════════════ */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">Review & Send</h2>
                    <p className="text-gray-500 text-sm">Review all details carefully before sending</p>
                  </div>

                  {/* Recipient */}
                  <div className={`${stageColor.light} rounded-xl p-5 border-2 ${stageColor.border}`}>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                        {candidate.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-lg">{candidate.name}</p>
                        <p className="text-gray-500 text-sm">{candidate.email}</p>
                        <p className="text-gray-400 text-sm">{candidate.position}</p>
                      </div>
                    </div>
                    <div className="border-t border-gray-200 pt-3 flex gap-8 text-sm">
                      <div>
                        <span className="text-gray-500 text-sm">From: </span>
                        <span className="font-semibold text-gray-700">{candidate.stage}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 text-sm">To: </span>
                        <span className={`font-bold ${stageColor.text}`}>{stageColor.emoji} {selectedNextStage}</span>
                      </div>
                      <div className="justify-end flex-1 text-right">
                      <span className="text-sm font-semibold justify-end text-gray-500 mb-1">Email Subject: </span>
                      <span className='text-gray-800 font-semibold'>{candidate.email}</span>
                      </div>
                    </div>
                  </div>



                  {/* Screening Summary */}
                  {requiresScreeningDetails && (formData.screeningDate || formData.screeningTime) && (
                    <div className="bg-purple-50 rounded-xl p-5 border-2 border-purple-200">
                      <p className="text-sm font-bold text-purple-800 mb-3">🔍 Screening Details</p>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-sm text-purple-500 mb-1">Date</p>
                          <p className="font-bold text-purple-900">{formData.screeningDate ? fmtDate(formData.screeningDate, { month: 'short', day: 'numeric', year: 'numeric' }) : '—'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-purple-500 mb-1">Time</p>
                          <p className="font-bold text-purple-900">{formData.screeningTime ? fmtTime(formData.screeningTime) : '—'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-purple-500 mb-1">Format</p>
                          <p className="font-bold text-purple-900 capitalize">{formData.screeningFormat}</p>
                        </div>
                        {formData.screeningLink && (
                          <div className="col-span-3">
                            <p className="text-sm text-purple-500 mb-1">Link / Dial-in</p>
                            <p className="font-semibold text-purple-900 break-all">{formData.screeningLink}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Interview Summary */}
                  {/* {requiresInterviewDetails && (formData.interviewDate || formData.interviewTime) && (
                    <div className="bg-blue-50 rounded-xl p-5 border-2 border-blue-200">
                      <p className="text-sm font-bold text-blue-800 mb-3">Interview Detais</p>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-sm text-blue-500 mb-1">Date</p>
                          <p className="font-bold text-blue-900">{formData.interviewDate ? fmtDate(formData.interviewDate, { month: 'short', day: 'numeric', year: 'numeric' }) : '—'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-blue-500 mb-1">Time</p>
                          <p className="font-bold text-blue-900">{formData.interviewTime ? fmtTime(formData.interviewTime) : '—'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-blue-500 mb-1">Format</p>
                          <p className="font-bold text-blue-900 capitalize">{formData.interviewFormat}</p>
                        </div>
                        <div className="col-span-3">
                          <p className="text-sm text-blue-500 mb-1">
                            {formData.interviewFormat === 'in-person' ? 'Location' : 'Link / Dial-in'}
                          </p>
                          <p className="font-bold text-blue-900 break-all">
                            {formData.interviewFormat === 'in-person'
                              ? (formData.interviewLocation || '—')
                              : (formData.interviewLink || '—')}
                          </p>
                        </div>
                      </div>
                    </div>
                  )} */}

                  {/* Assessment Summary */}
                  {requiresAssessmentDetails && formData.assessmentType && (
                    <div className="bg-orange-50 rounded-xl p-5 border-2 border-orange-200">
                      <p className="text-sm font-bold text-orange-800 mb-3">📝 Assessment Details</p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-sm text-orange-500 mb-1">Type</p>
                          <p className="font-bold text-orange-900">{formData.assessmentType}</p>
                        </div>
                        <div>
                          <p className="text-sm text-orange-500 mb-1">Duration</p>
                          <p className="font-bold text-orange-900">{formData.assessmentDuration || '—'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-orange-500 mb-1">Deadline</p>
                          <p className="font-bold text-orange-900">{formData.assessmentDeadline ? fmtDate(formData.assessmentDeadline, { month: 'short', day: 'numeric', year: 'numeric' }) : '—'}</p>
                        </div>
                        {formData.assessmentLink && (
                          <div>
                            <p className="text-sm text-orange-500 mb-1">Link</p>
                            <p className="font-semibold text-orange-900 break-all text-sm">{formData.assessmentLink}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Decision Summary */}
                  {requiresDecisionDetails && formData.decisionDate && (
                    <div className="bg-green-50 rounded-xl p-5 border-2 border-green-200">
                      <p className="text-sm font-bold text-green-800 mb-3">Decision Timeline</p>
                      <div>
                        <p className="text-sm text-green-600 mb-1">Decision By</p>
                        <p className="font-bold text-green-900">{fmtDate(formData.decisionDate, { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                      </div>
                    </div>
                  )}

                  {/* References Summary */}
                  {requiresReferencesDetails && (
                    <div className="bg-teal-50 rounded-xl p-5 border-2 border-teal-200">
                      <p className="text-sm font-bold text-teal-800 mb-3">References Required</p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-sm text-teal-600 mb-1">Count</p>
                          <p className="font-bold text-teal-900">{formData.referencesCount} references</p>
                        </div>
                        <div>
                          <p className="text-sm text-teal-600 mb-1">Deadline</p>
                          <p className="font-bold text-teal-900">{formData.referencesDeadline ? fmtDate(formData.referencesDeadline, { month: 'short', day: 'numeric', year: 'numeric' }) : '—'}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Offer Summary */}
                  {requiresOfferDetails && formData.offerSalary && (
                    <div className="bg-pink-50 rounded-xl p-5 border-2 border-pink-200">
                      <p className="text-sm font-bold text-pink-800 mb-3">🎉 Offer Details</p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-sm text-pink-500 mb-1">Salary</p>
                          <p className="font-bold text-pink-900">{formData.offerSalary}</p>
                        </div>
                        <div>
                          <p className="text-sm text-pink-500 mb-1">Start Date</p>
                          <p className="font-bold text-pink-900">{formData.offerStartDate ? fmtDate(formData.offerStartDate, { month: 'long', day: 'numeric', year: 'numeric' }) : '—'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-pink-500 mb-1">Work Location</p>
                          <p className="font-bold text-pink-900">{formData.offerLocation || '—'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-pink-500 mb-1">Offer Expires</p>
                          <p className="font-bold text-pink-900">{formData.offerDeadline ? fmtDate(formData.offerDeadline, { month: 'short', day: 'numeric', year: 'numeric' }) : '—'}</p>
                        </div>
                        {formData.offerBenefits && (
                          <div className="col-span-2">
                            <p className="text-sm text-pink-500 mb-1">Benefits</p>
                            <p className="font-semibold text-pink-900 text-sm">{formData.offerBenefits}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Full Message Preview */}
                  <div className="bg-gray-50 rounded-xl p-5 border-2 border-gray-200">
                    <p className="text-sm font-bold text-gray-500 mb-3">Full Message Preview</p>
                    <div className="bg-white rounded-lg p-5 border border-gray-200 max-h-80 overflow-y-auto">
                      <pre className="text-gray-800 whitespace-pre-wrap font-sans text-sm leading-relaxed">{formData.message}</pre>
                    </div>
                  </div>

                  {/* Ready to Send */}
                  <div className="bg-yellow-50 border-1 border-yellow-200 rounded-xl p-3">
                    <div className="flex items-start gap-3">
                      <FiBell className="text-yellow-600 mt-0.5 text-xl flex-shrink-0" />
                      <div>
                        <p className="text-sm font-bold text-yellow-900 mb-1">Ready to Send</p>
                        <p className="text-sm text-yellow-800">
                          This notification will be sent to <strong>{candidate.name}</strong> ({candidate.email}) immediately and logged in the system.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t-2 border-gray-100">
                <button
                  onClick={() => {
                    if (currentStep > 1) {
                      setCurrentStep(currentStep - 1);
                    } else {
                      if (window.confirm('Cancel and go back to Manage Application?')) {
                        navigate('/manage-application');
                      }
                    }
                  }}
                  className="px-8 py-3 border-2 border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-colors font-semibold text-sm"
                >
                  {currentStep === 1 ? '✕ Cancel' : '← Previous'}
                </button>

                <button
                  onClick={() => {
                    if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
                    else handleSendNotification();
                  }}
                  className={`px-10 py-3 bg-gradient-to-r ${stageColor.gradient} text-white rounded-xl hover:shadow-lg transition-all font-bold text-sm flex items-center gap-2`}
                >
                  {currentStep === totalSteps ? (
                    <><FiBell className="text-base" /><span>Send Notification</span></>
                  ) : (
                    <><span>Continue</span><FiChevronRight className="text-base" /></>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendNotification;