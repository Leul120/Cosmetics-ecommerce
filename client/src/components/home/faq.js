import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqData = [
  {
    question: "Are your products cruelty-free?",
    answer: "Yes, all our products are 100% cruelty-free. We never test on animals and we work only with suppliers who adhere to the same ethical standards."
  },
  {
    question: "What ingredients do you use in your products?",
    answer: "We use a combination of natural and safe synthetic ingredients. All our ingredients are clearly listed on each product page and packaging. We prioritize clean, effective formulations that are kind to your skin and the environment."
  },
  {
    question: "Do you offer samples of your products?",
    answer: "Yes, we offer sample sizes of most of our products. You can purchase these individually or receive them as free gifts with qualifying orders."
  },
  {
    question: "What is your return policy?",
    answer: "We offer a 30-day return policy for unopened products in their original packaging. If you're unsatisfied with a product you've tried, please contact our customer service team for assistance."
  },
  {
    question: "Are your products suitable for sensitive skin?",
    answer: "Many of our products are formulated for sensitive skin. However, we always recommend patch testing new products, especially if you have known sensitivities. Check individual product descriptions for specific suitability information."
  }
];

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="border-b border-gray-300 py-4"
      initial={false}
      animate={{ backgroundColor: isOpen ? "#fff" : "rgba(255, 255, 255, 0)" }}
      transition={{ duration: 0.3 }}
    >
      <button
        className="flex justify-between items-center w-full text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-medium text-stone-600">{question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          ▼
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="mt-2 text-gray-600">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQ = () => {
  return (
    <section className="py-12 ">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-600">Frequently Asked Questions</h2>
        <motion.div
          className=" rounded-lg  p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {faqData.map((item, index) => (
            <FAQItem key={index} question={item.question} answer={item.answer} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;