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
    activationInfo: {
      isActivated: {
        type: Boolean,
        default: false
      },
      activationToken: {
        type: String,
        default: ""
      },
      activationExpiry: {
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
      enum: ["Local", "Google"],
      default: "Local"
    },
    creationId: {
      type: String,
      default: ""
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    }
  }
});

UserSchema.pre("save", function(next) {
  if (!this.acctInfo.password || !this.isModified("acctInfo.password")) {
    return next();
  }
  let { password } = this.acctInfo;

  bcrypt.genSalt(10, (err, salted) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(password, salted, (error, resHash) => {
      if (error) {
        return next(error);
      }
      this.acctInfo.password = resHash;
      return next();
    });
  });
});

UserSchema.methods.comparePass = function(rawPass) {
  return bcrypt.compare(rawPass, this.acctInfo.password);
};

module.exports = User = mongoose.model("usersColl", UserSchema);
