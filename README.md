# Developer Portfolio

A modern, fully responsive developer portfolio built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern Design**: Clean, minimal, and professional UI
- **Fully Responsive**: Mobile-first design that works on all devices
- **Dark Mode**: Toggle between light and dark themes
- **Smooth Animations**: Framer Motion animations for enhanced UX
- **Interactive Components**: Hover effects, smooth scrolling, and transitions
- **TypeScript**: Full type safety throughout the application
- **Tailwind CSS**: Utility-first CSS framework for rapid styling

## 📱 Sections

1. **Hero Section**: Developer introduction with call-to-action buttons
2. **Projects Section**: Showcase of featured projects with tech stacks
3. **Skills Section**: Organized skills by category (Frontend, Mobile, Backend, Database, Tools)
4. **About Section**: Personal bio with statistics and profile image
5. **Contact Section**: Contact form and social media links
6. **Navigation**: Sticky navbar with smooth scroll navigation
7. **Footer**: Additional links and social media integration

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Vercel-ready

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd developer-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── components/
│   ├── sections/           # Page sections
│   │   ├── HeroSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── SkillsSection.tsx
│   │   ├── AboutSection.tsx
│   │   └── ContactSection.tsx
│   ├── Navbar.tsx          # Navigation component
│   ├── Footer.tsx          # Footer component
│   └── DarkModeToggle.tsx # Theme toggle
├── lib/
│   └── data.ts             # Sample data
└── types/
    └── index.ts            # TypeScript interfaces
```

## 🎨 Customization

### Personal Information

Update the following files with your information:

1. **Hero Section** (`src/components/sections/HeroSection.tsx`):
   - Change name, title, and tagline
   - Update call-to-action buttons

2. **About Section** (`src/components/sections/AboutSection.tsx`):
   - Update bio text
   - Replace profile image
   - Modify statistics

3. **Projects** (`src/lib/data.ts`):
   - Add your projects
   - Update tech stacks
   - Add live demo and GitHub links

4. **Skills** (`src/lib/data.ts`):
   - Add/remove skills
   - Organize by categories

5. **Contact** (`src/components/sections/ContactSection.tsx`):
   - Update email address
   - Add social media links

### Styling

- **Colors**: Modify Tailwind classes throughout components
- **Fonts**: Update font families in `globals.css`
- **Spacing**: Adjust padding and margins using Tailwind utilities
- **Animations**: Customize Framer Motion animations

### Images

Replace placeholder images in the `public/images/` directory:
- Profile image for About section
- Project screenshots for Projects section

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with zero configuration

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📞 Support

If you have any questions or need help customizing this portfolio, feel free to reach out!

---

**Happy Coding!** 🎉