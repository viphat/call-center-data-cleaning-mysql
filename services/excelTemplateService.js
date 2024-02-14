const _  = require('lodash');
const Excel = require('exceljs');

const valid_title = 'DATA CLEANING RESULT - VALID LIST';
const invalid_title = 'DATA CLEANING RESULT - INVALID LIST';
const duplication_title = 'DATA CLEANING RESULT - DUPLICATION LIST (WITHIN 24 MONTHS)';
const duplication_over_24_months_title = 'DATA CLEANING RESULT - DUPLICATION LIST (OVER 24 MONTHS)';
const duplication_with_another_agency_title = 'DATA CLEANING RESULT - DUPLICATION WITH ANOTHER AGENCY LIST';
const logoPath = './assets/logo.png';

const excelTemplateService = {
  generateExcelTemplate: async (outputPath) => {
    return new Promise((resolve, reject) => {
      const workbook = new Excel.Workbook();

      let sheetName = 'Valid';
      let worksheet = workbook.addWorksheet(sheetName, {});
      writeBaseTemplate(workbook, worksheet, valid_title);
      sheetName = 'Invalid';
      worksheet = workbook.addWorksheet(sheetName, {});
      writeBaseTemplate(workbook, worksheet, invalid_title);
      sheetName = 'Duplication - Within 24 Months';
      worksheet = workbook.addWorksheet(sheetName, {});
      writeBaseTemplate(workbook, worksheet, duplication_title);
      sheetName = 'Duplication - Over 24 Months';
      worksheet = workbook.addWorksheet(sheetName, {});
      writeBaseTemplate(workbook, worksheet, duplication_over_24_months_title);
      sheetName = 'Duplication With Another Agency';
      worksheet = workbook.addWorksheet(sheetName, {});
      writeBaseTemplate(workbook, worksheet, duplication_with_another_agency_title);

      // Write to File
      workbook.xlsx.writeFile(outputPath).then(() => {
        resolve(workbook);
      });
    });
  },
}

function writeBaseTemplate(workbook, worksheet, title) {
  const columnWidths = [6, 17, 17, 30, 19.2, 19.2, 20, 9.5, 9.5, 9.5, 13.8, 13.8, 23.8, 23.8, 23.8, 23.8, 10, 9.5, 9.5, 9.5, 10, 10, 10, 25, 10];
  const rowHeight = 30;

  // Loop from A to Y
  for (let i = 65; i <= 89; i++) {
    let char = String.fromCharCode(i);
    worksheet.getColumn(char).width = columnWidths[i - 65];
  }

  worksheet.getRow(5).height = rowHeight;

  worksheet.getCell('E1').font = {
    bold: true, size: 14, name: 'Arial', family: 2,
    color: { argb: 'FFFF0000' }
  };

  worksheet.getCell('E1').alignment = { vertical: 'middle' };

  worksheet.getCell('E1').value = title;

  worksheet.getCell('H2').font = {
    italic: true,
    size: 10,
    color: { argb: 'FF0000FF' },
    name: 'Arial',
    family: 2
  }

  worksheet.getCell('H2').alignment = { vertical: 'middle' };

  worksheet.getCell('H2').value = 'S1: Pregnant';

  worksheet.getCell('H3').font = {
    italic: true,
    size: 10,
    color: { argb: 'FF0000FF' },
    name: 'Arial',
    family: 2
  }

  worksheet.getCell('H3').alignment = { vertical: 'middle' };

  worksheet.getCell('H3').value = 'S2: Baby delivered';

  // Table Headers
  worksheet.mergeCells('A5:A6');

  worksheet.getCell('A5').font = {
    bold: true,
    size: 10,
    color: { theme: 1 },
    name: 'Arial',
    family: 2
  }

  worksheet.getCell('A5').fill =  {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FFFFFF00' },
    bgColor: { indexed: 64 }
  }

  worksheet.getCell('A5').alignment = {
    horizontal: 'center', vertical: 'middle', wrapText: true
  }

  worksheet.getCell('A5').border = {
    left: { style: 'thin' },
    right: { style: 'thin' },
    top: { style: 'thin' },
    bottom: { style: 'thin' }
  }

  worksheet.getCell('A5').value = 'No.'

  worksheet.mergeCells('B5:B6');
  formatCellAsHeader(worksheet, 'B5', 'Họ');
  worksheet.mergeCells('C5:C6');
  formatCellAsHeader(worksheet, 'C5', 'Tên');
  worksheet.mergeCells('D5:D6');
  formatCellAsHeader(worksheet, 'D5', 'Email');
  worksheet.mergeCells('E5:E6');
  formatCellAsHeader(worksheet, 'E5', 'Quận/Huyện');
  worksheet.mergeCells('F5:F6');
  formatCellAsHeader(worksheet, 'F5', 'Tỉnh/Thành');
  worksheet.mergeCells('G5:G6');
  formatCellAsHeader(worksheet, 'G5', 'Điện Thoại');

  worksheet.mergeCells('H5:J5');
  formatCellAsHeader(worksheet, 'H5', 'Ngày dự sinh/Ngày mẹ sinh bé');
  formatCellAsHeader(worksheet, 'H6', 'Ngày');
  formatCellAsHeader(worksheet, 'I6', 'Tháng');
  formatCellAsHeader(worksheet, 'J6', 'Năm');

  worksheet.mergeCells('K5:L5');
  formatCellAsHeader(worksheet, 'K5', 'Đối tượng nhận mẫu');
  formatCellAsHeader(worksheet, 'K6', 'S1');
  formatCellAsHeader(worksheet, 'L6', 'S2');

  worksheet.mergeCells('M5:P5');
  formatCellAsHeader(worksheet, 'M5', 'Thông tin bệnh viện');
  formatCellAsHeader(worksheet, 'M6', 'Tên bệnh viện');
  formatCellAsHeader(worksheet, 'N6', 'Tỉnh Thành');
  formatCellAsHeader(worksheet, 'O6', 'Channel\n(Key urban/Urban/Rural)');
  formatCellAsHeader(worksheet, 'P6', 'Khu vực');

  worksheet.mergeCells('Q5:Q6');
  formatCellAsHeader(worksheet, 'Q5', 'Agency');

  worksheet.mergeCells('R5:T5');
  formatCellAsHeader(worksheet, 'R5', 'Thời gian lấy mẫu');

  formatCellAsHeader(worksheet, 'R6', 'Ngày');
  formatCellAsHeader(worksheet, 'S6', 'Tháng');
  formatCellAsHeader(worksheet, 'T6', 'Năm');

  worksheet.mergeCells('U5:U6');
  formatCellAsHeader(worksheet, 'U5', 'Staff');

  worksheet.mergeCells('V5:V6');
  formatCellAsHeader(worksheet, 'V5', 'Note');

  worksheet.mergeCells('W5:W6');
  formatCellAsHeader(worksheet, 'W5', 'Mã PG');

  worksheet.mergeCells('X5:X6');
  formatCellAsHeader(worksheet, 'X5', 'QR Code');
  // End Table Headers

  if (worksheet.name.endsWith('Duplication') || worksheet.name.endsWith('Duplication With Another Agency')) {
    worksheet.mergeCells('Y5:Y6');
    formatCellAsHeader(worksheet, 'Y5', 'Tuần');
  }

  // Add Logo
  let logo = workbook.addImage({
    filename: logoPath,
    extension: 'png'
  });

  worksheet.addImage(logo, 'A1:B3');
}

function formatCellAsHeader(worksheet, cell, value) {
  worksheet.getCell(cell).font = worksheet.getCell('A5').font;
  worksheet.getCell(cell).fill = worksheet.getCell('A5').fill;
  worksheet.getCell(cell).alignment = worksheet.getCell('A5').alignment;
  worksheet.getCell(cell).border = worksheet.getCell('A5').border;
  worksheet.getCell(cell).value = value;
}

module.exports = excelTemplateService;