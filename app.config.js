require('dotenv').config();

export default {
  expo: {
    name: 'pinterest-app',
    slug: 'pinterest-app',
    version: '1.0.1',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    plugins: [
      'expo-font',
      'expo-status-bar',
      'expo-image',
      [
        'expo-splash-screen',
        {
          image: './assets/icon.png',
          resizeMode: 'contain',
          backgroundColor: '#ffffff',
        },
      ],
    ],
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.anonymous.myapp',
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundImage: './assets/adaptive-icon-background.png',
      },
      package: 'com.anonymous.myapp',
    },
    web: {
      favicon: './assets/favicon.png',
    },
    extra: {
      unsplashApiKey: process.env.EXPO_PUBLIC_UNSPLASH_API_KEY,
      eas: {
        projectId: '428d79df-a970-499a-b4d7-beb83aac41bb',
      },
    },
    owner: 'palinahushcha',
    runtimeVersion: {
      policy: 'appVersion',
    },
    updates: {
      url: 'https://u.expo.dev/428d79df-a970-499a-b4d7-beb83aac41bb',
    },
  },
};
