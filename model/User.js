const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const UserSchema = new Schema({
  acctInfo: {
    firstName: {
      type: String
    },
    lastName: {
      type: String
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String
    },
    resetPass: {
      resetReqDate: {
        type: Date,
        default: Date.now
      },
      resetToken: {
        type: String,
        default: ""
      },
      resetExpiryDate: {
        type: Date,
        default: Date.now
      }
    },
    dateCreated: {
      type: Date,
      default: Date.now
    },
    creationType: {
      type: String,
      enum: ["Local", "Google", "Github"],
      default: "Local"
    },
    creationId: {
      type: String,
      default: ""
    }
  }
});

UserSchema.pre("save", function(next) {
  if (!this.password) {
    return next();
  }

  bcrypt.genSalt(10, (err, hashed) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(this.password, hashed, (error, resHash) => {
      if (error) {
        return next(error);
      }
      this.password = resHash;
      next();
    });
  });
});

UserSchema.methods.comparePass = function(rawPass) {
  return bcrypt.compare(rawPass, this.password);
};

module.exports = User = mongoose.model("usersColl", UserSchema);
