import mongoose from 'mongoose';

const NeighborSchema = new mongoose.Schema({
    name: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    address: String,
});

export default mongoose.models.Neighbor ||
mongoose.model('Neighbor', NeighborSchema);
