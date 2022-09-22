import mongoose from 'mongoose';
import slugify from 'slugify';
// import validator from 'validator';

const tourSchema = new mongoose.Schema(
  //Schema Definition
  {
    name: {
      type: String,
      required: [true, 'Tour must have a name'],
      unique: true,
      maxlength: [40, 'Tour must have less or equal then 40 characters'],
      minlength: [10, 'Tour must have more or equal then 10 characters']
      //Example of using the validator
      /*validate: [
        validator.isAlpha,
        'All characters of the tour name must be letters'
      ]*/
    },
    ratingsAverage: {
      type: Number,
      default: 1.0,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0']
    },
    ratingsQuantity: {
      type: Number,
      default: 0
    },
    price: {
      type: Number,
      required: [true, 'Tour must have a price']
    },
    priceDiscount: {
      type: Number,
      //This must return boolean
      validate: {
        validator: function (val) {
          //This only works when creating new documents, doesnt work on update.
          return val < this.price;
        },
        message: 'Discount price {VALUE} must be below regular price'
      }
    },
    difficulty: {
      type: String,
      required: [true, 'Tour must have a difficulty'],
      enum: {
        values: ['easy', 'medium', 'hard'],
        message: 'Difficulty must be one of three options: Easy, Medium, Hard'
      }
    },
    duration: {
      type: Number,
      required: [true, 'Tour must have a duration']
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'Tour must have a group size']
    },
    summary: {
      type: String,
      trim: true,
      required: [true, 'Tour must have a description']
    },
    description: {
      type: String,
      trim: true
    },
    imageCover: {
      type: String,
      required: [true, 'Tour must have an image cover']
    },
    images: [String],
    startDates: [Date],
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedDate: Date,
    deletedDate: Date,
    slug: String,
    secret: {
      type: Boolean,
      default: false,
      select: false
    }
  },
  //Schema Options
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

tourSchema.pre('findOneAndUpdate', function (next) {
  this._update.updatedDate = Date.now();
  next();
});

// DOCUMENT MIDDLEWARE
//Does not run on .SaveMany
tourSchema.pre('validate', function (next) {
  this.updatedDate = Date.now();
  next();
});

tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

//QUERY MIDDLEWARE
/*To be able to run this command on any find command it is recommended to run this as a regular expression*/
tourSchema.pre(/^find/, function (next) {
  this.find({ secret: { $ne: true }, deletedDate: { $eq: undefined } });
  next();
});

/*
tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});*/

//AGGREGATION MIDDLEWARE
tourSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  next();
});

export default mongoose.modelNames().includes('Tour')
  ? mongoose.model('Tour')
  : mongoose.model('Tour', tourSchema);
