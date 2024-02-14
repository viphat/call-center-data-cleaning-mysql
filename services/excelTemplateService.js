const _ = require('lodash')
const Excel = require('exceljs')

const valid_title = 'DATA CLEANING RESULT - VALID LIST'
const invalid_title = 'DATA CLEANING RESULT - INVALID LIST'
const duplication_title =
  'DATA CLEANING RESULT - DUPLICATION LIST (WITHIN 24 MONTHS)'
const duplication_over_24_months_title =
  'DATA CLEANING RESULT - DUPLICATION LIST (OVER 24 MONTHS)'
const duplication_with_another_agency_title =
  'DATA CLEANING RESULT - DUPLICATION WITH ANOTHER AGENCY LIST'
const logoPath = './assets/logo.png'

const excelTemplateService = {
  generateCleanedDataTemplate: async (outputPath) => {
    return new Promise((resolve, reject) => {
      const workbook = new Excel.Workbook()

      let sheetName = 'Valid'
      let worksheet = workbook.addWorksheet(sheetName, {})
      writeBaseTemplate(workbook, worksheet, valid_title)
      sheetName = 'Invalid'
      worksheet = workbook.addWorksheet(sheetName, {})
      writeBaseTemplate(workbook, worksheet, invalid_title)
      sheetName = 'Duplication - Within 24 Months'
      worksheet = workbook.addWorksheet(sheetName, {})
      writeBaseTemplate(workbook, worksheet, duplication_title)
      sheetName = 'Duplication - Over 24 Months'
      worksheet = workbook.addWorksheet(sheetName, {})
      writeBaseTemplate(workbook, worksheet, duplication_over_24_months_title)
      sheetName = 'Duplication With Another Agency'
      worksheet = workbook.addWorksheet(sheetName, {})
      writeBaseTemplate(
        workbook,
        worksheet,
        duplication_with_another_agency_title
      )

      // Write to File
      workbook.xlsx.writeFile(outputPath).then(() => {
        resolve(workbook)
      })
    })
  },

  generateReportTemplate: async (batch, source, outputPath) => {
    return new Promise((resolve, reject) => {
      const workbook = new Excel.Workbook()
      let worksheet = workbook.addWorksheet('Abs', {})

      worksheet.getColumn('A').width = 60
      worksheet.getRow(1).height = 50
      worksheet.getRow(4).height = 30
      worksheet.getRow(5).height = 40

      let logo = workbook.addImage({
        filename: logoPath,
        extension: 'png'
      })

      worksheet.addImage(logo, {
        tl: { col: 0, row: 0 },
        br: { col: 1, row: 1 }
      })

      worksheet.getColumn('B').width = 30
      worksheet.getColumn('C').width = 30
      worksheet.getColumn('D').width = 30
      worksheet.getColumn('E').width = 30
      worksheet.getColumn('F').width = 30
      worksheet.getColumn('G').width = 30
      worksheet.getColumn('H').width = 30
      worksheet.getColumn('I').width = 30
      worksheet.getColumn('J').width = 30
      worksheet.getColumn('K').width = 30
      worksheet.getColumn('L').width = 30
      worksheet.getColumn('M').width = 30
      worksheet.getColumn('N').width = 30
      worksheet.getColumn('O').width = 30
      worksheet.getColumn('P').width = 30
      worksheet.getColumn('Q').width = 30
      worksheet.getColumn('R').width = 30

      worksheet.getColumn('S').width = 30
      worksheet.getColumn('T').width = 30
      worksheet.getColumn('U').width = 30
      worksheet.getColumn('V').width = 30
      worksheet.getColumn('W').width = 30
      worksheet.getColumn('X').width = 30
      worksheet.getColumn('Y').width = 30
      worksheet.getColumn('Z').width = 30
      worksheet.getColumn('AA').width = 30
      worksheet.getColumn('AB').width = 30
      worksheet.getColumn('AC').width = 30
      worksheet.getColumn('AD').width = 30
      worksheet.getColumn('AE').width = 30
      worksheet.getColumn('AF').width = 30
      worksheet.getColumn('AG').width = 30

      worksheet.getCell('B1').value = 'HUGGIES CALL CENTER 2024 PROJECT'

      worksheet.getCell('B1').font = {
        bold: true,
        size: 26,
        name: 'Calibri',
        family: 2,
        color: { argb: 'FFFF0000' }
      }

      worksheet.getCell('B1').alignment = {
        horizontal: 'center',
        vertical: 'middle'
      }
      worksheet.mergeCells('B1:E1')

      // A2
      worksheet.getCell('B2').font = {
        bold: true,
        size: 14,
        name: 'Calibri',
        family: 2,
        underline: true,
        color: { argb: 'FFFF0000' }
      }

      worksheet.getCell('B2').alignment = {
        horizontal: 'center',
        vertical: 'middle'
      }

      worksheet.getCell('B2').value = 'Step 1: Database Clean - Summary Report'

      // A4
      worksheet.getCell('A5').border = {
        left: { style: 'thin' },
        right: { style: 'thin' },
        top: { style: 'thin' },
        bottom: { style: 'thin' }
      }

      worksheet.getCell('A5').font = {
        bold: true,
        size: 14,
        name: 'Calibri',
        family: 2
      }

      worksheet.getCell('A5').alignment = {
        horizontal: 'center',
        vertical: 'middle'
      }

      worksheet.getCell('A5').fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFABF8F' },
        bgColor: { indexed: 64 }
      }

      worksheet.getCell('A5').value = batch

      // A6, A20
      buildReportFirstColumnType3(
        worksheet,
        6,
        'Raw data received from ' + source
      )
      buildReportFirstColumnType3(
        worksheet,
        29,
        'Valid database (value) - base all'
      )

      // A7, A12, A16, A21
      buildReportFirstColumnType2(worksheet, 7, 'Data missing')
      buildReportFirstColumnType2(
        worksheet,
        13,
        'Duplicated Data (Checking vs. total database since 1st week)'
      )
      buildReportFirstColumnType2(worksheet, 25, 'Illogical data')
      buildReportFirstColumnType2(worksheet, 30, 'Email missing')

      // A8 - A11, A13 - A15, A17-A19
      buildReportFirstColumnType1(worksheet, 8, "Mom's name")
      buildReportFirstColumnType1(
        worksheet,
        9,
        'Address (District, Province, City)'
      )
      buildReportFirstColumnType1(worksheet, 10, 'Telephone number')
      buildReportFirstColumnType1(
        worksheet,
        11,
        'Date of pregnancy/Baby Delivery'
      )
      buildReportFirstColumnType1(worksheet, 12, 'Sampling')

      buildReportFirstColumnType1(
        worksheet,
        14,
        '% duplication between S1 and S2'
      )
      buildReportFirstColumnType1(worksheet, 15, '% duplication within S1')
      buildReportFirstColumnType1(worksheet, 16, '% duplication within S2')

      buildReportFirstColumnType1(
        worksheet,
        17,
        'Duplicated with Data less than 24 months'
      )
      buildReportFirstColumnType1(
        worksheet,
        18,
        'Duplication with Data over 24 months'
      )
      buildReportFirstColumnType1(
        worksheet,
        19,
        'Duplication within same year (2024)'
      )
      buildReportFirstColumnType1(worksheet, 20, 'Duplication with 2023 data')
      buildReportFirstColumnType1(worksheet, 21, 'Duplication with 2022 data')
      buildReportFirstColumnType1(worksheet, 22, 'Duplication with 2021 data')
      buildReportFirstColumnType1(worksheet, 23, 'Duplication with 2020 data')
      buildReportFirstColumnType1(worksheet, 24, 'Duplication with 2019 data')

      buildReportFirstColumnType1(worksheet, 26, 'Illogical phone number')
      buildReportFirstColumnType1(
        worksheet,
        27,
        'Illogical Date of pregnancy/Baby Delivery'
      )
      buildReportFirstColumnType1(worksheet, 28, 'Illogical Other')
      // Done 1st Col

      // Row 4 - D4, K4, P4, S4
      buildReportRow4(worksheet, 'D', 'D4:G4', 'KEY URBAN 1')
      buildReportRow4(worksheet, 'H', 'H4:J4', 'KEY URBAN 2')
      buildReportRow4(worksheet, 'K', 'K4:AE4', 'URBAN')
      buildReportRow4(worksheet, 'AF', 'AF4:AG4', 'SAMPLING')

      // Row 5, B4-T4
      buildReportRow5(worksheet, 'B', 'Total Project')
      buildReportRow5(worksheet, 'C', 'Total ' + batch)
      buildReportRow5(worksheet, 'D', 'Total Key Urban 1')
      buildReportRow5(worksheet, 'E', 'HCM')
      buildReportRow5(worksheet, 'F', 'Hà Nội')
      buildReportRow5(worksheet, 'G', 'Hải Phòng')
      buildReportRow5(worksheet, 'H', 'Total Key Urban 2')
      buildReportRow5(worksheet, 'I', 'Đà Nẵng')
      buildReportRow5(worksheet, 'J', 'Cần Thơ')
      buildReportRow5(worksheet, 'K', 'Total Urban')
      buildReportRow5(worksheet, 'L', 'Nghệ An')
      buildReportRow5(worksheet, 'M', 'Thái Nguyên')
      buildReportRow5(worksheet, 'N', 'Bình Dương')
      buildReportRow5(worksheet, 'O', 'Bình Định')
      buildReportRow5(worksheet, 'P', 'Bắc Ninh')
      buildReportRow5(worksheet, 'Q', 'Hưng Yên')
      buildReportRow5(worksheet, 'R', 'Bến Tre')
      buildReportRow5(worksheet, 'S', 'Bạc Liêu')
      buildReportRow5(worksheet, 'T', 'Kiên Giang')
      buildReportRow5(worksheet, 'U', 'Vĩnh Long')
      buildReportRow5(worksheet, 'V', 'Đồng Nai')
      buildReportRow5(worksheet, 'W', 'Thừa Thiên Huế')
      buildReportRow5(worksheet, 'X', 'Đắk Lắk')
      buildReportRow5(worksheet, 'Y', 'Hải Dương')
      buildReportRow5(worksheet, 'Z', 'Ninh Bình')
      buildReportRow5(worksheet, 'AA', 'Quảng Ngãi')
      buildReportRow5(worksheet, 'AB', 'Sóc Trăng')
      buildReportRow5(worksheet, 'AC', 'Trà Vinh')
      buildReportRow5(worksheet, 'AD', 'Vĩnh Phúc')
      buildReportRow5(worksheet, 'AE', 'Thái Bình')
      buildReportRow5(worksheet, 'AF', 'Pregnant Mom')
      buildReportRow5(worksheet, 'AG', 'New Mom')

      // Data
      let colArr = [
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z',
        'AA',
        'AB',
        'AC',
        'AD',
        'AE',
        'AF',
        'AG'
      ]

      let rowArr = [
        6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
        25, 26, 27, 28, 29, 30
      ]

      for (let rowArrIndex = 0; rowArrIndex < rowArr.length; rowArrIndex += 1) {
        for (
          let colArrIndex = 0;
          colArrIndex < colArr.length;
          colArrIndex += 1
        ) {
          buildDataRow(worksheet, rowArr[rowArrIndex], colArr[colArrIndex])
        }
      }
      // End Data

      // Write to File
      workbook.xlsx.writeFile(outputPath).then((res) => {
        resolve(workbook)
      })
    })
  }
}

function buildReportRow5(worksheet, cellIndex, text) {
  let row = worksheet.getRow(5)
  let fgColor = { theme: 0, tint: -0.1499984740745262 }

  if (cellIndex == 'B') {
    fgColor = { theme: 2, tint: -0.249977111117893 }
  }

  if (cellIndex == 'C') {
    fgColor = { theme: 5, tint: 0.5999938962981048 }
  }

  if (
    cellIndex == 'D' ||
    cellIndex == 'E' ||
    cellIndex == 'F' ||
    cellIndex == 'G'
  ) {
    fgColor = { argb: 'FFFFFF00' }
  }

  if (cellIndex == 'H' || cellIndex == 'I' || cellIndex == 'J') {
    fgColor = { theme: 6, tint: 0.3999755851924192 }
  }

  if (
    cellIndex == 'K' ||
    cellIndex == 'L' ||
    cellIndex == 'M' ||
    cellIndex == 'N' ||
    cellIndex == 'O' ||
    cellIndex == 'P' ||
    cellIndex == 'Q' ||
    cellIndex == 'R' ||
    cellIndex == 'S' ||
    cellIndex == 'T' ||
    cellIndex == 'U' ||
    cellIndex == 'V' ||
    cellIndex == 'W' ||
    cellIndex == 'X' ||
    cellIndex == 'Y' ||
    cellIndex == 'Z' ||
    cellIndex == 'AA' ||
    cellIndex == 'AB' ||
    cellIndex == 'AC' ||
    cellIndex == 'AD' ||
    cellIndex == 'AE'
  ) {
    fgColor = { theme: 9, tint: 0.3999755851924192 }
  }

  if (cellIndex == 'AF' || cellIndex == 'AG') {
    fgColor = { theme: 9, tint: 0.5999938962981048 }
  }

  row.getCell(cellIndex).border = {
    left: { style: 'thin' },
    right: { style: 'thin' },
    top: { style: 'thin' },
    bottom: { style: 'thin' }
  }

  row.getCell(cellIndex).font = {
    bold: true,
    size: 14,
    name: 'Calibri',
    family: 2
  }

  row.getCell(cellIndex).fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: fgColor,
    bgColor: { indexed: 64 }
  }

  row.getCell(cellIndex).alignment = {
    horizontal: 'center',
    vertical: 'middle'
  }

  row.getCell(cellIndex).value = text
}

function buildReportRow4(worksheet, cellIndex, mergeRange, text) {
  let row = worksheet.getRow(4)

  row.getCell(cellIndex).border = {
    left: { style: 'thin' },
    right: { style: 'thin' },
    top: { style: 'thin' },
    bottom: { style: 'thin' }
  }

  let fgColor = ''

  switch (cellIndex) {
    case 'D':
      fgColor = { argb: 'FFFFFF00' }
      break
    case 'H':
      fgColor = { theme: 6, tint: 0.3999755851924192 }
      break
    case 'K':
      fgColor = { theme: 9, tint: 0.3999755851924192 }
      break
    case 'AF':
      fgColor = { theme: 9, tint: 0.5999938962981048 }
      break
  }

  row.getCell(cellIndex).fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: fgColor,
    bgColor: { indexed: 64 }
  }

  row.getCell(cellIndex).font = {
    bold: true,
    size: 12,
    color: { argb: 'FF0070C0' },
    name: 'Calibri',
    family: 2
  }

  row.getCell(cellIndex).alignment = {
    horizontal: 'center',
    vertical: 'middle'
  }

  row.getCell(cellIndex).value = text

  worksheet.mergeCells(mergeRange)
}

function buildReportFirstColumnType3(worksheet, rowIndex, text) {
  let row = worksheet.getRow(rowIndex)

  row.getCell('A').border = {
    left: { style: 'thin' },
    right: { style: 'thin' },
    top: { style: 'thin' },
    bottom: { style: 'thin' }
  }

  if (rowIndex == 29) {
    row.getCell('A').font = {
      bold: true,
      size: 14,
      name: 'Calibri',
      family: 2,
      color: { theme: 0 }
    }
  } else {
    row.getCell('A').font = {
      bold: true,
      size: 14,
      name: 'Calibri',
      family: 2,
      color: { argb: 'FFFF0000' }
    }
  }

  row.getCell('A').alignment = { vertical: 'middle' }

  if (rowIndex == 29) {
    row.getCell('A').fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFFF0000' },
      bgColor: { indexed: 64 }
    }
  }

  row.getCell('A').value = text
}

function buildReportFirstColumnType2(worksheet, rowIndex, text) {
  let row = worksheet.getRow(rowIndex)

  row.getCell('A').border = {
    left: { style: 'thin' },
    right: { style: 'thin' },
    top: { style: 'thin' },
    bottom: { style: 'thin' }
  }

  if (rowIndex === 30) {
    row.getCell('A').font = {
      bold: true,
      size: 14,
      name: 'Calibri',
      family: 2
    }
  } else {
    row.getCell('A').font = {
      bold: true,
      size: 14,
      name: 'Calibri',
      family: 2,
      color: { theme: 0 }
    }
  }

  row.getCell('A').alignment = { vertical: 'middle' }

  if (rowIndex !== 30) {
    row.getCell('A').fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF00B0F0' },
      bgColor: { indexed: 64 }
    }
  }

  row.getCell('A').value = text
}

function buildReportFirstColumnType1(worksheet, rowIndex, text) {
  let row = worksheet.getRow(rowIndex)

  row.getCell('A').border = {
    left: { style: 'thin' },
    right: { style: 'thin' },
    top: { style: 'thin' },
    bottom: { style: 'thin' }
  }

  row.getCell('A').font = {
    size: 14,
    name: 'Calibri',
    family: 2
  }

  row.getCell('A').alignment = { horizontal: 'right', vertical: 'middle' }

  row.getCell('A').value = text
}

function buildDataRow(worksheet, rowIndex, cellIndex) {
  let row = worksheet.getRow(rowIndex)
  let bold = false
  let color = { argb: 'FF000000' }

  if (
    rowIndex == 6 ||
    rowIndex == 7 ||
    rowIndex == 13 ||
    rowIndex == 25 ||
    rowIndex == 29 ||
    rowIndex == 30
  ) {
    bold = true
  }

  if (rowIndex == 7 || rowIndex == 13 || rowIndex == 25) {
    row.getCell(cellIndex).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF00B0F0' },
      bgColor: { indexed: 64 }
    }
  }

  if (rowIndex == 29) {
    row.getCell(cellIndex).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFFF0000' },
      bgColor: { indexed: 64 }
    }
  }

  if (rowIndex == 6) {
    color = { argb: 'FFFF0000' }
  }

  if (rowIndex == 7 || rowIndex == 13 || rowIndex == 25 || rowIndex == 29) {
    color = { theme: 0 }
  }

  row.getCell(cellIndex).border = {
    left: { style: 'thin' },
    right: { style: 'thin' },
    top: { style: 'thin' },
    bottom: { style: 'thin' }
  }

  row.getCell(cellIndex).font = {
    italic: true,
    bold: bold,
    size: 14,
    name: 'Calibri',
    family: 2,
    color: color
  }

  row.getCell(cellIndex).numFmt = '#,##0'

  row.getCell(cellIndex).value = 0

  row.getCell(cellIndex).alignment = { horizontal: 'right', vertical: 'middle' }
}

function writeBaseTemplate(workbook, worksheet, title) {
  const columnWidths = [
    6, 17, 17, 30, 19.2, 19.2, 20, 9.5, 9.5, 9.5, 13.8, 13.8, 23.8, 23.8, 23.8,
    23.8, 10, 9.5, 9.5, 9.5, 10, 10, 10, 25, 10
  ]
  const rowHeight = 30

  // Loop from A to Y
  for (let i = 65; i <= 89; i++) {
    let char = String.fromCharCode(i)
    worksheet.getColumn(char).width = columnWidths[i - 65]
  }

  worksheet.getRow(5).height = rowHeight

  worksheet.getCell('E1').font = {
    bold: true,
    size: 14,
    name: 'Arial',
    family: 2,
    color: { argb: 'FFFF0000' }
  }

  worksheet.getCell('E1').alignment = { vertical: 'middle' }

  worksheet.getCell('E1').value = title

  worksheet.getCell('H2').font = {
    italic: true,
    size: 10,
    color: { argb: 'FF0000FF' },
    name: 'Arial',
    family: 2
  }

  worksheet.getCell('H2').alignment = { vertical: 'middle' }

  worksheet.getCell('H2').value = 'S1: Pregnant'

  worksheet.getCell('H3').font = {
    italic: true,
    size: 10,
    color: { argb: 'FF0000FF' },
    name: 'Arial',
    family: 2
  }

  worksheet.getCell('H3').alignment = { vertical: 'middle' }

  worksheet.getCell('H3').value = 'S2: Baby delivered'

  // Table Headers
  worksheet.mergeCells('A5:A6')

  worksheet.getCell('A5').font = {
    bold: true,
    size: 10,
    color: { theme: 1 },
    name: 'Arial',
    family: 2
  }

  worksheet.getCell('A5').fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FFFFFF00' },
    bgColor: { indexed: 64 }
  }

  worksheet.getCell('A5').alignment = {
    horizontal: 'center',
    vertical: 'middle',
    wrapText: true
  }

  worksheet.getCell('A5').border = {
    left: { style: 'thin' },
    right: { style: 'thin' },
    top: { style: 'thin' },
    bottom: { style: 'thin' }
  }

  worksheet.getCell('A5').value = 'No.'

  worksheet.mergeCells('B5:B6')
  formatCellAsHeader(worksheet, 'B5', 'Họ')
  worksheet.mergeCells('C5:C6')
  formatCellAsHeader(worksheet, 'C5', 'Tên')
  worksheet.mergeCells('D5:D6')
  formatCellAsHeader(worksheet, 'D5', 'Email')
  worksheet.mergeCells('E5:E6')
  formatCellAsHeader(worksheet, 'E5', 'Quận/Huyện')
  worksheet.mergeCells('F5:F6')
  formatCellAsHeader(worksheet, 'F5', 'Tỉnh/Thành')
  worksheet.mergeCells('G5:G6')
  formatCellAsHeader(worksheet, 'G5', 'Điện Thoại')

  worksheet.mergeCells('H5:J5')
  formatCellAsHeader(worksheet, 'H5', 'Ngày dự sinh/Ngày mẹ sinh bé')
  formatCellAsHeader(worksheet, 'H6', 'Ngày')
  formatCellAsHeader(worksheet, 'I6', 'Tháng')
  formatCellAsHeader(worksheet, 'J6', 'Năm')

  worksheet.mergeCells('K5:L5')
  formatCellAsHeader(worksheet, 'K5', 'Đối tượng nhận mẫu')
  formatCellAsHeader(worksheet, 'K6', 'S1')
  formatCellAsHeader(worksheet, 'L6', 'S2')

  worksheet.mergeCells('M5:P5')
  formatCellAsHeader(worksheet, 'M5', 'Thông tin bệnh viện')
  formatCellAsHeader(worksheet, 'M6', 'Tên bệnh viện')
  formatCellAsHeader(worksheet, 'N6', 'Tỉnh Thành')
  formatCellAsHeader(worksheet, 'O6', 'Channel\n(Key urban/Urban/Rural)')
  formatCellAsHeader(worksheet, 'P6', 'Khu vực')

  worksheet.mergeCells('Q5:Q6')
  formatCellAsHeader(worksheet, 'Q5', 'Agency')

  worksheet.mergeCells('R5:T5')
  formatCellAsHeader(worksheet, 'R5', 'Thời gian lấy mẫu')

  formatCellAsHeader(worksheet, 'R6', 'Ngày')
  formatCellAsHeader(worksheet, 'S6', 'Tháng')
  formatCellAsHeader(worksheet, 'T6', 'Năm')

  worksheet.mergeCells('U5:U6')
  formatCellAsHeader(worksheet, 'U5', 'Staff')

  worksheet.mergeCells('V5:V6')
  formatCellAsHeader(worksheet, 'V5', 'Note')

  worksheet.mergeCells('W5:W6')
  formatCellAsHeader(worksheet, 'W5', 'Mã PG')

  worksheet.mergeCells('X5:X6')
  formatCellAsHeader(worksheet, 'X5', 'QR Code')
  // End Table Headers

  if (
    worksheet.name.endsWith('Duplication') ||
    worksheet.name.endsWith('Duplication With Another Agency')
  ) {
    worksheet.mergeCells('Y5:Y6')
    formatCellAsHeader(worksheet, 'Y5', 'Tuần')
  }

  // Add Logo
  let logo = workbook.addImage({
    filename: logoPath,
    extension: 'png'
  })

  worksheet.addImage(logo, 'A1:B3')
}

function formatCellAsHeader(worksheet, cell, value) {
  worksheet.getCell(cell).font = worksheet.getCell('A5').font
  worksheet.getCell(cell).fill = worksheet.getCell('A5').fill
  worksheet.getCell(cell).alignment = worksheet.getCell('A5').alignment
  worksheet.getCell(cell).border = worksheet.getCell('A5').border
  worksheet.getCell(cell).value = value
}

module.exports = excelTemplateService
