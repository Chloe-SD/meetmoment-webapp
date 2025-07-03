# MeetMoment - Cross-Platform Scheduling Application

**Full-stack scheduling solution with complex n-person availability algorithms and real-time synchronization**

🌐 **[Live Demo](https://meetmoment-webapp.vercel.app/)** | 📱 **[Android Version](https://github.com/Chloe-SD/MeetMoment)**

![Screenshot 2025-07-03 092005](https://github.com/user-attachments/assets/551a23aa-5c94-4a02-a920-2d806dfa26da)

## 🚀 What It Does

MeetMoment solves the "when can everyone meet?" problem by finding common availability across multiple participants. Whether it's work meetings, group projects, or coffee dates - see everyone's availability at a glance and find the perfect time slot.

### Key Features
- **Smart Availability Matching** - Complex algorithms find optimal meeting times for n-person groups
- **Real-Time Synchronization** - Live updates across all participants using Firebase
- **Cross-Platform Access** - Shared database with Android app for seamless platform switching
- **Intuitive Interface** - Clean, responsive design for effortless scheduling
- **Secure Authentication** - Firebase Auth with personalized user accounts

## 🛠️ Technical Architecture

**Framework:** Next.js 14 with App Router  
**Database:** Firebase Firestore with real-time listeners  
**Authentication:** Firebase Auth (email/password)  
**Styling:** TailwindCSS with responsive design  
**Deployment:** Vercel with automatic deployments  

### Core Algorithm
The availability matching engine processes overlapping time slots across multiple participants:
- Converts user availability into standardized time blocks
- Calculates intersection of all participant schedules  
- Returns ranked suggestions based on optimal overlap
- Handles timezone differences and conflict resolution

## 📱 Cross-Platform Ecosystem

This web application shares a unified backend with the **[MeetMoment Android app](https://github.com/Chloe-SD/MeetMoment)**, enabling users to:
- Create meetings on web, join from mobile
- Access the same meetings across platforms
- Real-time sync between web and Android interfaces
- Consistent user experience regardless of device

## 🚀 Quick Start

### Live Demo
Visit **[meetmoment-webapp.vercel.app](https://meetmoment-webapp.vercel.app/)** to try it immediately - no setup required!

### Local Development
```bash
# Clone and install
git clone https://github.com/Chloe-SD/meetmoment-webapp.git
cd meetmoment-webapp
npm install

# Run development server
npm run dev
# Open http://localhost:3000

# Build for production
npm run build
npm start
```

## 🎯 Development Highlights

**Complex State Management** - Real-time synchronization of meeting data across multiple users  
**Algorithm Design** - Custom availability matching logic for n-person scheduling  
**Cross-Platform Architecture** - Shared Firebase backend serving both web and mobile clients  
**Responsive Design** - Mobile-first approach with seamless desktop experience  
**Performance Optimization** - Next.js optimization features for fast loading and SEO  

## 🔗 Project Context

**Personal Project** - Built as companion to group-developed Android application  
**Technology Expansion** - Demonstrates ability to adapt concepts across platforms  
**Full-Stack Implementation** - End-to-end development from database design to deployment  

## 📸 Screenshots
![mnew](https://github.com/user-attachments/assets/0e2d34fd-e3f4-4ba9-a151-f5702bebeec7)
![mdone](https://github.com/user-attachments/assets/2acbd802-6037-4745-be46-5323efe7b340)


---

**Tech Stack:** Next.js, Firebase, TailwindCSS, Vercel
