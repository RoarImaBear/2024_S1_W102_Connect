import { TextEncoder, TextDecoder } from "util";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { ContactCard } from "../ContactCard";
import { doc, onSnapshot } from "firebase/firestore";
import { firestore } from "../../firebase";

global.TextEncoder = TextEncoder;
// @ts-expect-error
global.TextDecoder = TextDecoder;

const testDocRef = doc(
  firestore,
  `accounts/berlin/users/test-user/matchmaking/contacts`
);

test("should render a contact card match card if one exists", () => {
  render(<ContactCard userID={testDocRef} />);
  const contactCard = screen.getByTestId("contactCard");
  expect(contactCard).toBeInTheDocument();
});
