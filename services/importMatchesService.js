const _ = require('lodash')
const Excel = require('exceljs')
const Match = require('../models').Match

const importMatchesService = {
  importMatches: async (file) => {
    return new Promise((resolve, reject) => {
      const workbook = new Excel.Workbook()
      workbook.xlsx.readFile(file.path).then(async () => {
        const worksheet = workbook.getWorksheet(1)
        let row = worksheet.getRow(1)
        if (
          row.getCell(1).value !== 'Hospital Name' &&
          row.getCell(2).value !== 'ID'
        ) {
          return reject(false)
        }

        // for loop that always true to read all rows
        for (let rowIndex = 2; true; rowIndex += 1) {
          row = worksheet.getRow(rowIndex)

          const hospitalName = row.getCell(1).value
          const hospitalId = row.getCell(2).value
          console.log(hospitalName, hospitalId)

          if (!isNotEmpty(hospitalName) && !isNotEmpty(hospitalId)) {
            break
          }

          if (!isNotEmpty(hospitalId)) {
            continue
          }

          const match = {
            name: hospitalName.trim().replace(/\s+/g, ' '),
            hospital_id: hospitalId
          }

          await Match.findOrCreate({
            where: match,
            defaults: match
          })
        }

        return resolve(true)
      })
    })
  }
}

function isNotEmpty(value) {
  if (typeof value === 'number' && !isNaN(value)) {
    return true
  }

  return !_.isNil(value) && !_.isEmpty(value)
}

module.exports = importMatchesService
