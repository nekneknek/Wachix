import { AxiosError } from 'axios';
import { loggingService } from '../../services/security/LoggingService';

export const handleApiError = (error: unknown) => {
  if (error instanceof AxiosError) {
    const message = error.response?.data?.message || error.message;
    loggingService.logError(error, { context: 'API Error' });
    return message;
  }
  
  if (error instanceof Error) {
    loggingService.logError(error);
    return error.message;
  }
  
  return 'Une erreur inattendue est survenue';
};