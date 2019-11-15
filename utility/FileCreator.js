const path = require("path");
const MandaLipos = require("../model/MandaLipo");
const storagePath = path.join(path.dirname(__dirname), "storage");
const crypto = require("crypto");
const xl = require("excel4node");
const { areaData } = require("../middleware/areaInfo");
const DLInfo = require("../model/Download");
const fs = require("fs");

//2019-Carl to Current-Carl:
// Oh! Gago di mo maintindihan no! Gago ka kasi e HAHAHAHAHAH

const getMonth = num => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  return months[parseInt(num) - 1];
};

module.exports.createFile = function(mainObj) {
  return new Promise(async function(resolve, reject) {
    try {
      const { years, mainRequest, type, userId, baseURL } = mainObj;
      const randBuff = await crypto.randomBytes(16).toString("hex");
      const randUrl = await crypto.randomBytes(32).toString("hex");
      MandaLipos.find({ year: { $in: years } })
        .select("-_id")
        .exec((err, resData) => {
          if (err) {
            return reject(err);
          }
          if (!resData) {
            return reject({ status: "error", msg: "Something went wrong" });
          }
          const finalData = [];
          years.map(mVal =>
            finalData.push({
              year: mVal,
              data: resData
                .filter(fVal => fVal.year === mVal)
                .filter(f2Val =>
                  mainRequest
                    .filter(f3Val => f3Val.year === f2Val.year)[0]
                    .months.includes(f2Val.month)
                )
                .map(m2Val => ({
                  month: m2Val.month,
                  lipoData: m2Val.lipoData.map(m3Val => ({
                    mean: m3Val.mean,
                    max: m3Val.max,
                    min: m3Val.min,
                    ...areaData.filter(f4Val => f4Val.id === m3Val.mapId)[0]
                  }))
                }))
            })
          );

          switch (type) {
            case "excel":
              let wb = new xl.Workbook();
              finalData.forEach(feVal => {
                let ws = wb.addWorksheet(`${feVal.year}, Mandaluyong`);
                ws.cell(1, 1).string("Month");
                ws.cell(1, 2).string("G.I.S Id");
                ws.cell(1, 3).string("Area Name");
                ws.cell(1, 4).string("District");
                ws.cell(1, 5).string("Population");
                ws.cell(1, 6).string("Land Area");
                ws.cell(1, 7).string("Radiance - Mean");
                ws.cell(1, 8).string("Radiance - Max");
                ws.cell(1, 9).string("Radiance - Min");
                let rowStart = 2;
                feVal.data.forEach(fe2Val => {
                  ws.cell(rowStart, 1).string(getMonth(fe2Val.month));
                  fe2Val.lipoData.forEach(fe3Val => {
                    ws.cell(rowStart, 2).number(fe3Val.id);
                    ws.cell(rowStart, 3).string(fe3Val.loc_name);
                    ws.cell(rowStart, 4).string(`District ${fe3Val.district}`);
                    ws.cell(rowStart, 5).number(
                      parseInt(fe3Val.loc_pop.split(",").join(""))
                    );
                    ws.cell(rowStart, 6).number(parseFloat(fe3Val.loc_area));
                    ws.cell(rowStart, 7).number(fe3Val.mean);
                    ws.cell(rowStart, 8).number(fe3Val.max);
                    ws.cell(rowStart, 9).number(fe3Val.min);
                    rowStart += 1;
                  });
                });
              });

              let DownInfo = new DLInfo({
                userId,
                fileName: `${randBuff}.xlsx`,
                fileSlug: randUrl,
                extName: "xlsx"
              });

              DownInfo.save(err => {
                if (err) {
                  return reject(err);
                }
                wb.write(path.join(storagePath, `${randBuff}.xlsx`));
                return resolve(baseURL + randUrl);
              });

              break;
            case "json":
              const jsonFinal = JSON.stringify(finalData);
              fs.writeFile(
                path.join(storagePath, `${randBuff}.json`),
                jsonFinal,
                function(err) {
                  if (err) {
                    return reject(err);
                  }
                  let DownInfo = new DLInfo({
                    userId,
                    fileName: `${randBuff}.json`,
                    fileSlug: randUrl,
                    extName: "json"
                  });

                  DownInfo.save(err => {
                    if (err) {
                      return reject(err);
                    }
                    return resolve(baseURL + randUrl);
                  });
                }
              );
              break;
            case "csv":
              let initCSV =
                "year,month,GISId,areaName,district,population,landArea,radMean,radMax,radMin\n";
              finalData.forEach(feVal => {
                feVal.data.forEach(fe2Val => {
                  fe2Val.lipoData.forEach(fe3Val => {
                    initCSV += `${feVal.year},${fe2Val.month},${fe3Val.id},${
                      fe3Val.loc_name
                    },${fe3Val.district},${fe3Val.loc_pop
                      .split(",")
                      .join("")},${fe3Val.loc_area},${fe3Val.mean},${
                      fe3Val.max
                    },${fe3Val.min}\n`;
                  });
                });
              });
              fs.writeFile(
                path.join(storagePath, `${randBuff}.csv`),
                initCSV,
                err => {
                  if (err) {
                    return reject(err);
                  }
                  let DownInfo = new DLInfo({
                    userId,
                    fileName: `${randBuff}.csv`,
                    fileSlug: randUrl,
                    extName: "csv"
                  });

                  DownInfo.save(err => {
                    if (err) {
                      return reject(err);
                    }
                    return resolve(baseURL + randUrl);
                  });
                }
              );
              break;
            default:
              return reject({ status: "error", msg: "Something went wrong" });
          }
        });
    } catch (error) {
      return reject(error);
    }
  });
};
