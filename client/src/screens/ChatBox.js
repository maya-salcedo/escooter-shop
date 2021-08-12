import React, { useEffect, useRef, useState } from 'react';
import socketIOClient from 'socket.io-client';
import styled from 'styled-components';

const ChatboxWrapper = styled.div`
  color: #000000;
  position: fixed;
  right: 1rem;
  bottom: 1rem;
  z-index: 1500;
  > div {
    border: 0.1rem #c0c0c0 solid;
    background-color: #f8f8f8;
    border-radius: 0.5rem;
    margin: 1rem;
    padding: 1rem;
  }
  & .row {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
  }
  & ul {
    overflow: scroll;
    max-height: 20rem;
  }
  & li {
    margin-bottom: 1rem;
  }
  & input {
    width: calc(100% - 9rem);
  }
`;

const ENDPOINT =
  window.location.host.indexOf('localhost') >= 0
    ? 'http://127.0.0.1:5000'
    : window.location.host;

const ChatBox = (props) => {
  const { userInfo } = props;
  const [socket, setSocket] = useState(null);
  const uiMessagesRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [messageBody, setMessageBody] = useState('');
  const [messages, setMessages] = useState([
    {
      name: 'Admin',
      body: 'Hello there, please ask your question.',
    },
  ]);

  useEffect(() => {
    if (uiMessagesRef.current) {
      uiMessagesRef.current.scrollBy({
        top: uiMessagesRef.current.clientHeight,
        left: 0,
        behavior: 'smooth',
      });
    }
    if (socket) {
      socket.emit('onLogin', {
        _id: userInfo._id,
        name: userInfo.name,
        isAdmin: userInfo.isAdmin,
      });
      socket.on('message', (data) => {
        setMessages([
          ...messages,
          {
            body: data.body,
            name: data.name,
          },
        ]);
      });
    }
  }, [messages, isOpen, socket, userInfo._id, userInfo.name, userInfo.isAdmin]);

  const supportHandler = () => {
    setIsOpen(true);
    const sk = socketIOClient(ENDPOINT);
    setSocket(sk);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!messageBody.trim()) {
      alert('Error. Please type message.');
    } else {
      setMessages([
        ...messages,
        {
          body: messageBody,
          name: userInfo.name,
        },
      ]);
      setMessageBody('');
      setTimeout(() => {
        socket.emit('onMessage', {
          body: messageBody,
          name: userInfo.name,
          isAdmin: userInfo.isAdmin,
          _id: userInfo._id,
        });
      }, 1000);
    }
  };

  const closeHandler = () => {
    setIsOpen(false);
  };

  return (
    <ChatboxWrapper>
      {!isOpen ? (
        <button type="button" onClick={supportHandler}>
          <i className="fa fa-support" />
        </button>
      ) : (
        <div>
          <div className="row">
            <strong> Support </strong>
            <button type=" button" onClick={closeHandler}>
              <i className="fa fa-close" />
            </button>
          </div>
          <ul ref={uiMessagesRef}>
            {messages.map((msg, index) => (
              <li key={index}>
                <strong> {`${msg.name}: `} </strong> {msg.body}
              </li>
            ))}
          </ul>
          <div>
            <form onSubmit={submitHandler} className="row">
              <input
                value={messageBody}
                onChange={(e) => setMessageBody(e.target.value)}
                type="text"
                placeholder="type message"
              />
              <button type="submit"> Send </button>
            </form>
          </div>
        </div>
      )}
    </ChatboxWrapper>
  );
};

export default ChatBox;
