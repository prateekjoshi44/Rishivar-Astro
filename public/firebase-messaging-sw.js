importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');


const firebaseConfig = {
  apiKey: "AIzaSyD-SPyj-rnSoTPRyJc5oRRjJyykmPD-m88",
  authDomain: "rishivar-d5fa9.firebaseapp.com",
  projectId: "rishivar-d5fa9",
  storageBucket: "rishivar-d5fa9.appspot.com",
  messagingSenderId: "857052844721",
  appId: "1:857052844721:web:2dc9813f839ca621dc4890",
  measurementId: "G-F521MMRN00",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// messaging.onBackgroundMessage((payload) => {
//   console.log('[firebase-messaging-sw.js] Received background message ', payload);

//   const options = {
//     body: payload.data.description,
//     // data: { order_id: payload.data.order_id },
//     // icon: "/logo192.png",
//   };
//   self.registration.showNotification(payload.data.title, options);

// });

