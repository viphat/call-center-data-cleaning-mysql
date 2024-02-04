const Customer = require('../models/customers');
const _ = require('lodash');
const Excel = require('exceljs');
const padStart = require('string.prototype.padstart');

const importExcelFileService = {
  importExcelFile: async (file, source, batch) => {
    const service = new ImportExcelFileService(file, source, batch);
    return file;
  },
}

class ImportExcelFileService {
  constructor(file, source, batch) {
    this.file = file;
    this.source = source;
    this.batch = batch;

    // Set Rows and Columns
    this.dataBeginRow = 2;
    this.lastNameCol = 2;

    this.emailCol = 4;
    this.districtCol = 5;
    this.provinceCol = 6;

    this.s1Col = 11;
    this.s2Col = 12;

    if (source === 'OTB-LHTS') {
      this.firstNameCol = 2;
      this.dayCol = 3;
      this.monthCol = 4;
      this.yearCol = 5;
      this.phoneCol = 6;
      this.collectedDayCol = 7;
      this.collectedMonthCol = 8;
      this.collectedYearCol = 9;
      this.hospitalNameCol = 10;
    } else {
      this.firstNameCol = 3;
      this.phoneCol = 7;
      this.dayCol = 8;
      this.monthCol = 9;
      this.yearCol = 10;
      this.hospitalNameCol = 13;
    }

    if (source === 'OTB') {
      this.collectedDateCol = 17;
      this.staffCol = 18;
      this.noteCol = 19;
      this.pgCodeCol = 20;
      this.qrCodeCol = 21;
    } else if (source === 'IMC') {
      this.collectedDateCol = 19;
      this.staffCol = 20;
      this.noteCol = 21;
      this.pgCodeCol = 22;
      this.qrCodeCol = 23;
    }
  }

  async import() {
    const workbook = new Excel.Workbook();
    await workbook.xlsx.readFile(this.file.path);
    const worksheet = workbook.getWorksheet(1);

    worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
    });
  }
}

module.exports = importExcelFileService;