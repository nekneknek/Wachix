class LoggingService {
  private static instance: LoggingService;

  private constructor() {}

  static getInstance(): LoggingService {
    if (!LoggingService.instance) {
      LoggingService.instance = new LoggingService();
    }
    return LoggingService.instance;
  }

  logError(error: Error, context?: any): void {
    console.error({
      timestamp: new Date().toISOString(),
      error: {
        name: error.name,
        message: error.message,
        stack: error.stack
      },
      context
    });
    // Here you would typically send this to your logging service
  }

  logInfo(message: string, data?: any): void {
    console.info({
      timestamp: new Date().toISOString(),
      message,
      data
    });
  }

  logWarning(message: string, data?: any): void {
    console.warn({
      timestamp: new Date().toISOString(),
      message,
      data
    });
  }

  logSecurity(event: string, userId?: string, details?: any): void {
    console.info({
      timestamp: new Date().toISOString(),
      type: 'SECURITY',
      event,
      userId,
      details
    });
  }
}

export const loggingService = LoggingService.getInstance();