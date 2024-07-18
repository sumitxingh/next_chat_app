// pages/about.tsx

import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-indigo-800 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white">About Chat App</h1>
          <p className="mt-4 text-lg text-gray-300">
            Chat App is a platform designed to connect people seamlessly through messaging.
            Learn more about our mission and vision below.
          </p>
        </div>
        <div className="mt-12">
          <div className="text-lg text-gray-300">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis gravida ligula nec dui
              luctus, sed fermentum libero imperdiet. Vivamus elementum ligula sed turpis faucibus
              malesuada.
            </p>
            <p>
              Nullam efficitur libero id lacus auctor, id placerat neque finibus. Integer maximus
              nisl eu arcu luctus, a condimentum neque mollis.
            </p>
            <p>
              Suspendisse sit amet tortor feugiat, posuere nulla eu, vulputate nunc. Sed vehicula
              lorem id lorem fringilla, at dignissim lorem posuere.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
