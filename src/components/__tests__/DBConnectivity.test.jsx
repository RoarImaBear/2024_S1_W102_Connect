import { TextEncoder, TextDecoder } from "util";
import { render, screen, cleanup } from "@testing-library/react";
import React, { useEffect, useState } from "react";
import "@testing-library/jest-dom/extend-expect";
import { collection, doc } from "firebase/firestore";
import { firestore } from "../../firebase";

import {
  useFetchRealtimeDoc,
  useFetchRealtimeCollection,
} from "../../support-functions/importFunctions";

const testCollectionRef = collection(firestore, "testCollection");
const testDocRef = doc(testCollectionRef, `testDocOne`);
const testString = `test`;
const testNum = 123;

// Hooks cannot be tested without being inside a component

test("UseFetchRealtimeDoc fetches the correct testDoc.", () => {
  // const [doc, setDoc] = useState([]);
  // useFetchRealtimeDoc(testDocRef, setDoc);
});

// useFetchRealtimeCollection(contactsColRef, setContactsCol);
