import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { onSnapshot } from "firebase/firestore";
import Chat from "../Chat/chat.jsx"; // Adjust the import based on your file structure
import { useAuth } from "../../contexts/AuthContext";

// Mock Firestore functions
jest.mock("firebase/firestore", () => ({
  doc: jest.fn(),
  getDoc: jest.fn(),
  updateDoc: jest.fn(),
  Timestamp: {
    now: jest.fn(() => ({
      seconds: 1234567890,
      nanoseconds: 0,
    })),
  },
  arrayUnion: jest.fn((message) => [message]),
}));

// Mock useAuth context
jest.mock("../../contexts/AuthContext", () => ({
  useAuth: jest.fn(),
}));

const mockChatroomRef = { id: "mockChatroomRefId" };

describe("Chat component", () => {
  beforeEach(() => {
    // Mock currentUser
    useAuth.mockReturnValue({
      currentUser: {
        uid: "testUserId",
      },
    });

    // Mock Firestore getDoc for user data
    getDoc.mockImplementation(async (docRef) => {
      if (docRef.path === "accounts/berlin/users/uid") {
        return {
          exists: true,
          data: () => ({
            profilePicture: "testUserProfilePicture.jpg",
            name: "Test User",
            about: "About Test User",
          }),
        };
      } else if (docRef.path === "accounts/berlin/users/uid") {
        return {
          exists: true,
          data: () => ({
            profilePicture: "recipientUserProfilePicture.jpg",
            name: "Recipient User",
            about: "About Recipient User",
          }),
        };
      }
      return { exists: false };
    });

    // Mock Firestore getDoc for chatroom
    getDoc.mockImplementation(async (docRef) => {
      if (docRef.id === mockChatroomRef.id) {
        return {
          exists: true,
          data: () => ({
            participants: ["testUserId", "recipientUserId"],
            messages: [],
          }),
        };
      }
      return { exists: false };
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("sends a message", async () => {
    render(<Chat chatroomRef={mockChatroomRef} />);

    const input = screen.getByPlaceholderText("Type a message...");
    const sendButton = screen.getByText("Send");

    fireEvent.change(input, { target: { value: "Hello, World!" } });
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(updateDoc).toHaveBeenCalledWith(mockChatroomRef, {
        messages: expect.arrayContaining([
          expect.objectContaining({
            senderID: "testUserId",
            messageContent: "Hello, World!",
            timeSent: expect.any(Object),
          }),
        ]),
      });
    });

    expect(input.value).toBe("");
  });
});
