import { TextEncoder, TextDecoder } from "util";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../firebase";
import { useFetchRealtimeDoc } from "../../support-functions/importFunctions";
import { Chat } from "../Chat/chat";

global.TextEncoder = TextEncoder;
// @ts-expect-error
global.TextDecoder = TextDecoder;

const mockChatroomRef = doc(firestore, "accounts/berlin/users/test-user");
//mock auth
jest.mock("../../contexts/AuthContext", () => ({
  useAuth: () => ({
    currentUser: { uid: "test-user" },
  }),
}));

// testing sending message
test("You should send a message", async () => {
  render(<Chat chatroomRef={mockChatroomRef} />);

  // Simulate user input and send action
  const input = screen.getByPlaceholderText("Type a message...");
  const sendButton = screen.getByText("Send");

  fireEvent.change(input, { target: { value: "testing testing 123" } });
  fireEvent.click(sendButton);

  // Wait for the updateDoc call
  await waitFor(() => {
    expect(updateDoc).toHaveBeenCalledWith(mockChatroomRef, {
      messages: expect.arrayContaining([
        expect.objectContaining({
          senderID: "test-user",
          messageContent: "testing testing 123",
          timeSent: expect.any(Object),
        }),
      ]),
    });
  });

  // Ensure the input is cleared after sending the message
  expect(input.value).toBe("");
});
