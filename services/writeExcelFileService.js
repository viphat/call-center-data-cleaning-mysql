const writeExcelFileService = {
  writeExcelFile: (outputWorkbook, outputSheetName, rowData, toHighlight) => {
    let worksheet = outputWorkbook.getWorksheet(outputSheetName)
    let row = worksheet.addRow(rowData)

    let highlight = {
      bold: true,
      size: 10,
      name: 'Arial',
      family: 2,
      color: { argb: 'FFFF0000' }
    }

    let normal = {
      size: 10,
      color: { theme: 1 },
      name: 'Arial',
      family: 2
    }

    if (toHighlight) {
      row.getCell(1).font = highlight
    } else {
      row.getCell(1).font = normal
    }

    row.getCell(1).border = worksheet.getCell('A5').border
    row.getCell(1).alignment = worksheet.getCell('A5').alignment

    for (let i = 2; i <= 24; i++) {
      row.getCell(i).font = row.getCell(1).font
      row.getCell(i).border = row.getCell(1).border
      row.getCell(i).alignment = row.getCell(1).alignment
    }

    if (outputSheetName.startsWith('Duplication')) {
      row.getCell(25).font = row.getCell(1).font
      row.getCell(25).border = row.getCell(1).border
      row.getCell(25).alignment = row.getCell(1).alignment
    }

    return outputWorkbook
  }
}

module.exports = writeExcelFileService
