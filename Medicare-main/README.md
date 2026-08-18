# Medicare - Healthcare Booking Platform

A modern, full-stack healthcare booking platform built with React.js and Firebase, designed specifically for the Indian healthcare market.

## 🚀 Features

### 🔐 Authentication
- **Firebase Authentication** with multiple login options:
  - Email/Password authentication
  - Google Sign-in
  - Facebook Sign-in
  - Password reset functionality
  - Email verification

### 👥 User Management
- **Patient Portal**: Book appointments, view medical history, manage prescriptions
- **Doctor Portal**: Manage schedules, view patients, conduct consultations
- **Admin Dashboard**: User management, system analytics, content moderation

### 🏥 Healthcare Features
- **Doctor Search & Filtering**: Find doctors by specialty, location, ratings
- **Appointment Booking**: Real-time availability, calendar integration
- **Video Consultations**: Integrated Google Meet/Zoom support
- **Digital Prescriptions**: Upload, manage, and track prescriptions
- **Medical Records**: Secure storage and management
- **Payment Integration**: Support for Indian payment methods (UPI, cards, net banking)

### 🎨 UI/UX
- **Modern Design**: Beautiful, responsive interface with Tailwind CSS
- **Indian Context**: Localized for Indian users with rupee pricing
- **Mobile-First**: Fully responsive design for all devices
- **Accessibility**: WCAG compliant design principles

## 🛠️ Tech Stack

### Frontend
- **React.js** - Modern JavaScript framework
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **React Router** - Client-side routing

### Backend & Database
- **Firebase Authentication** - User authentication and management
- **Cloud Firestore** - NoSQL database for real-time data
- **Firebase Storage** - File storage for images and documents

### Additional Services
- **Google Meet** - Video consultation integration
- **Email Services** - Appointment reminders and notifications
- **Payment Gateways** - Payment methods integration

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm
- Firebase account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/medicare-booking.git
   cd medicare-booking
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Firebase Setup**
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication with Email/Password, Google, and Facebook providers
   - Create a Firestore database
   - Enable Storage
   - Copy your Firebase config

4. **Environment Configuration**
   - Update `src/config/firebase.js` with your Firebase configuration:
   ```javascript
   const firebaseConfig = {
     apiKey: "your-api-key",
     authDomain: "your-project.firebaseapp.com",
     projectId: "your-project-id",
     storageBucket: "your-project.appspot.com",
     messagingSenderId: "your-sender-id",
     appId: "your-app-id"
   };
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:5173`

## 🔧 Firebase Configuration

### Authentication Setup
1. Go to Firebase Console → Authentication → Sign-in method
2. Enable the following providers:
   - Email/Password
   - Google
   - Facebook (optional)

### Firestore Database Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Doctors collection
    match /doctors/{doctorId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Appointments
    match /appointments/{appointmentId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### Storage Rules
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /users/{userId}/{allPaths=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## 📱 Demo Accounts

For testing purposes, you can use these demo accounts:

**Patient Account:**
- Email: `patient123@gmail.com`
- Password: `patient@password`

**Doctor Account:**
- Email: `doctor123@gmail.com`
- Password: `doctor@password`

## 🌟 Key Features Explained

### 🔐 Firebase Authentication
- Secure user registration and login
- Social media authentication (Google, Facebook)
- Password reset functionality
- Email verification
- Role-based access control

### 👨‍⚕️ Doctor Management
- Comprehensive doctor profiles
- Specialty-based filtering
- Rating and review system
- Availability management
- Consultation fee management

### 📅 Appointment System
- Real-time availability checking
- Calendar integration
- Appointment status tracking
- Reminder notifications
- Video consultation links

### 💳 Payment Integration
- Support for Indian payment methods
- UPI integration (Google Pay, Paytm)
- Credit/Debit card support
- Net banking options
- Secure payment processing

### 📱 Responsive Design
- Mobile-first approach
- Tablet and desktop optimization
- Touch-friendly interface
- Fast loading times
- Offline capability

## 🚀 Deployment

### Firebase Hosting
1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase**
   ```bash
   firebase login
   ```

3. **Initialize Firebase in your project**
   ```bash
   firebase init hosting
   ```

4. **Build the project**
   ```bash
   npm run build
   ```

5. **Deploy to Firebase**
   ```bash
   firebase deploy
   ```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Firebase** for providing excellent backend services
- **Tailwind CSS** for the beautiful UI framework
- **Lucide React** for the icon library
- **Pexels** for the stock photos used in the demo

## 📞 Support

For support, email support@medicare.com or join our Slack channel.

## 🔮 Future Enhancements

- [ ] AI-powered symptom checker
- [ ] Telemedicine platform expansion
- [ ] Integration with wearable devices
- [ ] Multi-language support
- [ ] Advanced analytics dashboard
- [ ] Insurance claim processing
- [ ] Pharmacy integration
- [ ] Lab test booking

---

**Made with ❤️ for the Indian Healthcare System**
