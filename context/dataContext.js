import { useState, useEffect, createContext, useContext } from "react";
//custom packs
import { useSession } from "next-auth/react";
import { db } from "../firebase";
import {
  doc,
  addDoc,
  updateDoc,
  getDoc,
  collection,
  onSnapshot,
  orderBy,
  where,
  query,
  serverTimestamp,
} from "@firebase/firestore";
//custom
import localforage from "localforage";
import OneSignal from "react-onesignal";

const dataContext = createContext();

export function ProvideData({ children }) {
  const data = useProvideData();
  return <dataContext.Provider value={data}>{children}</dataContext.Provider>;
}

export const useData = () => {
  return useContext(dataContext);
};

function useProvideData() {
  const { data: session, status } = useSession();
  //hold app states
  const [loading, setLoading] = useState(true);
  const [userPoints, setUserPoints] = useState(null);
  //product selected
  const [event, setEvent] = useState(null);
  const [prod, setProd] = useState(null);
  const [side, setSide] = useState(false);
  const [orders, setOrders] = useState([]);
  const [redeem, setRedeem] = useState(false);
  const [selRequest, setSelRequest] = useState(null);
  //hold data
  const [posts, setPosts] = useState([]);
  const [offers, setOffers] = useState([]);
  const [requests, setRequests] = useState([]);

  const onSetProd = (val) => setProd(val);
  const onSetEvent = (val) => setEvent(val);

  const onSetSide = (val) => setSide(val);
  const onSetUserPoints = (val) => setUserPoints(val);
  const onSetRedeem = (val) => setRedeem(val);
  const onSetSelRequest = (val) => setSelRequest(val);
  const onSetOrders = (val) => setOrders(val);
  const onSetPosts = (val) => {
    if (val?.length > 0) setPosts(val);
  };
  const onSetOffers = (val) => {
    if (val?.length > 0) setOffers(val);
  };
  const onSetRequests = (val) => {
    if (val?.length > 0) setRequests(val);
  };

  //Enable Push Notifications
  useEffect(async () => {
    await OneSignal.init({
      appId: "599b662d-529b-4843-a940-ba64c1e174c0",
      notifyButton: {
        enable: true,
      },
      allowLocalhostAsSecureOrigin: true,
    });
  }, []);

  //useEffect(() => { }, []);
  useEffect(() => {
    SetPushExternalId();
    createUser();
    readPostsHistory();
    readOffersPromos();
    readUserData();
    readRequests();
  }, [db, session]);

  async function readPostsHistory() {
    if (session?.user) {
      const q = query(
        collection(db, `collections/${session?.user.id}/posts`),
        orderBy("timestamp", "desc")
      );
      return onSnapshot(q, (snapshot) => {
        onSetPosts(snapshot.docs);
      });
    }
  }

  async function SetPushExternalId() {
    if (session?.user) {
      OneSignal.getExternalUserId().then(function (externalUserId) {
        console.log("externalUserId: ", externalUserId);
        if (!externalUserId) {
          OneSignal.setExternalUserId(session.user.id);
        }
      });
    }
  }

  async function createUser() {
    if (session?.user) {
      const docRef = doc(db, "users", session.user.id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        // Add a new document in collection "users"
        await updateDoc(doc(db, "users", session.user.id), {
          name: session.user.name,
          email: session.user.email,
        });
      }
    }
  }

  async function logInstallData(log) {
    try {
      if (session?.user) {
        const docRef = doc(db, "users", session.user.id);
        const docSnap = await getDoc(docRef);
        console.log(log);
        if (docSnap.exists()) {
          // Add a new document in collection "installs"
          await updateDoc(doc(db, "users", session.user.id), {
            ...log,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function readUserData() {
    if (session?.user) {
      const docRef = doc(db, "users", session.user.id);

      onSnapshot(docRef, (doc) => {
        if (doc.exists()) {
          // Add a new document in collection "cities"
          let p = doc.data().points ? doc.data().points : 0;
          onSetUserPoints(p);
        }
      });
    }
  }

  async function readOffersPromos() {
    const q = query(collection(db, "offers"), orderBy("name", "desc"));
    return onSnapshot(q, (snapshot) => {
      const o = [];
      snapshot.forEach((doc) => {
        o.push(doc.data());
      });
      onSetOffers(o);
    });
  }

  async function readRequests() {
    if (session?.user) {
      const q = query(
        collection(db, "requests"),
        where("userId", "==", session?.user.id),
        orderBy("timestamp", "desc")
      );
      return onSnapshot(q, (snapshot) => {
        const d = [];
        snapshot.forEach((doc) => {
          d.push(doc.data());
        });
        onSetRequests(d);
      });
    }
  }

  async function uploadRequest(type) {
    return new Promise(async (resolve, reject) => {
      try {
        if (status !== "unauthenticated") {
          const docRef = await addDoc(collection(db, `requests`), {
            profileImg: session.user.image,
            username: session.user.name,
            userId: session.user.id,
            status: "pending",
            reqType: type,
            orders,
            timestamp: serverTimestamp(),
          });
          //console.log('New doc added with ID', docRef.id);

          if (docRef) {
            onSetOrders([]);
            resolve({ status: 200 });
          }
        }
      } catch (error) {
        reject(error);
      }
    });
  }


  return {
    logInstallData,
    orders,
    side,
    onSetSide,
    prod,
    event,
    onSetProd,
    onSetEvent,
    redeem,
    onSetRedeem,
    selRequest,
    onSetSelRequest,
    requests,
    onSetRequests,
    userPoints,
    posts,
    offers,
    uploadRequest,
  };
}
