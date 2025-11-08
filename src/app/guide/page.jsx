'use client';

import React from 'react';
import Link from 'next/link';

export default function GuidePage() {
  const steps = [
    {
      number: 1,
      title: "Introduction to Measurement Tool",
      time: "0:00",
      timestamp: 0,
      image: "https://loom.com/i/0e215eef425d4f2ea54b617f13e1e9e6?workflows_screenshot=true",
      description: "The MeasureMint Tool is designed to assist in measuring and scaling drawings on Miro Board. It addresses the challenges of measuring directly on Miro, allowing for seamless collaboration."
    },
    {
      number: 2,
      title: "Selecting the Measurement Tool",
      time: "0:58",
      timestamp: 58,
      image: "https://loom.com/i/9df522df30aa43e680220dee87387883?workflows_screenshot=true",
      description: "Navigate to the MeasureMint Tool on Miro Board. Understand that it consists of two main functions: Calibration Line Tool and Measurement Line Tool."
    },
    {
      number: 3,
      title: "Drawing a Calibration Line",
      time: "1:11",
      timestamp: 71,
      image: "https://loom.com/i/3ca845d13a754051a83a08e2da4e98a2?workflows_screenshot=true",
      description: "Click to draw a calibration line. Drag the endpoints to match a known distance on your image. Click 'Set Calibration Distance' and enter the known value."
    },
    {
      number: 4,
      title: "Setting Calibration Distance",
      time: "1:32",
      timestamp: 92,
      image: "https://loom.com/i/3c1c754bc61f4a10bf3b2f19c20a89a6?workflows_screenshot=true",
      description: "After dragging the endpoints, click 'Set Calibration Distance'. Enter the known distance (e.g., 73 feet 8 inches) and click OK."
    },
    {
      number: 5,
      title: "Updating Calibration Length",
      time: "2:19",
      timestamp: 139,
      image: "https://loom.com/i/1133ec7c76964ce487bd718626709a9d?workflows_screenshot=true",
      description: "If the calibration appears off, adjust the endpoints accordingly. Click 'Update Calibration' and re-enter the correct distance."
    },
    {
      number: 6,
      title: "Measuring Distances",
      time: "3:21",
      timestamp: 201,
      image: "https://loom.com/i/180106df9d144f2b9a2bfc537790edbd?workflows_screenshot=true",
      description: "Select 'Measure Distance' to draw a measurement line. Drag the line to measure the desired distance."
    },
    {
      number: 7,
      title: "Adjusting Measurement Lines",
      time: "3:42",
      timestamp: 222,
      image: "https://loom.com/i/34119d801ee4447f977f6f67987e0e6b?workflows_screenshot=true",
      description: "If the measurement is inaccurate, zoom in and adjust the line. Click 'Update Measurement' to recalculate."
    },
    {
      number: 8,
      title: "Reusing Calibration Lines",
      time: "2:51",
      timestamp: 171,
      image: "https://loom.com/i/0a3f424f349343d3aeb6679b3c7ab32d?workflows_screenshot=true",
      description: "You can create multiple calibration lines for different scales on the same image. Reuse existing calibration lines for subsequent measurements."
    },
    {
      number: 9,
      title: "Viewing Latest Measurements",
      time: "5:27",
      timestamp: 327,
      image: "https://loom.com/i/ca49cd9f0bf84237aa6022f9dcabc933?workflows_screenshot=true",
      description: "After completing a measurement, a new measurement line will appear. Keep track of the three latest measurements taken."
    },
    {
      number: 10,
      title: "Switching Modes",
      time: "5:49",
      timestamp: 349,
      image: "https://loom.com/i/f28eaa90bd53490fa05043999c139d7b?workflows_screenshot=true",
      description: "The MeasureMint Tool offers both light and dark modes based on user preference."
    }
  ];

  const cautionaryNotes = [
    "Ensure that the endpoints of the calibration line are accurately placed to avoid measurement errors.",
    "Regularly check and update calibration distances if measurements appear off."
  ];

  const efficiencyTips = [
    "Use zoom functionality to ensure precise placement of measurement lines.",
    "Familiarize yourself with the known distances on your drawings to expedite the calibration process."
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <svg className="w-10 h-10 text-blue-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 3h18v18H3V3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 9h18M9 3v18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="15" cy="15" r="3" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">MeasureMint</h1>
                <p className="text-sm text-gray-600">Precision Measurement Tool for Miro</p>
              </div>
            </div>
            <Link 
              href="/panel" 
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
            >
              Launch App
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Standard Operating Procedure
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Learn how to effectively use MeasureMint on Miro Board for accurate measurement and scaling of architectural and engineering drawings.
          </p>
          <div className="inline-flex items-center space-x-4 bg-white rounded-lg shadow-md px-6 py-4">
            <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
            </svg>
            <a 
              href="https://loom.com/share/3a2b1b94850946fa93a4db2961d2b62d" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors"
            >
              Watch Full Video Tutorial
            </a>
          </div>
        </div>

        {/* Objective */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Objective</h3>
          <p className="text-lg text-gray-700 leading-relaxed">
            This SOP outlines the steps to effectively use the MeasureMint Tool on Miro Board for architects and engineers to measure and scale drawings accurately.
          </p>
        </div>

        {/* Key Steps */}
        <div className="mb-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Key Steps</h3>
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div 
                key={step.number}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="grid md:grid-cols-2 gap-0">
                  {/* Image Side */}
                  <div className="relative bg-gray-100">
                    <img 
                      src={step.image} 
                      alt={step.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = `
                          <div class="flex items-center justify-center h-full bg-gray-200">
                            <div class="text-center p-8">
                              <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              <p class="text-gray-500">Screenshot from video</p>
                            </div>
                          </div>
                        `;
                      }}
                    />
                    <a 
                      href={`https://loom.com/share/3a2b1b94850946fa93a4db2961d2b62d?t=${step.timestamp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg flex items-center space-x-2"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                      <span>{step.time}</span>
                    </a>
                  </div>

                  {/* Content Side */}
                  <div className="p-8">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                          {step.number}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-2xl font-bold text-gray-900 mb-4">
                          {step.title}
                        </h4>
                        <p className="text-gray-700 text-lg leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cautionary Notes */}
        <div className="bg-yellow-50 rounded-xl shadow-lg p-8 mb-8 border-2 border-yellow-200">
          <div className="flex items-start space-x-4">
            <svg className="w-8 h-8 text-yellow-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
            </svg>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Cautionary Notes</h3>
              <ul className="space-y-3">
                {cautionaryNotes.map((note, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <span className="text-yellow-600 font-bold">•</span>
                    <span className="text-gray-700 text-lg">{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Efficiency Tips */}
        <div className="bg-green-50 rounded-xl shadow-lg p-8 mb-12 border-2 border-green-200">
          <div className="flex items-start space-x-4">
            <svg className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Tips for Efficiency</h3>
              <ul className="space-y-3">
                {efficiencyTips.map((tip, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <span className="text-green-600 font-bold">•</span>
                    <span className="text-gray-700 text-lg">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl shadow-2xl p-12 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">
            Ready to Get Started?
          </h3>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Launch MeasureMint and start measuring your drawings with precision today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link 
              href="/panel"
              className="px-8 py-4 bg-white text-blue-600 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl"
            >
              Launch MeasureMint
            </Link>
            <a 
              href="https://loom.com/share/3a2b1b94850946fa93a4db2961d2b62d"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-blue-500 text-white rounded-lg font-bold text-lg hover:bg-blue-400 transition-colors shadow-lg hover:shadow-xl"
            >
              Watch Tutorial Again
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-xl font-bold mb-4">MeasureMint</h4>
              <p className="text-gray-400">
                Precision measurement and scaling tool for Miro Board, designed for architects and engineers.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/panel" className="text-gray-400 hover:text-white transition-colors">Launch App</Link></li>
                <li><Link href="/help" className="text-gray-400 hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4">Support</h4>
              <p className="text-gray-400 mb-2">
                Need help? Contact us at:
              </p>
              <a href="mailto:support@measuremint.app" className="text-blue-400 hover:text-blue-300 transition-colors">
                support@measuremint.app
              </a>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} MeasureMint. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
