const User = require("../model/User");
const MandaLipo = require("../model/MandaLipo");
const Activator = require("../utility/Activator");
const DLInfo = require("../model/Download");
const ULInfo = require("../model/Upload");
const JWT = require("jsonwebtoken");
const { areaData } = require("./areaInfo");
const FC = require("../utility/FileCreator");
const path = require("path");
const Helper = require("../utility/Helper");

const storagePath = path.join(path.dirname(__dirname), "storage");

const upperFirst = str => str.charAt(0).toUpperCase() + str.slice(1);

const customActivate = (req, res, next) => {
  const { token } = req.params;
  if (!token) {
    res.status(400).json({ status: "error", msg: "Something went wrong." });
    return next();
  }

  User.findOne({
    "acctInfo.creationType": "Local",
    "acctInfo.activationInfo.activationToken": token
  })
    .select("-acctInfo.password")
    .exec((err, responseData) => {
      if (err) {
        res.status(400).json({ status: "error", msg: "Something went wrong." });
        return next();
      }

      if (!responseData) {
        res.status(400).json({ status: "error", msg: "Invalid Credentials." });
        return next();
      }
      const { activationExpiry } = responseData.acctInfo.activationInfo;
      const { email, firstName } = responseData.acctInfo;

      if (new Date(activationExpiry) < new Date()) {
        res.status(400).json({
          status: "error",
          msg: "The link is expired, try to re-signup"
        });
        return next();
      }

      Activator.sender(responseData._id)
        .then(returnData => {
          res
            .status(200)
            .json({ status: "success", data: { email, firstName } });
          return next();
        })
        .catch(returnError => {
          res.status(400).json({
            status: "error",
            msg: "The link is expired, try to re-signup"
          });
          return next();
        });
    });
};

const verifyToken = (req, res, next) => {
  const bearer = req.headers["x-auth-token"] || null;

  if (bearer === null) {
    res.status(400);
    return next("router");
  }

  const token = bearer.split(" ").slice(-1)[0];

  if (!token || token.indexOf("bearer") > -1) {
    res.status(400);
    return next("router");
  }

  JWT.verify(token, process.env.JWT_SECRET, (jwtErr, decoded) => {
    if (jwtErr) {
      res.status(400);
      return next("router");
    }

    const { creationId: initId, email: initEmail, type: initType } = decoded;
    User.findOne({ _id: initId }, (fetchErr, resData) => {
      if (fetchErr) {
        res.status(400);
        return next("router");
      }

      const { _id } = resData;

      const {
        email,
        creationType,
        firstName,
        lastName,
        role
      } = resData.acctInfo;
      if (initEmail !== email || creationType !== initType) {
        res.status(400);
        return next("router");
      }

      JWT.sign(
        { creationId: _id, email, type: creationType },
        process.env.JWT_SECRET,
        { expiresIn: "1d" },
        (signErr, encoded) => {
          if (signErr) {
            res.status(400);
            return next("router");
          }

          res
            .status(200)
            .json({
              token: encoded,
              user: { email, firstName, lastName, role }
            });
          return next();
        }
      );
    });
  });
};

const verifyRequest = (req, res, next) => {
  const bearer = req.headers["x-auth-token"] || null;

  if (bearer === null) {
    res.status(400);
    return next("router");
  }

  const token = bearer.split(" ").slice(-1)[0];

  if (!token || token.indexOf("bearer") > -1) {
    res.status(400);
    return next("router");
  }

  JWT.verify(token, process.env.JWT_SECRET, (verifyErr, resDecode) => {
    if (verifyErr) {
      res.status(403).json({ status: "error", msg: "Invalid Credentials." });
      return next("router");
    }

    req.userId = resDecode.creationId;
    return next();
  });
};

const lipoTable = (req, res, next) => {
  MandaLipo.find({})
    .select("-_id")
    .exec((err, resData) => {
      if (err) {
        res.status(400).json({ status: "error", msg: "Something went wrong." });
        return next("router");
      }

      let newData = resData.map((mVal, mIndex) => ({
        key: mIndex,
        year: mVal.year,
        month: mVal.month,
        drawerData: JSON.stringify({ year: mVal.year, month: mVal.month }),
        dataType: "VCM"
      }));

      setTimeout(() => {
        res.status(200).json({ status: "success", msg: { data: newData } });
        return next("router");
      }, 2000);
    });
};

const lipoSingle = (req, res, next) => {
  if (!req.body) {
    res.status(400).json({ status: "error", msg: "Something went wrong." });
    return next("router");
  }

  const { year, month } = req.body;
  MandaLipo.findOne({ year, month })
    .select("-year -month")
    .exec((err, resData) => {
      if (err) {
        res.status(400).json({ status: "error", msg: "Something went wrong." });
        return next("router");
      }
      let finalData = resData.lipoData;
      finalData = finalData.map((mVal, mIndex) => ({
        key: mIndex,
        mean: mVal.mean,
        min: mVal.min,
        max: mVal.max,
        ...areaData.filter(fVal => fVal.id === mVal.mapId)[0]
      }));

      setTimeout(() => {
        res.status(200).json({ status: "success", msg: { data: finalData } });
        return next();
      }, 2000);
    });
};

const lipoRequest = (req, res, next) => {
  const { fileRequest, type } = req.body;
  const initYear = [...new Set(fileRequest.map(mVal => mVal.year))];

  FC.createFile({
    years: initYear,
    mainRequest: fileRequest,
    type,
    userId: req.userId,
    baseURL: `${req.protocol}://${req.hostname}:${process.env.PORT}/data/lipo/download/`
  })
    .then(resData => res.status(200).json(resData))
    .catch(console.error);

  return next();
};

const downloadFile = (req, res, next) => {
  const { slug } = req.params;
  DLInfo.findOne({ fileSlug: slug })
    .select("fileName extName")
    .exec((resErr, resData) => {
      if (resErr || !resData) {
        res.status(400).send("Link has expired");
        return next("router");
      }

      setTimeout(() => {
        res.download(
          path.join(storagePath, resData.fileName),
          `MandaluyongCityLiPo.${resData.extName}`
        );
        return next();
      }, 2000);
    });
};

const handleFile = (req, res, next) => {
  try {
    const fileBuffer = JSON.parse(req.file.buffer);
    const { userId } = req;
    Helper.isValidUploadJSON(fileBuffer, (err, isValid) => {
      if (err) {
        res.status(400).json({ status: "error", msg: err });
        return next();
      }
      let forCheckingData = isValid.map(mVal => ({
        ...mVal,
        data: mVal.data.map(m2Val => m2Val.month)
      }));
      forCheckingData.forEach(feVal => {
        const { year, data } = feVal;
        MandaLipo.find({ $and: [{ year }, { month: { $in: data } }] })
          .select("-lipoData")
          .exec((err, resData) => {
            if (err || resData.length) {
              res.status(400).json({
                status: "error",
                msg: "Provided data shows duplicate in the database."
              });
              return next();
            }
          });
      });
      const finalSave = [];
      isValid.forEach(feVal => {
        const { year, data } = feVal;
        data.forEach(fe2Val => {
          const { month, lipoData } = fe2Val;
          finalSave.push({ year, month, lipoData });
        });
      });
      MandaLipo.insertMany(finalSave);

      Helper.saveUpload(isValid, (err, filename) => {
        if (err) {
          res.status(400).json({ status: "error", msg: err });
          return next();
        }

        let newUL = new ULInfo({ userId, fileName: filename, extName: "json" });
        newUL.save(err => {
          if (err) {
            res.status(400).json({ status: "error", msg: err });
            return next();
          }
        });
        res.status(200).json({
          status: "success",
          msg: "Your file has been completely added"
        });
        return next("router");
      });
    });
  } catch (e) {
    res.status(500).json({ status: "error", msg: e });
    next();
  }
};

const userTable = (req, res, next) => {
  User.aggregate([
    {
      $project: {
        acctInfo: {
          fullname: {
            $concat: ["$acctInfo.firstName", " ", "$acctInfo.lastName"]
          },
          role: 1,
          email: 1,
          dateCreated: 1,
          activationInfo: { isActivated: 1 },
          creationType: 1
        }
      }
    }
  ]).exec((err, resData) => {
    if (err) {
      res.status(400).json({ status: "error", msg: "Something went wrong." });
      return next("router");
    }
    if (!resData) {
      res.status(200).json({ status: "success", data: null });
    }

    let dataSource = resData
      .map((mVal, index) => ({
        key: index,
        _id: mVal._id,
        ...mVal.acctInfo
      }))
      .map(m2Val => ({
        ...m2Val,
        isActivated: m2Val.activationInfo.isActivated
      }))
      .map(m3Val => {
        delete m3Val["activationInfo"];
        return m3Val;
      });

    res.status(200).json({ status: "success", data: dataSource });
    return next();
  });
};

const downloadTable = (req, res, next) => {
  DLInfo.aggregate([
    {
      $lookup: {
        from: "userscolls",
        localField: "userId",
        foreignField: "_id",
        as: "userInfo"
      }
    },
    {
      $project: {
        fileName: 1,
        requestedDate: 1,
        fileSlug: 1,
        userInfo: { acctInfo: { firstName: 1, lastName: 1 } }
      }
    }
  ]).exec((err, data) => {
    if (err) {
      res.status(400).json({ status: "error", msg: "Something went wrong." });
      return next("router");
    }

    if (!data) {
      res.status(200).json({ status: "error", data: null });
    }
    const finalData = data
      .map((mVal, index) => ({
        ...mVal,
        key: index,
        userInfo: [mVal.userInfo[0].acctInfo].map(m2Val => ({
          fullname: `${m2Val.firstName} ${m2Val.lastName}`,
          email: m2Val.email
        }))
      }))
      .map(m2Val => {
        const { fullname } = m2Val.userInfo[0];
        delete m2Val["userInfo"];
        return {
          ...m2Val,
          fullname,
          fileURL: `${req.protocol}://${req.hostname}:${process.env.PORT}/data/lipo/download/${m2Val.fileSlug}`
        };
      });
    res.status(200).json({ status: "success", data: finalData });
    return next();
  });
};

const userDetails = (req, res, next) => {
  const { id } = req.body;
  User.findOne({ _id: id })
    .select(
      "acctInfo.activationInfo.isActivated acctInfo.creationType acctInfo.role acctInfo.firstName acctInfo.lastName acctInfo.email acctInfo.dateCreated"
    )
    .exec((err, data) => {
      if (err || !data) {
        res.status(400).json({ status: "error", msg: "Something went wrong" });
        return next("router");
      }

      let finalData = [data.acctInfo].map(mVal => {
        const {
          firstName,
          lastName,
          email,
          activationInfo,
          dateCreated,
          creationType,
          role
        } = mVal;
        return {
          firstName,
          lastName,
          fullName: `${lastName}, ${firstName}`,
          email,
          isActivated: activationInfo.isActivated,
          dateCreated,
          creationType,
          role: upperFirst(role)
        };
      });

      res.status(200).json({ status: "success", data: finalData[0] });
      next();
    });
};

module.exports = {
  customActivate,
  verifyToken,
  lipoTable,
  verifyRequest,
  lipoSingle,
  lipoRequest,
  downloadFile,
  handleFile,
  userTable,
  downloadTable,
  userDetails
};
