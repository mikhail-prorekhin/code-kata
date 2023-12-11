const sheetNeative = require("./responses/balance-sheet-response1.json");
const sheetPositive = require("./responses/balance-sheet-response2.json");

const getResponseByEstYear = (estYear) =>
  parseInt(estYear) >= 2000 ? sheetNeative : sheetPositive;

const approveAccount = (profitOrLoss) =>
  parseInt(profitOrLoss) > 0 ? "approved" : "rejected";

module.exports = {
  getResponseByEstYear,
  approveAccount,
};
