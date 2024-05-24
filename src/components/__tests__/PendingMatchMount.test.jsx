import { TextEncoder, TextDecoder } from "util";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { PendingContactCard } from "../PendingContactCard";
import { doc } from "firebase/firestore";
import { firestore } from "../../firebase";

global.TextEncoder = TextEncoder;
// @ts-expect-error
global.TextDecoder = TextDecoder;

const testDocRef = doc(
  firestore,
  `accounts/berlin/users/test-user/matchmaking/contacts`
);

test("should render a contact card match card if one exists", () => {
  render(<PendingContactCard userID={testDocRef} />);
  const contactCard = screen.getByTestId("PendincContactCard");
  expect(contactCard).toBeInTheDocument();
});
