import Link from "next/link"
import Image from "next/image"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <header className="border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-5 md:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/logo.svg"
              alt="MeasureMint"
              width={40}
              height={40}
              className="transition-transform group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-gray-900">MeasureMint</span>
              <span className="text-[10px] tracking-widest text-gray-500 uppercase">
                Professional Measurement Tool
              </span>
            </div>
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/support" className="text-sm text-gray-600 hover:text-gray-900">
              Support
            </Link>
            <Link href="/panel">
              <button className="bg-[#10bb82] text-white hover:bg-[#0ea574] px-4 py-2 rounded-md text-sm font-medium transition-colors">
                Launch App
              </button>
            </Link>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="max-w-5xl mx-auto px-5 md:px-6 pt-20 md:pt-32 pb-16 md:pb-24">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 text-gray-900">
            Make exact Measurements on Miro
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-10 max-w-3xl leading-relaxed">
            Professional measurement and calibration tool for architects, engineers, designers, and construction professionals. Scale on Miro - Measure on Miro.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/panel">
              <button className="bg-[#10bb82] text-white hover:bg-[#0ea574] px-8 py-3 rounded-md text-lg font-medium transition-colors">
                Launch App
              </button>
            </Link>
            <Link href="/waitlist">
              <button className="border border-gray-300 text-gray-900 hover:border-gray-400 bg-transparent px-8 py-3 rounded-md text-lg font-medium transition-colors">
                Join Waitlist
              </button>
            </Link>
          </div>
        </section>

        {/* Demo Video Section */}
        <section className="max-w-5xl mx-auto px-5 md:px-6 pb-32">
          <div className="aspect-video w-full rounded-lg overflow-hidden border border-gray-200 shadow-lg">
            <iframe
              src="https://www.loom.com/embed/3a2b1b94850946fa93a4db2961d2b62d"
              className="w-full h-full"
              allowFullScreen
              title="MeasureMint Demo"
            />
          </div>
        </section>

        {/* Problem/Solution Section */}
        <section className="max-w-5xl mx-auto px-5 md:px-6 pb-32">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4 text-gray-900">The Problem</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Measuring drawings on Miro boards is frustrating. You can't get accurate dimensions from blueprints,
                floor plans, or technical drawings without complex workarounds.
              </p>
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4 text-gray-900">The Solution</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                MeasureMint solves this with professional-grade measurement tools built directly into Miro. Calibrate
                once, measure anything.
              </p>
            </div>
          </div>
        </section>

        {/* Key Features Section */}
        <section className="max-w-5xl mx-auto px-5 md:px-6 pb-32">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-16 text-gray-900">
            Built for professionals
          </h2>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
            <div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Precise Scale Calibration</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Set a known distance to establish accurate scale. Works with any drawing, blueprint, or technical
                diagram. One-time calibration per drawing.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Professional Measurements</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Measure any distance on calibrated drawings. Visual feedback with clear markers directly on the board.
                Track measurement history with automatic conversions.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Dual Unit Systems</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Full Imperial and Metric support. 8 unit types: Feet, inches, yards, miles, meters, centimeters,
                millimeters, kilometers. Instant conversion between any units.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">No Image Selection Required</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Measure anywhere on the board instantly. Works with any drawing, PDF, or image. Seamless integration
                with Miro workflow.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Conversion Tables</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                View measurements across all units simultaneously. Compare Imperial and Metric instantly. Export-ready
                measurement data.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Professional Grade</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Built for architects, engineers, and construction professionals. Inspired by Bluebeam Revu's measurement
                tools. Designed for the AEC industry.
              </p>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="max-w-5xl mx-auto px-5 md:px-6 pb-32">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-16 text-gray-900">Perfect for</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl mb-3">🏗️</div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Construction Blueprints</h3>
              <p className="text-gray-700">Measure dimensions, verify specifications, check clearances</p>
            </div>
            <div>
              <div className="text-4xl mb-3">🏠</div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Floor Plans</h3>
              <p className="text-gray-700">Space planning, room dimensions, furniture layouts</p>
            </div>
            <div>
              <div className="text-4xl mb-3">🗺️</div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Site Plans</h3>
              <p className="text-gray-700">Property measurements, lot dimensions, site analysis</p>
            </div>
            <div>
              <div className="text-4xl mb-3">📐</div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Technical Drawings</h3>
              <p className="text-gray-700">Engineering schematics, mechanical drawings, diagrams</p>
            </div>
            <div>
              <div className="text-4xl mb-3">🎨</div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Architectural Designs</h3>
              <p className="text-gray-700">Elevations, sections, detail drawings</p>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="max-w-5xl mx-auto px-5 md:px-6 pb-32">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6 text-gray-900">
            Get started in 60 seconds
          </h2>
          <div className="space-y-12 mt-12">
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#10bb82] text-white flex items-center justify-center text-xl font-bold">
                1
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2 text-gray-900">Calibrate Scale</h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Click two points on a known distance (like "20 ft" on your drawing). Enter the actual distance. Choose
                  your unit. Done! Your scale is set.
                </p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#10bb82] text-white flex items-center justify-center text-xl font-bold">
                2
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2 text-gray-900">Measure Anything</h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Click "Measure Distance". Click any two points on your drawing. See instant measurements with full
                  unit conversions.
                </p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#10bb82] text-white flex items-center justify-center text-xl font-bold">
                3
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2 text-gray-900">Switch Units Anytime</h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Toggle between Imperial (🇺🇸) and Metric (🌍). All measurements update automatically. View conversion
                  tables for all units.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-10">
            <Link href="/guide" className="text-blue-500 hover:underline text-lg">
              See detailed guide →
            </Link>
          </div>
        </section>

        {/* Target Audience Section */}
        <section className="max-w-5xl mx-auto px-5 md:px-6 pb-32">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6 text-gray-900">
            Built for professionals who demand precision
          </h2>
          <div className="grid md:grid-cols-2 gap-6 text-lg text-gray-700">
            <ul className="space-y-2">
              <li>• Architects and architectural firms</li>
              <li>• Engineers (civil, mechanical, structural)</li>
              <li>• Construction project managers</li>
              <li>• Interior designers</li>
            </ul>
            <ul className="space-y-2">
              <li>• Real estate professionals</li>
              <li>• Facility managers</li>
              <li>• Anyone who works with technical drawings on Miro</li>
            </ul>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="max-w-5xl mx-auto px-5 md:px-6 pb-32">
          <div className="bg-gray-50 rounded-lg p-12 md:p-16 text-center border border-gray-200">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4 text-gray-900">
              Ready to measure with precision?
            </h2>
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
              Join architects and engineers who trust MeasureMint for accurate measurements on Miro.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/panel">
                <button className="bg-[#10bb82] text-white hover:bg-[#0ea574] px-8 py-3 rounded-md text-lg font-medium transition-colors">
                  Launch MeasureMint
                </button>
              </Link>
              <Link href="/guide">
                <button className="border border-gray-300 text-gray-900 hover:border-gray-400 bg-transparent px-8 py-3 rounded-md text-lg font-medium transition-colors">
                  View Documentation
                </button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-5 md:px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600">© 2025 MeasureMint. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link href="/support" className="text-sm text-gray-600 hover:text-gray-900">
                Support
              </Link>
              <Link href="/privacy" className="text-sm text-gray-600 hover:text-gray-900">
                Privacy
              </Link>
              <Link href="/terms" className="text-sm text-gray-600 hover:text-gray-900">
                Terms
              </Link>
            </div>
          </div>
          <div className="mt-4 text-center md:text-left">
            <a href="mailto:support@measuremint.app" className="text-sm text-blue-500 hover:underline">
              support@measuremint.app
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
