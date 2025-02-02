const FAQSection = () => {
  const faqs = [
    { question: 'What is your return policy?', answer: 'You can return any item within 30 days.' },
    { question: 'Do you ship internationally?', answer: 'Yes, we ship worldwide.' },
    { question: 'How can I track my order?', answer: 'You will receive a tracking link via email.' },
  ];

  return (
    <section className="bg-gray-100 p-8 rounded-lg ">
      <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
      <div>
        {faqs.map((faq, index) => (
          <div key={index} className="mb-4">
            <h3 className="font-semibold">{faq.question}</h3>
            <p className="text-gray-600">{faq.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
