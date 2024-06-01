import { TextEncoder, TextDecoder } from "util";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { doc } from "firebase/firestore";
import { firestore } from "../../firebase";

import { useFetchRealtimeDoc } from "../../support-functions/importFunctions";
import { PendingContactCard } from "../PendingContactCard";

global.TextEncoder = TextEncoder;
// @ts-expect-error
global.TextDecoder = TextDecoder;

const testDocRef = doc(firestore, "accounts/berlin/users/test-user");

test("should render a contact card match card if one exists", () => {
  render(<PendingContactCard userID={testDocRef} />);
  const contactCard = screen.getByTestId("PendingContactCard");
  expect(contactCard).toBeInTheDocument();
});

// // Mock the useAuth hook
// jest.mock("../../contexts/AuthContext", () => ({
//   useAuth: () => ({
//     currentUser: { uid: "test-user" },
//   }),
// }));

// // Mock the useFetchRealtimeDoc function
// jest.mock("../../support-functions/importFunctions", () => ({
//   useFetchRealtimeDoc: jest.fn(),
// }));

// describe("PendingContactCard", () => {
//   it("should render the contact card with real-time updates", () => {
//     // Mock initial state of contact
//     const mockSetContact = jest.fn();
//     useFetchRealtimeDoc.mockImplementation((testDocRef, setContact) => {
//       // Call setContact with initial contact data
//       setContact({ id: "test-contact", name: "John Doe", age: 30 });

//       // Simulate a real-time update after some time
//       setTimeout(() => {
//         setContact({ id: "test-contact", name: "John Doe", age: 31 });
//       }, 1000);
//     });

//     render(<PendingContactCard contactDocRef={testDocRef} />);

//     // Verify initial render
//     expect(screen.getByTestId("PendingContactCard")).toBeInTheDocument();
//     expect(screen.getByText("John Doe")).toBeInTheDocument();
//     expect(screen.getByText("30")).toBeInTheDocument();

//     // Verify real-time update
//     setTimeout(() => {
//       expect(screen.getByText("31")).toBeInTheDocument();
//     }, 1500);
//   });
// });

// const testDocRef = doc(firestore, `accounts/berlin/users/test-user`);

// jest.mock("../../contexts/AuthContext", () => ({
//   useAuth: () => ({
//     currentUser: { uid: "test-user" }, // Provide a mock currentUser object
//   }),
// }));

// test("should render a contact card match card if one exists", () => {
//   render(<PendingContactCard userID={testDocRef} />);
//   const contactCard = screen.getByTestId("PendingContactCard");
//   expect(contactCard).toBeInTheDocument();
// });
