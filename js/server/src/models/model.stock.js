import mongoose from "mongoose";

const StockSchema = new mongoose.Schema({
    _id: {
        type: mongoose.SchemaTypes.ObjectId,
        auto: true
    },
    item_code: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Item',
        required: true
    },
    lot: {
        type: Number,
        min: 1,
        required: true
    },
    amount: {
        type: Number,
        min: 1,
        max: 9999,
        required: true,
        // validate: {
        //     validator: (v) => v % 1 === 0,
        //     message: (props) => `${props.value} value must be integer`
        // }
    },
    note: { 
        type: String,
        // lowercase: true,
        // minLength: 1000,

    },
    import_datetime: {
        type: Date,
        immutable: true,
        default: () => Date.now()
    },
    exp_datetime: {
        type: Date,
        required: true
    }
})


StockSchema.methods.created = function () {
    return `น้ำยาสต็อก ${this.item_code} ถูกสร้างขึ้นแล้ว!`
}

const Stock = mongoose.model('Stock', StockSchema, 'stock')
export default Stock;