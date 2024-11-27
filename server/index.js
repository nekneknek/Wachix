// Ajouter au début du fichier, après les imports
import bcrypt from 'bcryptjs';

// Ajouter après la connexion à MongoDB
// Création du compte admin par défaut
const createDefaultAdmin = async () => {
  try {
    const User = mongoose.model('User');
    const adminExists = await User.findOne({ email: 'nek@admin.com' });
    
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('nek76200', 10);
      const admin = new User({
        name: 'Nek',
        email: 'nek@admin.com',
        password: hashedPassword,
        role: 'admin',
        createdAt: new Date(),
        lastLogin: new Date()
      });
      
      await admin.save();
      console.log('Compte administrateur par défaut créé');
    }
  } catch (error) {
    console.error('Erreur lors de la création du compte admin:', error);
  }
};

// Appeler la fonction après la connexion à MongoDB réussie
mongoose.connection.once('open', () => {
  console.log('Connecté à MongoDB');
  createDefaultAdmin();
});