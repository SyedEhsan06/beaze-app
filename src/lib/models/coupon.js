import mongoose from "mongoose";
const Schema = mongoose.Schema;

const couponSchema = new Schema({
    code: {
        type: String,
        unique: true,
    },
    discount: {
        type: Number,
    },
    minOrder: {
        type: Number,
    },
    maxDiscount: {
        type: Number,
    },
    validFrom: {
        type: Date,
    },
    validTill: {
        type: Date,
    },
    active: {
        type: Boolean,
        default: true,
    },
});

const Coupon = mongoose.models.Coupon || mongoose.model("Coupon", couponSchema);
export default Coupon;