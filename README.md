# MeetX - Dating Platform

A modern dating platform built with Next.js and Firebase.

![](https://youtu.be/SAVEr942cTQ)


## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Firebase account

## Setup

1. Clone the repository:

```bash
git clone <repository-url>
cd dating-platform
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Environment Configuration:
   Create a `.env` file in the root directory with your Firebase configuration:

```properties
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3000`

## Firebase Setup

1. Create a new project in [Firebase Console](https://console.firebase.google.com)
2. Enable Authentication service and configure desired sign-in methods
3. Set up Firestore Database
4. Set up Storage for user media
5. Copy your Firebase configuration to the `.env` file

## Features

- User authentication
- Profile creation and management
- Real-time chat
- Match making system
- Profile discovery

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

MIT
