import firebase from 'react-native-firebase';
import I18n from '../i18n';

const authProviders = {
  GoogleAuthProvider: firebase.auth.GoogleAuthProvider,
  FacebookAuthProvider: firebase.auth.FacebookAuthProvider,
};
const firestore = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

let fuelList;
let unsubscribeFuels = () => null;
let currentUserInstance;

const init = () => {
  auth.languageCode = I18n.getCurrentLanguage();
}

const initData = () => {
  currentUserInstance = auth.currentUser;

  const fuelsRef = firestore.collection('fuels');

  unsubscribeFuels = fuelsRef.onSnapshot(snapshot => {
    fuelList = [];

    snapshot.forEach(fuelRef => {
      fuelList.push({
        translations: fuelRef.data(),
        key: fuelRef.id,
      });
    });
  }, err => console.warn(err));
}

const stopData = () => {
  unsubscribeFuels();
}

const destroy = () => {

}

loadImage = async (key) => {
  const image = storage.ref(`${key}.jpg`);
  try {
    const imageUrl = await image.getDownloadURL();
    return imageUrl;
  } catch(err) {
    if (err.code !== 'storage/object-not-found') console.warn(err);
    return null;
  }
};

const fuels = () => fuelList;
const currentUser = () => currentUserInstance;

export default {
  firestore,
  authProviders,
  auth,
  storage,
  init,
  initData,
  stopData,
  destroy,
  fuels,
  currentUser,
  loadImage,
}
