// import { useEffect, useRef, useState } from 'react';
// import io from 'socket.io-client';
// import immer from 'immer';
import Navbar from '../Navbar/Navbar';
import './App.scss';
import Presentation from '../Presentation/Presentation';
import Advantage from '../Advantage/Advantage';
// import chatForm from '../chatUserNameForm/chatUserNameForm';

// const initialMessagesState = {
//   general: [],
//   random: [],
//   jokes: [],
//   javascript: [],
// };

function App() {
  //   const [usernames, setUsernames] = useState('');
  //   const [connected, setConnected] = useState(false);
  //   const [currentChat, setCurrentChat] = useState({
  //     isChannel: true,
  //     chatName: 'general',
  //     receiverId: '',
  //   });
  //   const [connectedRoom, setConnectedRoom] = useState(['general']);
  //   const [allUsers, setAllUsers] = useState([]);
  //   const [messages, setMessages] = useState(initialMessagesState);
  //   const [message, setMessage] = useState('');
  //   const socketRef = useRef();

  //   useEffect(() => {
  //     setMessage('');
  //   }, [messages]);

  //   function handleMessageChange(event) {
  //     setMessage(event.target.value);
  //   }

  //   function sendMessage(event) {
  //     const payload = {
  //       content: message,
  //       to: currentChat.isChannel ? currentChat.chatName : currentChat.receiverId,
  //       sender: usernames,
  //       chatName: currentChat.chatName,
  //       isChannel: currentChat.isChannel,
  //     };
  //     socketRef.current.emit('send message', payload);
  //     const newMessage = immer(messages, (draft) => {
  //       draft[currentChat.chatName].push({
  //         sender: usernames,
  //         content: messages,
  //       });
  //     });
  //     setMessages(newMessage);
  //   }

  //   function joinRoom(room) {
  //     const newConnectedRoom = immer(connectedRoom, (draft) => {
  //       draft.push(room);
  //     });

  //     socketRef.current.emit('join room', room, (messages) =>
  //       roomJoinCallback(messages, room)
  //     );
  //     setConnectedRoom(newConnectedRoom);
  //   }

  //   function roomJoinCallback(incomingMessages, room) {
  //     const newMessages = immer(messages, (draft) => {
  //       draft[room] = incomingMessages;
  //     });
  //     setMessages(newMessages);
  //   }

  //   function toggleChat(currentChat) {
  //     if (!messages[currentChat.chatName]) {
  //       const newMessages = immer(messages, (draft) => {
  //         draft[currentChat.chatName] = [];
  //       });
  //       setMessages(newMessages);
  //     }
  //     setCurrentChat(currentChat);
  //   }

  //   function handleChange(event) {
  //     setUsernames(event.target.value);
  //   }

  //   function connect(event) {
  //     setConnected(true);
  //     socketRef.current = io.connect('/');
  //     socketRef.current.emit('join server', usernames);
  //     socketRef.current.emit('join room', 'general', (messages) =>
  //       roomJoinCallback(messages, 'general')
  //     );
  //     socketRef.current.on('new user', (users) => {
  //       setAllUsers(allUsers);
  //     });
  //     socketRef.current.on('new message', ({ content, sender, chatName }) => {
  //       setMessages((messages) => {
  //         const newMessages = immer(messages, (draft) => {
  //           if (draft[chatName]) {
  //             draft[chatName].push({ content, sender });
  //           } else {
  //             draft[chatName] = [{ content, sender }];
  //           }
  //           return newMessages;
  //         });
  //       });
  //     });
  //   }
  //   let body;
  //   if (connected) {
  //     body = (
  //       <Chat
  //         message={message}
  //         handleMessageChange={handleMessageChange}
  //         sendMessage={sendMessage}
  //         yourId={socketRef.current ? socketRef.current.id : ''}
  //         allUsers={allUsers}
  //         joinRoom={joinRoom}
  //         connectedRoom={connectedRoom}
  //         currentChat={currentChat}
  //         toggleChat={toggleChat}
  //         messages={messages[currentChat.chatName]}
  //       />
  //     );
  //   } else {
  //     <Form username={username} onChange={handleChange} connect={connect} />;
  //   }
  return (
    <div style={{ backgroundColor: '#004643' }}>
      <Navbar />
      <Presentation />
      <Advantage />
      {/* {body} */}
    </div>
  );
}

export default App;
