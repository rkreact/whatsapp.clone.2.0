import '../styles/globals.css';
import { useEffect } from 'react'
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import Login from './login';
// import { ThemeProvider } from '@mui/material/styles';
// import theme from '../styles/theme/theme';
import Loading from '../components/Loading';
import { collection, setDoc, doc } from "firebase/firestore";
import firebase from "firebase/app";

function MyApp({ Component, pageProps }) {

  const [user, loading] = useAuthState(auth);
  useEffect(() => {
    // console.log(JSON.stringify(user))
    if (user) {
      addData(user);
    }


  }, [user]);

  const addData = async (user) => {
    var date = new Date();
    var now_utc = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(),
      date.getUTCDate(), date.getUTCHours(),
      date.getUTCMinutes(), date.getUTCSeconds());

    await setDoc(doc(db, "users", user.uid),
      {
        email: user.email,
        photoURL: user.photoURL,
        lastSeen: new Date(now_utc),
      },
      { merge: true }
    );
  }
  if (loading) return <Loading />;
  if (!user) return <Login />
  return <Component {...pageProps} />
}

export default MyApp;


