import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG);

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

const mapDevittFromFirebaseToDevittObject = (doc) => {
  const data = doc.data();
  const { id } = doc;
  const { createdAt } = data;

  return { ...data, id, createdAt: +createdAt.toDate() };
};

export const listenLastetDevitts = (callback) =>
  db
    .collection("devitts")
    .orderBy("createdAt", "desc")
    .limit(20)
    .onSnapshot(({ docs }) => {
      const newDevitts = docs.map(mapDevittFromFirebaseToDevittObject);
      callback(newDevitts);
    });

export const fetchLatestDevitts = () =>
  db
    .collection("devitts")
    .orderBy("createdAt", "desc")
    .get()
    .then(({ docs }) => docs.map(mapDevittFromFirebaseToDevittObject));

export const uploadImage = (file) => {
  const ref = firebase.storage().ref(`/images/${file.name}`);
  const task = ref.put(file);
  return task;
};

export default firebaseApp;
