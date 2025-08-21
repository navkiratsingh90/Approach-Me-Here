const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  totalAds: { type: Number, default: 0 },
  totalUsers: { type: Number, default: 0 },
  totalSoldOuts: { type: Number, default: 0 },
  totalCarsPosted: { type: Number, default: 0 },
  totalBikesPosted: { type: Number, default: 0 },
  totalElectronicsPosted: { type: Number, default: 0 },
  totalMobilesPosted: { type: Number, default: 0 },
  totalFurnituresPosted: { type: Number, default: 0 },
  totalOthersPosted: { type: Number, default: 0 },
}, { timestamps: true });


module.exports = mongoose.model('Sale', saleSchema);