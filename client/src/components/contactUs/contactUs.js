import React, { useContext, useEffect } from 'react';
import ContactForm from './contactForm';
import ContactDetails from './contactDetails';
import FAQSection from './faqSection';
import Map from './googleMaps';
import { AppContext } from '../../App';

const ContactUsPage = () => {
  const {setNav}=useContext(AppContext)
  useEffect(()=>{
    setNav("Contact")
  },[])
  return (
    <div className="flex flex-col md:flex-row max-w-7xl mx-auto py-20 pt-32 px-4">
    <div className="w-full md:w-1/3 gap-3 px-4 py-3">
    <div className='mb-2'>
        <ContactDetails /></div>
        <Map />
        
      </div>
      <div className="w-full md:w-1/2 px-4">
        <ContactForm />
        
      </div>
      <FAQSection />
      
    </div>
  );
};

export default ContactUsPage;
