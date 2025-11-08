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
    <div className="bg-white min-h-screen">
      {/* Ultra Minimal Header */}
      <header className="container mx-auto max-w-5xl px-5 py-12">
        <Link href="/" className="text-4xl font-bold tracking-tighter hover:underline">
          MeasureMint.
        </Link>
      </header>

      {/* Hero */}
      <main className="container mx-auto max-w-5xl px-5">
        <section className="mb-20">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight mb-8">
            How to Use MeasureMint
          </h1>
          <p className="text-lg md:text-xl mb-4 max-w-2xl">
            A step-by-step guide to measuring and scaling drawings on Miro Board with precision.
          </p>
          <a 
            href="https://loom.com/share/3a2b1b94850946fa93a4db2961d2b62d" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline text-lg"
          >
            Watch Full Video Tutorial →
          </a>
        </section>

        {/* Steps */}
        <section className="space-y-32 mb-32">
          {steps.map((step) => (
            <article key={step.number}>
              <div className="mb-8">
                <div className="text-gray-500 text-sm mb-2">
                  STEP {step.number} · {step.time}
                </div>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tighter leading-tight mb-4">
                  {step.title}
                </h2>
                <p className="text-xl text-gray-700 leading-relaxed max-w-3xl">
                  {step.description}
                </p>
              </div>
              
              <a 
                href={`https://loom.com/share/3a2b1b94850946fa93a4db2961d2b62d?t=${step.timestamp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <div className="relative">
                  <img 
                    src={step.image} 
                    alt={step.title}
                    className="w-full"
                    loading="lazy"
                  />
                </div>
              </a>
            </article>
          ))}
        </section>

        {/* Best Practices */}
        <section className="mb-32">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter leading-tight mb-12">
            Best Practices
          </h2>
          
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h3 className="text-2xl font-bold mb-4 tracking-tight">
                Cautionary Notes
              </h3>
              <ul className="space-y-4 text-gray-700 text-lg leading-relaxed">
                {cautionaryNotes.map((note, index) => (
                  <li key={index}>{note}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-4 tracking-tight">
                Tips for Efficiency
              </h3>
              <ul className="space-y-4 text-gray-700 text-lg leading-relaxed">
                {efficiencyTips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mb-32 text-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter leading-tight mb-8">
            Ready to get started?
          </h2>
          <Link 
            href="/panel"
            className="inline-block text-blue-500 hover:underline text-xl font-medium"
          >
            Launch MeasureMint →
          </Link>
        </section>
      </main>

      {/* Minimal Footer */}
      <footer className="border-t border-gray-200">
        <div className="container mx-auto max-w-5xl px-5 py-12 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <div className="mb-4 md:mb-0">
            © {new Date().getFullYear()} MeasureMint. All rights reserved.
          </div>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-gray-900">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-gray-900">
              Terms
            </Link>
            <Link href="/help" className="hover:text-gray-900">
              Help
            </Link>
            <a href="mailto:support@measuremint.app" className="hover:text-gray-900">
              Support
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
