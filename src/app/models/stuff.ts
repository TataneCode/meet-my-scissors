import mongoose from 'mongoose';

const StuffSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    neighbor: { type: mongoose.Schema.Types.ObjectId, ref: 'Neighbor', required: true }
});

export default mongoose.models.Stuff ||
mongoose.model('Stuff', StuffSchema);
