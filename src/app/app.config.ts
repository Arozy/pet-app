import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideServiceWorker } from '@angular/service-worker';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { connectAuthEmulator, getAuth, provideAuth } from '@angular/fire/auth';
import {
  getAnalytics,
  provideAnalytics,
  ScreenTrackingService,
  UserTrackingService,
} from '@angular/fire/analytics';
import {
  initializeAppCheck,
  provideAppCheck,
  ReCaptchaEnterpriseProvider,
} from '@angular/fire/app-check';
import {
  connectFirestoreEmulator,
  getFirestore,
  provideFirestore,
} from '@angular/fire/firestore';
import {
  connectDatabaseEmulator,
  getDatabase,
  provideDatabase,
} from '@angular/fire/database';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';
import { getPerformance, providePerformance } from '@angular/fire/performance';
import {
  connectStorageEmulator,
  getStorage,
  provideStorage,
} from '@angular/fire/storage';
import {
  getRemoteConfig,
  provideRemoteConfig,
} from '@angular/fire/remote-config';
import { getVertexAI, provideVertexAI } from '@angular/fire/vertexai-preview';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
    provideAnimationsAsync(),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'firestork-5a0d8',
        appId: '1:225600767754:web:6b7af9cc858c1a4bdf1cf3',
        databaseURL:
          'https://firestork-5a0d8-default-rtdb.europe-west1.firebasedatabase.app',
        storageBucket: 'firestork-5a0d8.appspot.com',
        apiKey: 'AIzaSyAv22OVAjmmOarOtT39ZN712XjbgfmkRYA',
        authDomain: 'firestork-5a0d8.firebaseapp.com',
        messagingSenderId: '225600767754',
        measurementId: 'G-3BPJYPQYXG',
      })
    ),
    provideAuth(() => {
      const auth = getAuth();
      connectAuthEmulator(auth, 'localhost:9099');
      return auth;
    }),
    provideAnalytics(() => getAnalytics()),
    ScreenTrackingService,
    UserTrackingService,
    provideAppCheck(() => {
      // TODO get a reCAPTCHA Enterprise here https://console.cloud.google.com/security/recaptcha?project=_
      // TODO Demo Key, remove ASAP
      const provider = new ReCaptchaEnterpriseProvider(
        '6Ld8dm0qAAAAAOm1FVv6fyp0SDtZfXmdoqW1jzkp'
      );
      return initializeAppCheck(undefined, {
        provider,
        isTokenAutoRefreshEnabled: true,
      });
    }),
    provideFirestore(() => {
      const firestore = getFirestore();
      connectFirestoreEmulator(firestore, 'localhost', 8080);
      return firestore;
    }),
    provideDatabase(() => {
      const database = getDatabase();
      connectDatabaseEmulator(database, 'localhost', 9000);
      return getDatabase();
    }),
    provideMessaging(() => getMessaging()),
    providePerformance(() => getPerformance()),
    provideStorage(() => {
      const storage = getStorage();
      connectStorageEmulator(storage, 'localhost', 9199);
      return storage;
    }),
    provideRemoteConfig(() => getRemoteConfig()),
    provideVertexAI(() => getVertexAI()),
  ],
};
