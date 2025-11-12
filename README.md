# 📏 MeasureMint

**Professional measurement and calibration tool for architects, engineers, designers, and construction professionals. Scale on Miro - Measure on Miro.**

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-Proprietary-red)
![Miro SDK](https://img.shields.io/badge/Miro%20SDK-v2.0-orange)

## 🎯 Features

- **Scale Calibration** - Set a known distance to establish accurate scale
- **Precise Measurements** - Measure any distance on calibrated drawings
- **Dual Unit Systems** - Full Imperial and Metric support with instant conversion
- **8 Unit Types** - Feet, inches, yards, miles, meters, centimeters, millimeters, kilometers
- **Visual Feedback** - Clear markers and labels directly on the Miro board
- **Measurement History** - Track all measurements with automatic unit conversions
- **Conversion Tables** - View measurements across all units simultaneously
- **Professional Grade** - Built for architects, engineers, and construction professionals

## 🎬 Demo

Perfect for:
- 🏗️ Construction blueprints
- 🏠 Floor plans
- 🗺️ Site plans
- 📐 Technical drawings
- 🎨 Architectural designs

## 🚀 Quick Start

### Prerequisites

Choose one of the following setup methods:

#### Option 1: Docker (Recommended)
- Docker Desktop
- A Miro Developer account
- A Miro Developer team

#### Option 2: Local Setup
- Node.js 14.15 or later
- A Miro Developer account
- A Miro Developer team

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/YOUR-USERNAME/measuremint.git
cd measuremint
```

2. **Choose your setup method:**

#### Docker Setup (Recommended)

a. **Start the application**
```bash
# Build and start the containers
npm run docker:dev
```

This command will:
- Build the Docker image
- Start the Node.js application
- Start ngrok for HTTPS tunneling
- Mount your code for live development
- Set up persistent database storage

The app will be available at the ngrok URL displayed in the console.

b. **Other Docker commands**
```bash
# Build the Docker images
npm run docker:build

# Start the containers
npm run docker:up

# Stop the containers
npm run docker:down
```

#### Local Setup

a. **Install dependencies**
```bash
npm install
```

b. **Configure environment variables**
```bash
cp .sample.env .env
```
Update the `.env` file with your:
- Miro app client ID and secret
- OAuth redirect URL
- Encryption key (32 characters)
- Port and environment settings

4. **Start the development server**
```bash
npm run dev
```

### Configuration

The app requires the following environment variables in your `.env` file:

```env
# Miro App credentials
MIRO_CLIENT_ID=your_miro_client_id
MIRO_CLIENT_SECRET=your_miro_client_secret
MIRO_REDIRECT_URL=https://measuremint.app/api/redirect

# Server configuration
PORT=3000
NODE_ENV=production

# Security
ENCRYPTION_KEY=your_32_character_encryption_key

# Email (Resend API)
RESEND_API_KEY=your_resend_api_key
```
```bash
   npm start
```
   
   The app will be available at `https://measuremint.app`

### Miro Developer Setup

1. Go to [Miro App Settings](https://miro.com/app/settings/user-profile/apps/)
2. Click "Create new app"
3. Configure:
   - **App name**: MeasureMint
   - **App URL**: `https://measuremint.app`
   - **Redirect URI**: `https://measuremint.app/api/redirect`
   - **Permissions**: `boards:read`, `boards:write`
   - **SDK URI**: `https://measuremint.app/panel`
4. Install the app to your Miro board

## 📖 How to Use

### 1. Select Image
Click "Select Image" and choose a blueprint, floor plan, or technical drawing on your Miro board.

### 2. Calibrate Scale
1. Click "Calibrate Scale"
2. Click two points on a known distance (e.g., a dimension line showing "20 ft")
3. Enter the actual distance
4. Choose your unit
5. Click "Set Calibration"

### 3. Measure Distances
1. Click "Measure Distance"
2. Click any two points on your calibrated image
3. The measurement appears automatically with full unit conversions

### 4. Switch Units Anytime
Toggle between Imperial (🇺🇸) and Metric (🌍) systems or change specific units - all measurements update automatically!

## 🛠️ Development

### Project Structure

```
measuremint/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.jsx           # Landing page
│   │   ├── panel/             # Main Miro app interface
│   │   ├── privacy/           # Privacy policy page
│   │   ├── terms/             # Terms of service page
│   │   ├── support/           # Support form
│   │   └── api/               # API routes (OAuth, support)
│   ├── components/            # Reusable React components
│   └── utils/                 # Utility functions
├── public/                    # Static assets
├── docs/                      # Documentation
├── package.json              # Dependencies
├── next.config.js            # Next.js configuration
├── tailwind.config.js        # Tailwind CSS configuration
└── README.md                 # This file
```

### Technology Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Platform:** Miro Web SDK v2.0
- **Deployment:** Vercel
- **Language:** JavaScript/React

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run tests

## 🌐 Deployment

### Quick Deploy with Vercel
```bash
npm install -g vercel
vercel
```

### Other Options
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Google Cloud Storage

See full deployment guide in documentation.

## 📋 Marketplace Requirements

- [x] Privacy Policy (https://measuremint.app/privacy)
- [x] Terms of Service (https://measuremint.app/terms)
- [x] Production Domain (https://measuremint.app)
- [x] Support Email (support@measuremint.app)
- [ ] App Icon (512x512px)
- [ ] Toolbar Icon (24x24px)
- [ ] Screenshots (3-5 images, 1280x720px)
- [ ] Demo video (optional but recommended)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## � Troubleshooting

### Common Issues

1. **OAuth Error: redirect_uri_mismatch**
   - Verify the redirect URI in your Miro app settings: `https://measuremint.app/api/redirect`
   - Ensure you're using HTTPS (required for production)
   - Check app-manifest.yaml has the correct production URLs

2. **Cannot find module 'xyz'**
   - In Docker: Run `npm run docker:dev` to rebuild with new dependencies
   - Local setup: Run `npm install`

### Docker-Specific Issues

1. **Port already in use**
   ```bash
   # Stop all running containers
   npm run docker:down
   
   # Remove any orphaned containers
   docker-compose down --remove-orphans
   ```

2. **Changes not reflecting**
   - Ensure your code is properly mounted in docker-compose.yml
   - Try rebuilding the containers: `npm run docker:dev`

3. **Database connectivity issues**
   - Check if the db volume is properly mounted
   - Verify permissions on the db directory
   - Ensure the database path in .env matches the Docker volume path

4. **Ngrok issues**
   - Verify your authtoken is correctly set in .env
   - Check the ngrok container logs: `docker-compose logs ngrok`
   - Try restarting the containers: `npm run docker:down && npm run docker:dev`

## 🔗 Links

- **Website:** [https://measuremint.app](https://measuremint.app)
- **Privacy Policy:** [https://measuremint.app/privacy](https://measuremint.app/privacy)
- **Terms of Service:** [https://measuremint.app/terms](https://measuremint.app/terms)
- **Support:** [support@measuremint.app](mailto:support@measuremint.app)
- [Miro Marketplace](https://miro.com/marketplace/) - Coming soon!
- [Miro Developer Platform](https://developers.miro.com)
- [Miro SDK Documentation](https://developers.miro.com/docs/)
- [GitHub Repository](https://github.com/Khaledykhalil/MeasureMint)

## 🙏 Acknowledgments

- Built with Miro Web SDK v2.0
- Inspired by Bluebeam Revu's professional measurement tools
- Designed for the AEC (Architecture, Engineering, Construction) industry

## 🐛 Known Issues

None currently. Please report any issues on GitHub!

## 🗺️ Roadmap

- [ ] Area calculations
- [ ] Angle measurements
- [ ] Export measurements to CSV
- [ ] Custom unit definitions
- [ ] Measurement templates
- [ ] Multi-language support

---

**MeasureMint** - Making measurements on Miro as easy as they should be.

Made with ❤️ for architects, engineers, and construction professionals.

## 📄 License

**PROPRIETARY SOFTWARE - ALL RIGHTS RESERVED**

This software is proprietary and confidential. Copyright (c) 2025 MeasureMint.

**🚫 Commercial use is strictly prohibited without a license agreement.**

This code and its underlying concepts, algorithms, and implementations are protected intellectual property. You may NOT:
- Use this software commercially in any way
- Create derivative works or competing products
- Reproduce, distribute, or republish any portion of this code
- Integrate this software into commercial products or services

**✅ Personal, non-commercial viewing for evaluation purposes only.**

**💼 Interested in commercial licensing?**
- Want to use this technology in your business?
- Looking to license or purchase the code?
- Need a custom solution based on this work?

**Contact for licensing:** support@measuremint.app

See the [LICENSE](LICENSE) file for complete terms and conditions.

