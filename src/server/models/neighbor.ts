import mongoose from 'mongoose';

const NeighborSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true }
});

export default mongoose.models.Neighbor ||
mongoose.model('Neighbor', NeighborSchema);
