import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    price: {
        type: Number,
        required: true
    },
    image: String,
    category: String,
    quantity: {
        type: Number,
        default: 0
    },
    comments: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        comment: String
    }],
    ratings: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        rating: {
            type: Number,
            min: 1,
            max: 5
        }
    }],
    averageRating: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

productSchema.pre('remove', { document: true }, async function(next) {
    try {
        await mongoose.model('Review').deleteMany({ product: this._id });
        next();
    } catch (error) {
        next(error);
    }
});


const Product = model('Product', productSchema);

export default Product;
