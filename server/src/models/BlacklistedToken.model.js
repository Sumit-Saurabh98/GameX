import mongoose from 'mongoose';

const BlacklistedTokenSchema = new mongoose.Schema({
  token: { type: String, required: true, unique: true },
  expiresAt: { type: Date, required: true },
});

const BlacklistedToken = mongoose.model('BlacklistedToken', BlacklistedTokenSchema);

export default BlacklistedToken;