import cron from 'node-cron';
import BlacklistedToken from '../../models/BlacklistedToken.model';

export const setupBlacklistCleanup = () => {
  cron.schedule('0 0 * * *', async () => { // Runs daily at midnight
    const now = new Date();
    await BlacklistedToken.deleteMany({ expiresAt: { $lt: now } });
    console.log('Cleaned up expired blacklisted tokens');
  });
};