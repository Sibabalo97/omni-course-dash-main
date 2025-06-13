import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DashboardLayout from '../components/DashboardLayout';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { MessageCircle, Search, Send, Phone, Video, MoreVertical } from 'lucide-react';

/**
 * Represents a conversation in the messaging app
 * @typedef {Object} Conversation
 * @property {number} id - Unique identifier for the conversation
 * @property {string} name - Name of the contact
 * @property {string} role - Role or description of the contact
 * @property {string} avatar - Avatar representation
 * @property {boolean} online - Online status
 * @property {string} lastMessage - Last message in the conversation
 * @property {string} time - Time of last activity
 * @property {number} unread - Number of unread messages
 */

/**
 * Represents a message in a conversation
 * @typedef {Object} Message
 * @property {number} id - Unique identifier for the message
 * @property {string} content - Text content of the message
 * @property {string} time - Time when message was sent
 * @property {boolean} isOwn - Whether the message is from the current user
 * @property {number} conversationId - ID of the conversation this message belongs to
 */

const Messages = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch conversations and initial messages
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch conversations
        const convResponse = await axios.get('https://retoolapi.dev/uStaHs/data');
        setConversations(convResponse.data);
        
        // Fetch messages for the first conversation by default
        if (convResponse.data.length > 0) {
          const firstConversationId = convResponse.data[0].id;
          setSelectedConversation(firstConversationId);
          const msgResponse = await axios.get(`https://retoolapi.dev/o7Ui5F/data?conversationId=${firstConversationId}`);
          setMessages(msgResponse.data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Fetch messages when conversation changes
  useEffect(() => {
    if (selectedConversation) {
      const fetchMessages = async () => {
        try {
          const response = await axios.get(`https://retoolapi.dev/o7Ui5F/data?conversationId=${selectedConversation}`);
          setMessages(response.data);
        } catch (err) {
          setError(err.message);
        }
      };
      
      fetchMessages();
    }
  }, [selectedConversation]);

  /**
   * Handles sending a new message
   */
  const handleSendMessage = async () => {
    if (newMessage.trim() && selectedConversation) {
      try {
        // Create new message object
        const newMsg = {
          content: newMessage,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isOwn: true,
          conversationId: selectedConversation
        };
        
        // Optimistically update UI
        setMessages([...messages, newMsg]);
        setNewMessage('');
        
        // Post to API
        await axios.post('https://retoolapi.dev/o7Ui5F/data', newMsg);
        
        // Refresh messages to get the actual ID from server
        const response = await axios.get(`https://retoolapi.dev/o7Ui5F/data?conversationId=${selectedConversation}`);
        setMessages(response.data);
      } catch (err) {
        setError('Failed to send message');
        // Rollback optimistic update
        setMessages(messages.filter(msg => msg.id !== undefined)); // Remove the temporary message
      }
    }
  };

  const selectedContact = conversations.find(c => c.id === selectedConversation);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
          <p>Loading messages...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
          <p className="text-red-500">Error: {error}</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-8rem)]">
        <Card className="h-full flex overflow-hidden">
          {/* Conversations List */}
          <div className="w-1/3 border-r border-border flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-border">
              <h2 className="text-xl font-semibold text-foreground mb-4">Messages</h2>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search conversations..."
                  className="pl-10"
                />
              </div>
            </div>

            {/* Conversations */}
            <div className="flex-1 overflow-y-auto">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation.id)}
                  className={`p-4 border-b border-border cursor-pointer hover:bg-accent transition-colors ${
                    selectedConversation === conversation.id ? 'bg-accent' : ''
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="relative">
                      <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center text-2xl">
                        {conversation.avatar}
                      </div>
                      {conversation.online && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-foreground truncate">{conversation.name}</h3>
                        <span className="text-xs text-muted-foreground">{conversation.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{conversation.role}</p>
                      <p className="text-sm text-muted-foreground truncate mt-1">{conversation.lastMessage}</p>
                    </div>
                    {conversation.unread > 0 && (
                      <Badge variant="destructive" className="text-xs">
                        {conversation.unread}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {selectedContact ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-border flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center text-xl">
                        {selectedContact.avatar}
                      </div>
                      {selectedContact.online && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">{selectedContact.name}</h3>
                      <p className="text-sm text-muted-foreground">{selectedContact.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon">
                      <Phone className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Video className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id || Math.random()} 
                      className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.isOwn
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-foreground'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p className={`text-xs mt-1 ${
                          message.isOwn ? 'text-primary-foreground/70' : 'text-muted-foreground'
                        }`}>
                          {message.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-border">
                  <div className="flex items-center space-x-2">
                    <Input
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button onClick={handleSendMessage} size="icon">
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">Select a conversation</h3>
                  <p className="text-muted-foreground">Choose a conversation to start messaging</p>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Messages;