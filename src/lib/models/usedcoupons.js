import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const usedCouponsSchema = new Schema({
    coupon: {
      type: Schema.Types.ObjectId,
        ref: "Coupon",
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    order: {
        type: Schema.Types.ObjectId,
        ref: "Order",
    },
    usedAt: {
        type: Date,
        default: Date.now,
    },
});

const UsedCoupons = mongoose.models.UsedCoupons || mongoose.model("UsedCoupons", usedCouponsSchema);

export default UsedCoupons;

