import React, { createContext, useState, useContext } from 'react';

const FaqContext = createContext();

export const useFaqContext = () => useContext(FaqContext);

export const FaqProvider = ({ children }) => {
  const [faqs, setFaqs] = useState([
    { id: 1, question: "How do I apply for leave?", answer: "Leave applications can be submitted through the HR portal.", category: "HR", count: 120, timestamp: "May 1, 2026" },
    { id: 2, question: "What is the policy for remote work?", answer: "Remote work is permitted for eligible roles up to 2 days a week.", category: "HR", count: 85, timestamp: "May 2, 2026" },
    { id: 3, question: "How are performance reviews conducted?", answer: "Performance reviews are held bi-annually in June and December.", category: "HR", count: 65, timestamp: "May 3, 2026" },
    { id: 4, question: "Where can I find the employee handbook?", answer: "The employee handbook is available on the intranet under HR documents.", category: "HR", count: 150, timestamp: "May 4, 2026" },
    { id: 5, question: "How do I reset my portal password?", answer: "Click 'Forgot Password' on the login screen or contact IT support.", category: "ICT", count: 300, timestamp: "May 1, 2026" },
    { id: 6, question: "How can I connect to the campus Wi-Fi?", answer: "Use your student/staff credentials to log in to the GCIT_Secure network.", category: "ICT", count: 250, timestamp: "May 2, 2026" },
    { id: 7, question: "What software is provided to students?", answer: "Students have access to Microsoft 365, MATLAB, and Adobe Creative Cloud.", category: "ICT", count: 110, timestamp: "May 3, 2026" },
    { id: 8, question: "How do I report a hardware issue?", answer: "Please submit a ticket through the ICT Helpdesk portal.", category: "ICT", count: 90, timestamp: "May 4, 2026" },
    { id: 9, question: "What are the admission requirements?", answer: "Requirements vary by program. Please refer to the Admissions page.", category: "Admission", count: 400, timestamp: "May 1, 2026" },
    { id: 10, question: "When is the application deadline?", answer: "The deadline for the Fall semester is July 31st.", category: "Admission", count: 350, timestamp: "May 2, 2026" },
    { id: 11, question: "How do I check my application status?", answer: "You can check your status on the admissions portal using your application ID.", category: "Admission", count: 280, timestamp: "May 3, 2026" },
    { id: 12, question: "Are scholarships available?", answer: "Yes, merit and need-based scholarships are available for eligible students.", category: "Admission", count: 310, timestamp: "May 4, 2026" },
    { id: 13, question: "Where can I get a new student ID card?", answer: "Visit the Student Services center in Building A during office hours.", category: "Student Service", count: 180, timestamp: "May 1, 2026" },
    { id: 14, question: "How do I request a transcript?", answer: "Transcripts can be requested online through the Student Portal.", category: "Student Service", count: 210, timestamp: "May 2, 2026" },
    { id: 15, question: "Are counseling services available?", answer: "Yes, free confidential counseling is available at the Wellness Center.", category: "Student Service", count: 150, timestamp: "May 3, 2026" },
    { id: 16, question: "How do I join a student club?", answer: "A list of clubs and sign-up links are available on the Student Services page.", category: "Student Service", count: 130, timestamp: "May 4, 2026" },
    { id: 17, question: "What are the campus opening hours?", answer: "The main campus is open from 7:00 AM to 10:00 PM on weekdays.", category: "General", count: 420, timestamp: "May 1, 2026" },
    { id: 18, question: "Where is the lost and found?", answer: "Lost and found is located at the main security desk.", category: "General", count: 160, timestamp: "May 2, 2026" },
    { id: 19, question: "Is parking available on campus?", answer: "Yes, parking is available. A valid parking permit is required.", category: "General", count: 220, timestamp: "May 3, 2026" },
    { id: 20, question: "Are campus tours available?", answer: "Yes, guided campus tours can be booked through the main website.", category: "General", count: 190, timestamp: "May 4, 2026" }
  ]);

  const [unansweredQueries, setUnansweredQueries] = useState([
    {
      id: 101,
      user: "+975-17545892",
      question: "Can I schedule a meeting?",
      intent: "unknown",
      timestamp: "March 20, 2026, 2:45 PM"
    },
    {
      id: 102,
      user: "+975-17586802",
      question: "Do you support cryptocurrency payments?",
      intent: "unknown",
      timestamp: "March 17, 2026, 3:15 PM"
    },
    {
      id: 103,
      user: "+975-77589632",
      question: "Can I do it?",
      intent: "unknown",
      timestamp: "March 17, 2026, 5:45 PM"
    }
  ]);

  const [resolvedToday, setResolvedToday] = useState(1);

  const addFaq = (faq) => {
    setFaqs([{ ...faq, id: Date.now(), count: 0, timestamp: "Just now" }, ...faqs]);
  };

  const editFaq = (updatedFaq) => {
    setFaqs(faqs.map(f => (f.id === updatedFaq.id ? { ...updatedFaq, timestamp: "Just now" } : f)));
  };

  const deleteFaq = (id) => {
    setFaqs(faqs.filter(f => f.id !== id));
  };

  const resolveQuery = (queryId, faqData) => {
    addFaq(faqData);
    setUnansweredQueries(unansweredQueries.filter(q => q.id !== queryId));
    setResolvedToday(resolvedToday + 1);
  };

  return (
    <FaqContext.Provider value={{
      faqs, addFaq, editFaq, deleteFaq,
      unansweredQueries,
      resolveQuery,
      resolvedToday
    }}>
      {children}
    </FaqContext.Provider>
  );
};
