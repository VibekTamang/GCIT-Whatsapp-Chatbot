import React, { createContext, useState, useContext } from 'react';

const ContactContext = createContext();

export const useContactContext = () => useContext(ContactContext);

export const ContactProvider = ({ children }) => {
  const [contacts, setContacts] = useState([
    { id: 1, name: "Karan Gurung", gender: "Male", contactNo: "77293449", email: "karangurung279@gmail.com", designation: "Estate Manager" },
    { id: 2, name: "Pema Yangchen", gender: "Female", contactNo: "17575748", email: "pemayangchen.gcit@rub.edu.bt", designation: "ICT Technical Associate" },
    { id: 3, name: "Karma Yangden", gender: "Female", contactNo: "17308436", email: "karma.gcit@rub.edu.bt", designation: "Store Keeper" },
    { id: 4, name: "Yeshi Penjor", gender: "Male", contactNo: "17505020", email: "yeshey.sherubtse@rub.edu.bt", designation: "Senior Administrative Officer" },
    { id: 5, name: "Sangay Lhamo", gender: "Female", contactNo: "17885124", email: "sangaylhamosso.gcit@rub.edu.bt", designation: "Student Service Officer" },
    { id: 6, name: "Bishal Limbu", gender: "Male", contactNo: "17974694", email: "bishallimbu.gcit@rub.edu.bt", designation: "Assistant Finance Officer" },
    { id: 7, name: "Jigme Dema", gender: "Female", contactNo: "77345257", email: "jigmedema.gcit@rub.edu.bt", designation: "Assistant Examination and Student Records Officer" },
    { id: 8, name: "Aldwin Sumalabe", gender: "Male", contactNo: "639611304332", email: "aldwin.gcit@rub.edu.bt", designation: "Director" },
    { id: 9, name: "Alexsandr Zahigi", gender: "Male", contactNo: "", email: "alex.gcit@rub.edu.bt", designation: "Director" },
    { id: 10, name: "Kean Tat Ong", gender: "Male", contactNo: "", email: "ong.gcit@rub.edu.bt", designation: "Professor" },
    { id: 11, name: "Bernardo Semana Gumapac", gender: "Male", contactNo: "968 9630 4905", email: "bernardo.gcit@rub.edu.bt", designation: "ICT Head" },
    { id: 12, name: "Yonten Jamtsho", gender: "Male", contactNo: "17762073", email: "yontenjamtsho.gcit@rub.edu.bt", designation: "Assistant Director" },
    { id: 13, name: "Chimi Dema", gender: "Female", contactNo: "17356526", email: "chimi.gcit@rub.edu.bt", designation: "Team Lead (SIDD)" },
    { id: 14, name: "Chiranjeevi Adhikari", gender: "Male", contactNo: "17233296", email: "chiranjeeviadhikari.gcit@rub.edu.bt", designation: "Team Lead (Blockchain)" },
    { id: 15, name: "Chun Wei Tan", gender: "Male", contactNo: "77907637", email: "chunwei.gcit@rub.edu.bt", designation: "AI Specialist and Lead" },
    { id: 16, name: "Jigme Tshewang", gender: "Male", contactNo: "17336792", email: "jigmetshewang.gcit@rub.edu.bt", designation: "Team Lead (SIDD, Non IT)" },
    { id: 17, name: "Jigme Wangmo", gender: "Female", contactNo: "17451823", email: "jigmewangmo.gcit@rub.edu.bt", designation: "Team Lead (BICT&CET)" },
    { id: 18, name: "Joseph Patrick Sutton", gender: "Male", contactNo: "77462788", email: "joesutton.gcit@rub.edu.bt", designation: "Associate Lecturer" },
    { id: 19, name: "Pema Yangden", gender: "Female", contactNo: "17721475", email: "pemayangden.gcit@rub.edu.bt", designation: "Team Lead (AI& Fullstrack)" },
    { id: 20, name: "Tawmo", gender: "Female", contactNo: "17333591", email: "tawmo.gcit@rub.edu.bt", designation: "Project Coordinator" },
    { id: 21, name: "Tshering Lhamo", gender: "Female", contactNo: "17346805", email: "tsheringlhamotl@gmail.com", designation: "Team Lead" }
  ]);

  const addContact = (contact) => {
    setContacts([{ ...contact, id: Date.now() }, ...contacts]);
  };

  const editContact = (updatedContact) => {
    setContacts(contacts.map(c => (c.id === updatedContact.id ? updatedContact : c)));
  };

  const deleteContact = (id) => {
    setContacts(contacts.filter(c => c.id !== id));
  };

  return (
    <ContactContext.Provider value={{ contacts, addContact, editContact, deleteContact }}>
      {children}
    </ContactContext.Provider>
  );
};
