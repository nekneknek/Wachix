import api from '../api';

class MailchimpService {
  private static instance: MailchimpService;

  static getInstance(): MailchimpService {
    if (!MailchimpService.instance) {
      MailchimpService.instance = new MailchimpService();
    }
    return MailchimpService.instance;
  }

  async subscribe(email: string, firstName?: string, lastName?: string): Promise<void> {
    await api.post('/newsletter/subscribe', { email, firstName, lastName });
  }

  async unsubscribe(email: string): Promise<void> {
    await api.post('/newsletter/unsubscribe', { email });
  }
}

export const mailchimpService = MailchimpService.getInstance();