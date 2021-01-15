import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBX819Al29iUot8ch69L9p1lVH-HxnjkRQ",
  authDomain: "devtter-1ad60.firebaseapp.com",
  projectId: "devtter-1ad60",
  storageBucket: "devtter-1ad60.appspot.com",
  messagingSenderId: "56294719505",
  appId: "1:56294719505:web:00a735a94431f73e1031b0",
  measurementId: "G-DD3HRQLL4B",
};

const firebaseApp = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = firebase.firestore();

const mapUserFromFirebaseAuthToUser = (user) => {
  const { displayName, email, photoURL, uid } = user;

  return {
    avatar: photoURL,
    userName: displayName,
    email,
    uid,
  };
};

export const onAuthStateChanged = (onChange) =>
  firebase.auth().onAuthStateChanged((user) => {
    const normalizedUser = user ? mapUserFromFirebaseAuthToUser(user) : null;
    onChange(normalizedUser);
  });

export const loginWithGitHub = () => {
  const gitHubProvider = new firebase.auth.GithubAuthProvider();
  return firebase.auth().signInWithPopup(gitHubProvider);
};

export const addDevitt = ({ avatar, content, img, userId, userName }) =>
  db.collection("devitts").add({
    avatar,
    content,
    img,
    userId,
    userName,
    createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
    likesCount: 0,
    sharedCount: 0,
  });

export const fetchLatestDevitts = () =>
  db
    .collection("devitts")
    .orderBy("createdAt", "desc")
    .get()
    .then(({ docs }) =>
      docs.map((doc) => {
        const data = doc.data();
        const { id } = doc;
        const { createdAt } = data;

        return { ...data, id, createdAt: +createdAt.toDate() };
      })
    );

export const uploadImage = (file) => {
  const ref = firebase.storage().ref(`/images/${file.name}`);
  const task = ref.put(file);
  return task;
};

export default firebaseApp;
