import { useEffect } from "react";
import { getDocs, onSnapshot } from "@firebase/firestore";

export const useFetchCollection = (collectionRef, setData) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collectionRef);
        const fetchedData = [];
        querySnapshot.forEach((doc) => {
          fetchedData.push({ id: doc.id, ref: doc.ref, data: doc.data() });
          console.log(doc.id, " : ", doc.data());
        });
        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
};

export const useFetchRealtime = (ref, setData) => {
  useEffect(() => {
    const unsubscribe = onSnapshot(ref, (querySnapshot) => {
      const fetchedData = [];
      querySnapshot.forEach((doc) => {
        fetchedData.push({ id: doc.id, ref: doc.ref, data: doc.data() });
      });
      setData(fetchedData);
    });
    return () => unsubscribe();
  }, []);
};

export const useFetchRealtimeDoc = (ref, setData) => {
  useEffect(() => {
    const unsubscribe = onSnapshot(ref, (doc) => {
      if (doc.exists) {
        const fetchedData = doc.data();
        setData(fetchedData);
      } else {
        setData("failed to load");
      }
    });
    return () => unsubscribe();
  }, []);
};

export default useFetchCollection;
