# Journaling App

This is a journaling app built with Reactive Native + Expo. It includes
- User authentication (Firebase email/password authentication)
- User journal entries stored in Firestore
- Persistent login across app restarts

# Features
- Sign-up/Sign-in with Firebase Authentication
- Add journal entries
- Entries are saved per user (and persist even when logging out/in)
- iOS keyboard handling


# How to Run

## Clone the repo
```bash
git clone https://github.com/tanishkamehta000/journaling-app.git
cd journaling-app
```

## Install dependencies
```bash
npm install
```

## Run the app
Start Metro bundler:
```bash
npx expo start --lan
```

Scan the QR code in Expo Go on a phone.

# Note:
This app is already connected to a shared Firebase project (`journaling-app-65a3c`). No additional setup is required. When cloning and running the app, it will use this backend automatically.


## Requirements Demonstrated

- Dev environment: Expo (React Native)
- Runs on physical device via Expo Go
- Code checked into GitHub (tanishkamehta000)
- Partner can clone, build, and deploy
- Backend: Firebase (Authentication + Firestore Database)
- Exceptional work: per-user authentication & storage, UI changes with screen flow (sign up/in --> journal)