require("dotenv").config();

export default {
  expo: {
    name: "pinterest-app",
    slug: "pinterest-app",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    plugins: [
      "expo-status-bar",
      [
        "expo-splash-screen",
        {
          image: "./assets/splash.png",
          resizeMode: "contain",
          backgroundColor: "#ffffff",
        },
      ],
    ],
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      package: "com.anonymous.myapp",
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    extra: {
      unsplashApiKey: process.env.UNSPLASH_API_KEY,
      eas: {
        projectId: "428d79df-a970-499a-b4d7-beb83aac41bb",
      },
    },
    owner: "palinahushcha",
    runtimeVersion: {
      policy: "appVersion",
    },
    updates: {
      url: "https://u.expo.dev/428d79df-a970-499a-b4d7-beb83aac41bb",
    },
  },
};
