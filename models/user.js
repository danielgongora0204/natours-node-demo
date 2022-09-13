import mongoose from 'mongoose';
import validator from 'validator';
import { bcryptHash, auth, randomToken, cryptoHash } from '../utils/crypt';
import { cryptoTokenExpiration } from '../constants/security';

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
    role: {
      type: String,
      enum: ['public', 'guide', 'lead', 'admin'],
      default: 'public'
    },
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
    passwordResetToken: String,
    createdAt: {
      type: Date,
      default: Date.now
    },
    passwordChangedAt: Date,
    passwordResetTokenExpiration: Date,
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
  this.updatedDate = Date.now();
  if (this.isModified('password')) {
    this.passwordChangedAt = this.updatedDate;
  }
  next();
});

userSchema.pre('save', function (next) {
  //Only runs this function in case password is actually modified
  if (!this.isModified('password')) return next();
  bcryptHash(this.password).then((result) => {
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

userSchema.methods.createPasswordResetToken = async function () {
  return await randomToken().then((token) =>
    cryptoHash(token)
      .then((hash) => {
        this.passwordResetToken = hash;
        this.passwordResetTokenExpiration = Date.now() + cryptoTokenExpiration;
      })
      .then(() => token)
  );
};

export default mongoose.modelNames().includes('User')
  ? mongoose.model('User')
  : mongoose.model('User', userSchema);
