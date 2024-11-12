import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, update } from 'firebase/database';
import { useEffect, useState, useCallback } from 'react';

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);
// const storage = getStorage(app);

// Custom hook for fetching data from Firebase Realtime Database
export const useDbData = (path: string): [any, Error | null] => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const unsubscribe = onValue(ref(database, path), (snapshot) => {
      setData(snapshot.val());
    }, (error) => {
      setError(error);
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, [path]);

  return [data, error];
};

// Custom hook for updating data in Firebase Realtime Database
export const useDbUpdate = (path: string): [(value: any) => void, { timestamp: number; error?: string; message: string }] => {
  const [result, setResult] = useState<{ timestamp: number; error?: string; message: string }>({
    timestamp: Date.now(),
    message: 'Ready to update',
  });

  const updateData = useCallback((value: any) => {
    update(ref(database, path), value)
      .then(() => setResult(makeResult()))
      .catch((error) => setResult(makeResult(error)));
  }, [path]);

  return [updateData, result];
};

// Firebase Storage hook for uploading files (e.g., recipe images)
// export const useStorageUpload = (path: string) => {
//   const [uploadProgress, setUploadProgress] = useState<number>(0);
//   const [error, setError] = useState<string | null>(null);
//   const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

//   const uploadFile = useCallback(async (file: File) => {
//     const storagePath = storageRef(storage, path);
//     const uploadTask = uploadBytes(storagePath, file);

//     uploadTask.on('state_changed', (snapshot) => {
//       const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//       setUploadProgress(progress);
//     }, (error) => {
//       setError(error.message);
//     }, () => {
//       getDownloadURL(uploadTask.snapshot.ref).then((url) => {
//         setDownloadUrl(url);
//       });
//     });
//   }, [path]);

//   return { uploadFile, uploadProgress, error, downloadUrl };
// };

// Helper function to create result object
const makeResult = (error?: { message: string }) => {
  const timestamp = Date.now();
  const message = error?.message || `Updated: ${new Date(timestamp).toLocaleString()}`;
  return { timestamp, error: error?.message, message };
};

