// Utilitaire pour la gestion centralisée des erreurs
export const handleError = (error: unknown, context?: string) => {
  if (error instanceof Error) {
    console.error(`Erreur ${context ? `dans ${context}` : ''}: `, error.message);
    // Ici vous pourriez ajouter une intégration avec un service de monitoring
  }
  return error instanceof Error ? error.message : 'Une erreur est survenue';
};

export const isAxiosError = (error: unknown): boolean => {
  return error?.constructor?.name === 'AxiosError';
};