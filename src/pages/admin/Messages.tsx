import React, { useState, useEffect } from 'react';
import AdminHeader from '../../components/admin/AdminHeader';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { Message } from '../../types/Message';
import { 
  MessageCircle, User, Clock, Star, Send, 
  Trash2, Search, Filter, Mail 
} from 'lucide-react';
import { useNotification } from '../../context/NotificationContext';

const Messages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const { addNotification } = useNotification();

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch('/api/admin/messages');
      if (!response.ok) throw new Error('Erreur lors du chargement des messages');
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      addNotification('error', 'Erreur lors du chargement des messages');
    } finally {
      setLoading(false);
    }
  };

  const handleReply = async () => {
    if (!selectedMessage || !replyContent.trim()) return;

    try {
      const response = await fetch(`/api/admin/messages/${selectedMessage.id}/reply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: replyContent }),
      });

      if (!response.ok) throw new Error('Erreur lors de l\'envoi de la réponse');

      const updatedMessage = await response.json();
      setMessages(messages.map(msg => 
        msg.id === updatedMessage.id ? updatedMessage : msg
      ));
      setReplyContent('');
      addNotification('success', 'Réponse envoyée avec succès');
    } catch (error) {
      addNotification('error', 'Erreur lors de l\'envoi de la réponse');
    }
  };

  const handleDelete = async (messageId: string) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce message ?')) return;

    try {
      await fetch(`/api/admin/messages/${messageId}`, { method: 'DELETE' });
      setMessages(messages.filter(msg => msg.id !== messageId));
      if (selectedMessage?.id === messageId) setSelectedMessage(null);
      addNotification('success', 'Message supprimé avec succès');
    } catch (error) {
      addNotification('error', 'Erreur lors de la suppression du message');
    }
  };

  const filteredMessages = messages
    .filter(message => {
      const matchesSearch = message.subject.toLowerCase().includes(search.toLowerCase()) ||
                          message.content.toLowerCase().includes(search.toLowerCase()) ||
                          message.userName.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = filter === 'all' || 
                          (filter === 'unread' && !message.read) ||
                          (filter === 'read' && message.read);
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader />
      
      <div className="flex">
        <AdminSidebar />
        
        <main className="flex-1 p-8 ml-64">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold">Messages</h1>
              <p className="text-gray-600">Gérez les messages des utilisateurs</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Liste des messages */}
            <div className="lg:col-span-1 bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4 border-b">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Rechercher..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border rounded-lg"
                    />
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value as 'all' | 'unread' | 'read')}
                    className="border rounded-lg px-3 py-2"
                  >
                    <option value="all">Tous</option>
                    <option value="unread">Non lus</option>
                    <option value="read">Lus</option>
                  </select>
                </div>
              </div>
              
              <div className="divide-y max-h-[600px] overflow-y-auto">
                {filteredMessages.map((message) => (
                  <div
                    key={message.id}
                    onClick={() => setSelectedMessage(message)}
                    className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedMessage?.id === message.id ? 'bg-gray-50' : ''
                    } ${!message.read ? 'font-semibold' : ''}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gold-100 rounded-full flex items-center justify-center">
                          <User className="h-4 w-4 text-gold-600" />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium">{message.userName}</p>
                          <p className="text-xs text-gray-500">{message.userEmail}</p>
                        </div>
                      </div>
                      {!message.read && (
                        <div className="h-2 w-2 bg-gold-500 rounded-full"></div>
                      )}
                    </div>
                    <h3 className="text-sm mb-1">{message.subject}</h3>
                    <p className="text-xs text-gray-500 truncate">{message.content}</p>
                    <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
                      <Clock className="h-3 w-3" />
                      {new Date(message.createdAt).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Détail du message */}
            <div className="lg:col-span-2">
              {selectedMessage ? (
                <div className="bg-white rounded-lg shadow-md h-full flex flex-col">
                  <div className="p-6 border-b">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h2 className="text-xl font-bold mb-2">{selectedMessage.subject}</h2>
                        <div className="flex items-center text-gray-600">
                          <Mail className="h-4 w-4 mr-2" />
                          <span>{selectedMessage.userEmail}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDelete(selectedMessage.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                    <div className="prose max-w-none">
                      {selectedMessage.content}
                    </div>
                  </div>

                  {selectedMessage.replies && selectedMessage.replies.length > 0 && (
                    <div className="p-6 border-t bg-gray-50">
                      <h3 className="font-medium mb-4">Historique des réponses</h3>
                      <div className="space-y-4">
                        {selectedMessage.replies.map((reply) => (
                          <div
                            key={reply.id}
                            className={`p-4 rounded-lg ${
                              reply.isAdmin ? 'bg-gold-50 ml-8' : 'bg-white'
                            }`}
                          >
                            <div className="flex items-center mb-2">
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                reply.isAdmin ? 'bg-gold-200' : 'bg-gray-200'
                              }`}>
                                {reply.isAdmin ? 'A' : 'U'}
                              </div>
                              <span className="ml-2 text-sm text-gray-600">
                                {new Date(reply.createdAt).toLocaleString()}
                              </span>
                            </div>
                            <p className="text-sm">{reply.content}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="p-6 border-t mt-auto">
                    <div className="flex gap-4">
                      <textarea
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        placeholder="Écrivez votre réponse..."
                        className="flex-1 p-3 border rounded-lg resize-none focus:ring-2 focus:ring-gold-500"
                        rows={3}
                      />
                      <button
                        onClick={handleReply}
                        disabled={!replyContent.trim()}
                        className="bg-gold-500 text-white px-4 py-2 rounded-lg hover:bg-gold-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed h-fit"
                      >
                        <Send className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-md h-full flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <MessageCircle className="h-12 w-12 mx-auto mb-4" />
                    <p>Sélectionnez un message pour le consulter</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Messages;