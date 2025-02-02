// src/components/Testimonials.js
export default function Testimonials() {
  return (
    <section className=" py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-extrabold text-gray-700">What Our Clients Say</h2>
        <div className="mt-10">
          <div className="space-y-8 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            <blockquote className="bg-white p-6 rounded-lg   ">
              <p className="text-lg font-medium text-gray-700">
                "Absolutely love the range of skincare products! My skin feels amazing."
              </p>
              <footer className="mt-4">
                <p className="text-base font-medium text-gray-500">- Sarah M.</p>
              </footer>
            </blockquote>

            <blockquote className="bg-white p-6 rounded-lg ">
              <p className="text-lg font-medium text-gray-700">
                "Fast shipping and great customer service. Highly recommend!"
              </p>
              <footer className="mt-4">
                <p className="text-base font-medium text-gray-500">- John D.</p>
              </footer>
            </blockquote>
            
            <blockquote className="bg-white p-6 rounded-lg ">
              <p className="text-lg font-medium text-gray-700">
                "The best place to find high-quality fragrances at great prices."
              </p>
              <footer className="mt-4">
                <p className="text-base font-medium text-gray-500">- Emma W.</p>
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
