const Excel = require('exceljs')
const _ = require('lodash')
const Hospital = require('../models').Hospital
const Match = require('../models').Match

const OUTPUT_PATH = './output/'

const checkDataService = {
  checkMissingHospitals: async (file, source) => {
    const checkDataService = new CheckDataService(file, source)
    const notFoundHospitals = await checkDataService.checkMissingHospitals()

    if (notFoundHospitals.length === 0) {
      return null
    }

    await checkDataService.writeToExcelFile('Not Found List')
    await checkDataService.writeToExcelFile('Hospital List')

    return checkDataService.outputPath
  }
}

class CheckDataService {
  constructor(file, source) {
    this.file = file
    this.source = source
    this.startRow = 2

    if (this.source === 'OTB-LHTS') {
      this.hospitalNameCol = 10
    } else {
      this.hospitalNameCol = 13
    }

    this.notFoundHospitals = []
    this.outputPath = `${OUTPUT_PATH}check_missing_hospitals_${Date.now()}.xlsx`
  }

  async writeToExcelFile(sheetName) {
    if (this.notFoundHospitals.length === 0) {
      return
    }

    let workbook = new Excel.Workbook()

    if (sheetName === 'Hospital List') {
      workbook = await workbook.xlsx.readFile(this.outputPath)
    }

    const worksheet = workbook.addWorksheet(sheetName, {})

    worksheet.getColumn('A').width = 20.0
    worksheet.getColumn('B').width = 9.0
    worksheet.addRow(['Hospital Name', 'ID'])

    if (sheetName === 'Not Found List') {
      this.notFoundHospitals.forEach((hospitalName) => {
        worksheet.addRow([hospitalName, ''])
      })
    } else if (sheetName === 'Hospital List') {
      const hospitals = await Hospital.findAll()

      hospitals.forEach((hospital) => {
        worksheet.addRow([hospital.name, hospital.hospital_id])
      })
    }

    await workbook.xlsx.writeFile(this.outputPath)
  }

  async checkMissingHospitals() {
    return new Promise((resolve, reject) => {
      const workbook = new Excel.Workbook()

      workbook.xlsx.readFile(this.file.path).then(async () => {
        const worksheet = workbook.getWorksheet(1)
        let rowNumber = this.startRow

        if (worksheet === undefined) {
          console.log(workbook)
          return reject('Không tìm thấy Worksheet')
        }

        let hospitalName = worksheet.getCell(
          rowNumber,
          this.hospitalNameCol
        ).value
        let totalRows = worksheet.rowCount

        for (
          ;
          rowNumber <= totalRows &&
          hospitalName !== undefined &&
          hospitalName !== null &&
          hospitalName !== '';
          rowNumber++
        ) {
          await this.readEachRow(worksheet, rowNumber)

          if (rowNumber % 1000 === 0) {
            await new Promise((resolve) => setTimeout(resolve, 1000))
          }

          hospitalName = worksheet.getCell(
            rowNumber,
            this.hospitalNameCol
          ).value
        }

        resolve(this.notFoundHospitals)
      })
    })
  }

  async readEachRow(worksheet, rowNumber) {
    let hospitalName = worksheet.getCell(rowNumber, this.hospitalNameCol).value

    if (
      hospitalName === undefined ||
      hospitalName === null ||
      hospitalName === ''
    ) {
      return
    }

    hospitalName = hospitalName.trim().replace(/\s+/g, ' ')

    const hospital = await this.findHospital(hospitalName)

    if (hospital === undefined || hospital === null) {
      const matchedHospital = await this.findMatchedHospital(hospitalName)

      if (matchedHospital === undefined || matchedHospital === null) {
        this.notFoundHospitals.push(hospitalName)
      }
    }

    return
  }

  async findMatchedHospital(hospitalName) {
    return Match.findOne({
      where: {
        name: hospitalName
      }
    })
  }

  async findHospital(hospitalName) {
    return Hospital.findOne({
      where: {
        name: hospitalName
      }
    })
  }
}

module.exports = checkDataService
