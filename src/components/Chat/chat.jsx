import { useEffect, useRef, useState } from "react";
import {
  Timestamp,
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useAuth } from "../../contexts/AuthContext";
import "./chat.css";
import { firestore } from "../../firebase";

export function Chat({ chatroomRef }) {
  const [chat, setChat] = useState({});
  const [text, setText] = useState("");
  const { currentUser } = useAuth();
  const currentUserID = currentUser.uid;
  const [currentUserData, setCurrentUserData] = useState(null);
  const [recipientUserData, setRecipientUserData] = useState(null);

  const endRef = useRef(null);

  //Fetches chatroom information when component mounts
  useEffect(() => {
    if (!chatroomRef) return;

    const unsubscribe = onSnapshot(chatroomRef, (res) => {
      setChat(res.data());
    });

    return () => {
      unsubscribe();
    };
  }, [chatroomRef]);

  //Fetch current user's information when component mounts
  useEffect(() => {
    const fetchCurrentUserData = async () => {
      try {
        const userDoc = await getDoc(
          doc(firestore, "accounts/berlin/users", currentUserID)
        );
        if (userDoc.exists()) {
          setCurrentUserData(userDoc.data());
        } else {
          console.log("Current user document not found");
        }
      } catch (error) {
        console.error("Error fetching current user info:", error);
      }
    };

    fetchCurrentUserData();
  }, [currentUserID]);

  // Fetch recipient user's information when component mounts
  useEffect(() => {
    const fetchRecipientUserData = async () => {
      try {
        if (!chatroomRef) return;

        const chatroomSnapshot = await getDoc(chatroomRef);
        const participants = chatroomSnapshot.data().participants;
        // Find the user ID of the other participant
        const recipientUserID = participants.find((id) => id !== currentUserID);

        const userDoc = await getDoc(
          doc(firestore, "accounts/berlin/users", recipientUserID)
        );
        if (userDoc.exists()) {
          setRecipientUserData(userDoc.data());
        } else {
          console.log("Recipient user document not found");
        }
      } catch (error) {
        console.error("Error fetching recipient user info:", error);
      }
    };

    fetchRecipientUserData();
  }, [chatroomRef, currentUserID]);

  console.log(text);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat?.messages]);

  //handles messaging capability
  const handleSendMessage = async () => {
    if (text.trim() === "") return;

    const newMessage = {
      senderID: currentUserID,
      messageContent: text,
      timeSent: Timestamp.now(),
    };

    try {
      await updateDoc(chatroomRef, {
        messages: arrayUnion(newMessage),
      });
      setText("");
    } catch (error) {
      console.error("Error sending message: " + error);
    }
  };
  // when User presses "Enter" their message gets sent
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="chat">
      <div className="top">
        <div className="user">
          <img src={recipientUserData?.profilePicture} alt="" />
          <div className="texts">
            <span>{recipientUserData?.name}</span>
            <p>{recipientUserData?.about}</p>
          </div>
        </div>
      </div>
      <div className="center">
        {chat?.messages?.map((message, index) => (
          <div
            key={index}
            className={
              message.senderID === currentUserID ? "message own" : "message"
            }
          >
            <img
              src={
                message.senderID === currentUserID
                  ? currentUserData?.profilePicture
                  : recipientUserData?.profilePicture
              }
              alt=""
            />
            <div className="texts">
              <p>{message.messageContent}</p>
              <span>
                {new Date(
                  message.timeSent?.seconds * 1000
                ).toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
        <div ref={endRef}></div>
      </div>
      <div className="bottom">
        <input
          type="text"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button className="sendButton" onClick={handleSendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
