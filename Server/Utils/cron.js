const cron = require('node-cron');
const { updateSalesMetrics } = require('../services/salesService');

// Schedule daily at 2 AM
const startSalesCronJob = () => {
  cron.schedule('0 2 * * *', async () => {
    try {
      console.log('Running sales metrics update:', new Date());
      await updateSalesMetrics();
      console.log('Sales metrics update completed');
    } catch (error) {
      console.error('Cron job failed:', error.message);
    }
  });
};

module.exports = startSalesCronJob;