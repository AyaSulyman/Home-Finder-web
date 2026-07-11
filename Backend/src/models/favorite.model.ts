import mongoose, { Document, Schema, Types } from "mongoose";

export interface IFavorite extends Document {
    buyerId: Types.ObjectId;
    propertyId: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const favoriteSchema = new Schema<IFavorite>({
    buyerId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    propertyId: { type: Schema.Types.ObjectId, ref: "Property", required: true }
}, { timestamps: true });

favoriteSchema.index({ buyerId: 1, propertyId: 1 }, { unique: true });

const Favorite = mongoose.model<IFavorite>("Favorite", favoriteSchema);
export default Favorite;
