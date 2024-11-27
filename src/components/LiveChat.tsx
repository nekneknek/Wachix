import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, X, User, Bot } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

// Types pour les messages et les réponses automatiques
type Message = {
  id: number;
  text: string;
  isUser: boolean;
  isAgent?: boolean;
  timestamp: Date;
  userName?: string;
};

// Structure pour les réponses automatiques
type AutoResponse = {
  keywords: string[];
  response: string;
  category: 'produit' | 'livraison' | 'paiement' | 'compte' | 'general';
  followUp?: string[];
};

// Base de données des réponses automatiques enrichie
const autoResponses: AutoResponse[] = [
  {
    keywords: ['bonjour', 'salut', 'hello'],
    response: "Bonjour ! Je suis ravi(e) de vous accueillir sur Wachix. Comment puis-je vous aider aujourd'hui ?",
    category: 'general',
    followUp: [
      "Souhaitez-vous découvrir nos parfums ?",
      "Voulez-vous en savoir plus sur nos tissus wax ?",
      "Avez-vous des questions sur nos services ?"
    ]
  },
  {
    keywords: ['prix', 'coût', 'tarif', 'combien'],
    response: "Nos parfums sont disponibles à partir de 95€, et nos tissus wax à partir de 75€. Nous proposons régulièrement des offres spéciales à nos clients fidèles.",
    category: 'produit',
    followUp: [
      "Souhaitez-vous voir notre catalogue complet ?",
      "Voulez-vous connaître nos promotions en cours ?",
      "Puis-je vous aider à trouver un produit spécifique ?"
    ]
  },
  {
    keywords: ['livraison', 'délai', 'expédition'],
    response: "La livraison est gratuite dès 100€ d'achat. Nous livrons en 2-3 jours ouvrés en France métropolitaine, et 5-7 jours pour l'Europe.",
    category: 'livraison',
    followUp: [
      "Souhaitez-vous suivre une commande en cours ?",
      "Voulez-vous connaître nos options de livraison express ?",
      "Avez-vous des questions sur nos zones de livraison ?"
    ]
  },
  {
    keywords: ['compte', 'inscription', 'connexion'],
    response: "Créer un compte vous permet de suivre vos commandes, accéder à des offres exclusives et gagner des points fidélité.",
    category: 'compte',
    followUp: [
      "Souhaitez-vous créer un compte maintenant ?",
      "Voulez-vous en savoir plus sur notre programme de fidélité ?",
      "Avez-vous besoin d'aide pour vous connecter ?"
    ]
  },
  {
    keywords: ['parfum', 'fragrance', 'senteur'],
    response: "Nos parfums sont créés par des maîtres parfumeurs africains, utilisant des ingrédients naturels et des techniques traditionnelles.",
    category: 'produit',
    followUp: [
      "Quel type de parfum recherchez-vous ?",
      "Souhaitez-vous découvrir nos best-sellers ?",
      "Voulez-vous des conseils personnalisés ?"
    ]
  },
  {
    keywords: ['tissu', 'wax', 'motif'],
    response: "Nos tissus wax sont authentiques et fabriqués selon des méthodes traditionnelles. Chaque motif raconte une histoire unique.",
    category: 'produit',
    followUp: [
      "Quel style de motif vous intéresse ?",
      "Souhaitez-vous voir nos dernières collections ?",
      "Avez-vous besoin de conseils pour l'entretien ?"
    ]
  },
  {
    keywords: ['paiement', 'carte', 'paypal'],
    response: "Nous acceptons les cartes bancaires, PayPal et les virements. Tous nos paiements sont sécurisés à 100%.",
    category: 'paiement',
    followUp: [
      "Souhaitez-vous plus d'informations sur nos moyens de paiement ?",
      "Avez-vous des questions sur la sécurité des transactions ?",
      "Voulez-vous connaître nos facilités de paiement ?"
    ]
  }
];

const LiveChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Bonjour! Comment puis-je vous aider aujourd'hui?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const findBestResponse = (userMessage: string): AutoResponse | undefined => {
    const messageLower = userMessage.toLowerCase();
    return autoResponses.find(response => 
      response.keywords.some(keyword => messageLower.includes(keyword))
    );
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date(),
      userName: user?.name
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulation de la réponse du bot
    setTimeout(() => {
      const bestResponse = findBestResponse(userMessage.text);
      
      const botResponse: Message = {
        id: Date.now() + 1,
        text: bestResponse?.response || "Je ne suis pas sûr de comprendre. Souhaitez-vous parler à un conseiller ?",
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setSuggestions(bestResponse?.followUp || []);
      setIsTyping(false);
    }, 1000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
    handleSendMessage();
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gold-500 text-white p-4 rounded-full shadow-lg hover:bg-gold-600 transition-colors"
          aria-label="Ouvrir le chat"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      ) : (
        <div className="bg-white rounded-lg shadow-xl w-96">
          <div className="bg-gold-500 text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold">Chat en Direct</h3>
            <button 
              onClick={() => setIsOpen(false)}
              aria-label="Fermer le chat"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="h-96 p-4 overflow-y-auto">
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      msg.isUser
                        ? 'bg-gold-500 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    {msg.userName && (
                      <span className="text-xs font-semibold block mb-1">
                        {msg.userName}
                      </span>
                    )}
                    <p className="text-sm">{msg.text}</p>
                    <span className="text-xs opacity-75 mt-1 block">
                      {msg.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex items-center space-x-2 text-gray-500">
                  <Bot className="h-4 w-4" />
                  <span className="text-sm">En train d'écrire...</span>
                </div>
              )}
              {suggestions.length > 0 && !isTyping && (
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Écrivez votre message..."
                className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:border-gold-500"
              />
              <button
                onClick={handleSendMessage}
                className="bg-gold-500 text-white p-2 rounded-lg hover:bg-gold-600 transition-colors"
                aria-label="Envoyer le message"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveChat;