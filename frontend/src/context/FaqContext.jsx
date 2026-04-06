import React, { createContext, useState, useContext } from 'react';

const FaqContext = createContext();

export const useFaqContext = () => useContext(FaqContext);

export const FaqProvider = ({ children }) => {
  const [faqs, setFaqs] = useState([
    {
      id: 1,
      question: "Where is GCIT located?",
      answer: "We are located at Kabjisa, Thimphu.",
      category: "Location",
      count: 148,
      timestamp: "March 20, 2026"
    },
    {
      id: 2,
      question: "What courses are offered in GCIT?",
      answer: "GCIT offers undergraduate degrees in Computer Science...",
      category: "Courses",
      count: 100,
      timestamp: "March 17, 2026"
    },
    {
      id: 3,
      question: "How many Students are there currently?",
      answer: "As of March 2026, GCIT currently has 412 students enrolled.",
      category: "Student",
      count: 97,
      timestamp: "March 8, 2026"
    }
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
