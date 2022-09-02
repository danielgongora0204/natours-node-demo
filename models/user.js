import mongoose from 'mongoose';
import validator from 'validator';
import { hash, auth } from '../utils/crypt';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'User must have a name']
    },
    surname: {
      type: String,
      required: [true, 'User must have a surname']
    },
    email: {
      type: String,
      required: [true, 'User must have an email'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'User must have a valid email']
    },
    photo: String,
    password: {
      type: String,
      required: [true, 'User must contain a password'],
      minlength: [8, 'User must have a password of 8 or more characters'],
      select: false
    },
    passwordConfirm: {
      type: String,
      required: [true, 'User must contain a password'],
      //TODO: Only works on CREATE or SAVE
      validate: {
        validator: function (value) {
          return value === this.password;
        },
        message: 'User password and confirmation password must be the same'
      }
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    passwordChangedAt: Date,
    updatedDate: Date,
    deletedDate: Date
  },
  //Schema Options
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  },
  //Schema Options
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// DOCUMENT MIDDLEWARE
//Does not run on .SaveMany
userSchema.pre('validate', function (next) {
  this.updatedDate = new Date();
  next();
});

//Does not run on .SaveMany
userSchema.pre('validate', function (next) {
  this.updatedDate = new Date();
  next();
});

userSchema.pre('save', function (next) {
  //Only runs this function in case password is actually modified
  if (!this.isModified('password')) return next();
  hash(this.password).then((result) => {
    this.password = result;
    this.passwordConfirm = undefined;
    next();
  });
});

userSchema.methods.passwordAuthentication = (password, hashPassword) =>
  auth(password, hashPassword);

userSchema.methods.changedPasswordAfter = function (jwtTimestamp) {
  if (this.passwordChangedAt)
    return jwtTimestamp < parseInt(this.passwordChangedAt.getTime() / 1000, 10);
  return false;
};

export default mongoose.modelNames().includes('User')
  ? mongoose.model('User')
  : mongoose.model('User', userSchema);
