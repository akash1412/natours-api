const mongoose = require('mongoose');
const slugify = require('slugify');

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A tour must have a name'],
        unique: true,
        trim: true
    },
    slug: String,
    duration: {
        type: String,
        required: [true, 'A tour must have a duration']
    },
    maxGroupSize: {
        type: String,
        required: [true, 'A tour must have a group size']
    },
    difficulty: {
        type: String,
        required: [true, 'A tour must have a difficulty']
    },
    ratingsAverage: {
        type: Number,
        default: 4.5
    },
    ratingsQuantity: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: [true, 'A tour must have a price']
    },
    priceDiscount: Number,
    summary: {
        type: String,
        trim: true,
        required: [true, 'A tour must have a description']
    },
    description: {
        type: String,
        trim: true
    },
    imageCover: {
        type: String,
        required: [true, 'A tour must have a cover image']
    },
    images: [String],
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    },
    startDates: [Date],
    secretTour: {
        type: Boolean,
        default: false
    }

});

// tourSchema.virtual('durationWeeks').get(function () {
//     return this.duration / 7;
// })

//DOCUMENT MIDDLEARE : runs before .save() or .create()
tourSchema.pre('save', function (next) {
    this.slug = slugify(this.name);
    next();
})

// tourSchema.post('save', function (doc, next) {
//     console.log(doc);
//     next();
// })

// QUERY MIDDLEWARE
tourSchema.pre('find', function (next) {
    this.find({
        secretTour: {
            $ne: true
        }
    })
    next();
})


const Tour = new mongoose.model('Tour', tourSchema);

module.exports = Tour;