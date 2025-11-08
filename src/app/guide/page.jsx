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
    <div className="min-h-screen bg-white">
      {/* Minimal Header */}
      <header className="border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl font-semibold text-gray-900">
              MeasureMint
            </Link>
            <Link 
              href="/panel" 
              className="text-sm px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
            >
              Launch App
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-20 pb-16 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
          How to Use MeasureMint
        </h1>
        <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
          A step-by-step guide to measuring and scaling drawings on Miro Board with precision.
        </p>
        <a 
          href="https://loom.com/share/3a2b1b94850946fa93a4db2961d2b62d" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors"
        >
          Watch Full Video Tutorial
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </section>

      {/* Steps */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <div className="space-y-24">
          {steps.map((step) => (
            <article key={step.number} className="group">
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-sm font-medium text-gray-400">
                    Step {step.number}
                  </span>
                  <a 
                    href={`https://loom.com/share/3a2b1b94850946fa93a4db2961d2b62d?t=${step.timestamp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {step.time}
                  </a>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">
                  {step.title}
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
              
              <a 
                href={`https://loom.com/share/3a2b1b94850946fa93a4db2961d2b62d?t=${step.timestamp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block relative aspect-video rounded-lg overflow-hidden bg-gray-100 border border-gray-200 hover:border-gray-300 transition-colors"
              >
                <img 
                  src={step.image} 
                  alt={step.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity flex items-center justify-center">
                  <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg className="w-8 h-8 text-gray-900 ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
              </a>
            </article>
          ))}
        </div>
      </section>

      {/* Best Practices */}
      <section className="border-t border-gray-100 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 tracking-tight">
            Best Practices
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                ⚠️ Cautionary Notes
              </h3>
              <ul className="space-y-3">
                {cautionaryNotes.map((note, index) => (
                  <li key={index} className="text-gray-600 leading-relaxed">
                    {note}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                💡 Tips for Efficiency
              </h3>
              <ul className="space-y-3">
                {efficiencyTips.map((tip, index) => (
                  <li key={index} className="text-gray-600 leading-relaxed">
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">
            Ready to get started?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Launch MeasureMint and start measuring your drawings with precision.
          </p>
          <Link 
            href="/panel"
            className="inline-block px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-colors font-medium"
          >
            Launch MeasureMint
          </Link>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-500">
            <div>
              © {new Date().getFullYear()} MeasureMint. All rights reserved.
            </div>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-gray-900 transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-gray-900 transition-colors">
                Terms
              </Link>
              <Link href="/help" className="hover:text-gray-900 transition-colors">
                Help
              </Link>
              <a href="mailto:support@measuremint.app" className="hover:text-gray-900 transition-colors">
                Support
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
