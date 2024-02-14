const _ = require('lodash')
const Excel = require('exceljs')
const { sequelize } = require('../models/index')
const { generateReportTemplate } = require('./excelTemplateService')

const OUTPUT_PATH = './output/'

const exportDataService = {
  generateReport: async (batch, source) => {
    const service = new ExportDataService(batch, source)
    const outputPath = await service.generateReport()
    return outputPath
  }
}

class ExportDataService {
  constructor(batch, source) {
    this.batch = batch
    this.source = source
    this.outputPath = `${OUTPUT_PATH}${batch}_${source}_${Date.now()}_report.xlsx`
  }

  async generateReport() {
    let workbook = await generateReportTemplate(
      this.batch,
      this.source,
      this.outputPath
    )

    // Add data to the report
    let rowData = await this.getData('All')
    await this.writeToExcelFile(workbook, rowData, 'B')

    rowData = await this.getData('ByBatch')
    await this.writeToExcelFile(workbook, rowData, 'C')

    rowData = await this.getData('Key Urban 1')
    await this.writeToExcelFile(workbook, rowData, 'D')

    rowData = await this.getData({ areaId: 1 }) // Hồ Chí Minh
    await this.writeToExcelFile(workbook, rowData, 'E')

    rowData = await this.getData({ areaId: 2 }) // Hà Nội
    await this.writeToExcelFile(workbook, rowData, 'F')

    rowData = await this.getData({ areaId: 6 }) // Hải Phòng
    await this.writeToExcelFile(workbook, rowData, 'G')

    rowData = await this.getData('Key Urban 2')
    await this.writeToExcelFile(workbook, rowData, 'H')

    rowData = await this.getData({ areaId: 3 }) // Đà Nẵng
    await this.writeToExcelFile(workbook, rowData, 'I')

    rowData = await this.getData({ areaId: 4 }) // Cần Thơ
    await this.writeToExcelFile(workbook, rowData, 'J')

    rowData = await this.getData('Urban')
    await this.writeToExcelFile(workbook, rowData, 'K')

    rowData = await this.getData({ provinceId: 7 }) // Nghệ An
    await this.writeToExcelFile(workbook, rowData, 'L')

    rowData = await this.getData({ provinceId: 9 }) // Thái Nguyên
    await this.writeToExcelFile(workbook, rowData, 'M')

    rowData = await this.getData({ provinceId: 23 }) // Bình Dương
    await this.writeToExcelFile(workbook, rowData, 'N')

    rowData = await this.getData({ provinceId: 21 }) // Bình Định
    await this.writeToExcelFile(workbook, rowData, 'O')

    rowData = await this.getData({ provinceId: 17 }) // Bắc Ninh
    await this.writeToExcelFile(workbook, rowData, 'P')

    rowData = await this.getData({ provinceId: 14 }) // Hưng Yên
    await this.writeToExcelFile(workbook, rowData, 'Q')

    rowData = await this.getData({ provinceId: 27 }) // Bến Tre
    await this.writeToExcelFile(workbook, rowData, 'R')

    rowData = await this.getData({ provinceId: 46 }) // Bạc Liêu
    await this.writeToExcelFile(workbook, rowData, 'S')

    rowData = await this.getData({ provinceId: 47 }) // Kiên Giang
    await this.writeToExcelFile(workbook, rowData, 'T')

    rowData = await this.getData({ provinceId: 31 }) // Vĩnh Long
    await this.writeToExcelFile(workbook, rowData, 'U')

    rowData = await this.getData({ provinceId: 24 }) // Đồng Nai
    await this.writeToExcelFile(workbook, rowData, 'V')

    rowData = await this.getData({ provinceId: 18 }) // Thừa Thiên Huế
    await this.writeToExcelFile(workbook, rowData, 'W')

    rowData = await this.getData({ provinceId: 20 }) // Đắk Lắk
    await this.writeToExcelFile(workbook, rowData, 'X')

    rowData = await this.getData({ provinceId: 11 }) // Hải Dương
    await this.writeToExcelFile(workbook, rowData, 'Y')

    rowData = await this.getData({ provinceId: 15 }) // Ninh Bình
    await this.writeToExcelFile(workbook, rowData, 'Z')

    rowData = await this.getData({ provinceId: 19 }) // Quảng Ngãi
    await this.writeToExcelFile(workbook, rowData, 'AA')

    rowData = await this.getData({ provinceId: 48 }) // Sóc Trăng
    await this.writeToExcelFile(workbook, rowData, 'AB')

    rowData = await this.getData({ provinceId: 29 }) // Trà Vinh
    await this.writeToExcelFile(workbook, rowData, 'AC')

    rowData = await this.getData({ provinceId: 16 }) // Vĩnh Phúc
    await this.writeToExcelFile(workbook, rowData, 'AD')

    rowData = await this.getData({ provinceId: 13 }) // Thái Bình
    await this.writeToExcelFile(workbook, rowData, 'AE')

    rowData = await this.getData('S1')
    await this.writeToExcelFile(workbook, rowData, 'AF')

    rowData = await this.getData('S2')
    await this.writeToExcelFile(workbook, rowData, 'AG')

    return this.outputPath
  }

  async writeToExcelFile(workbook, rowData, colIndex) {
    return new Promise((resolve, reject) => {
      let workbook = new Excel.Workbook()

      console.log(rowData)

      workbook.xlsx.readFile(this.outputPath).then((response) => {
        let worksheet = workbook.getWorksheet(1)
        let row

        row = worksheet.getRow(6)
        row.getCell(colIndex).value = rowData.TotalBase

        row = worksheet.getRow(7)
        row.getCell(colIndex).value = rowData.MissingData

        row = worksheet.getRow(8)
        row.getCell(colIndex).value = rowData.MissingMomName

        row = worksheet.getRow(9)
        row.getCell(colIndex).value = rowData.MissingAddress

        row = worksheet.getRow(10)
        row.getCell(colIndex).value = rowData.MissingPhone

        row = worksheet.getRow(11)
        row.getCell(colIndex).value = rowData.MissingDate

        row = worksheet.getRow(12)
        row.getCell(colIndex).value = rowData.MissingSampling

        row = worksheet.getRow(13)
        row.getCell(colIndex).value = rowData.DuplicatedPhone

        row = worksheet.getRow(14)
        row.getCell(colIndex).value = rowData.DuplicatedPhoneBetweenS1AndS2

        row = worksheet.getRow(15)
        row.getCell(colIndex).value = rowData.DuplicatedPhoneS1

        row = worksheet.getRow(16)
        row.getCell(colIndex).value = rowData.DuplicatedPhoneS2

        row = worksheet.getRow(17)
        row.getCell(colIndex).value = rowData.DuplicatedWithinPast2Years

        row = worksheet.getRow(18)
        row.getCell(colIndex).value = rowData.DuplicatedOverPast2Years

        row = worksheet.getRow(19)
        row.getCell(colIndex).value = rowData.DuplicatedWithSameYear

        row = worksheet.getRow(20)
        row.getCell(colIndex).value = rowData.DuplicatedWith2023

        row = worksheet.getRow(21)
        row.getCell(colIndex).value = rowData.DuplicatedWith2022

        row = worksheet.getRow(22)
        row.getCell(colIndex).value = rowData.DuplicatedWith2021

        row = worksheet.getRow(23)
        row.getCell(colIndex).value = rowData.DuplicatedWith2020

        row = worksheet.getRow(24)
        row.getCell(colIndex).value = rowData.DuplicatedWith2019

        row = worksheet.getRow(25)
        row.getCell(colIndex).value = rowData.IllogicalData

        row = worksheet.getRow(26)
        row.getCell(colIndex).value = rowData.IllogicalPhone

        row = worksheet.getRow(27)
        row.getCell(colIndex).value = rowData.IllogicalDate

        row = worksheet.getRow(28)
        row.getCell(colIndex).value = rowData.IllogicalOther

        row = worksheet.getRow(29)
        row.getCell(colIndex).value = rowData.TotalBase - rowData.HasError

        row = worksheet.getRow(30)
        row.getCell(colIndex).value = rowData.MissingEmail

        resolve(workbook.xlsx.writeFile(this.outputPath))
      })
    })
  }

  async getData(filterType) {
    const batch = this.batch
    const source = this.source

    // Get data from MySQL (Sequelize)
    let baseQuery =
      'SELECT COUNT(*) AS TotalBase, coalesce(SUM(hasError),0) AS HasError,\
      coalesce(SUM(missingData),0) AS MissingData,\
      coalesce(SUM(missingMomName),0) AS MissingMomName,\
      coalesce(SUM(missingAddress),0) AS MissingAddress,\
      coalesce(SUM(missingPhone),0) AS MissingPhone, \
      coalesce(SUM(missingEmail),0) AS MissingEmail, \
      coalesce(SUM(missingDate),0) As MissingDate, \
      coalesce(SUM(missingMomStatus),0) AS MissingMomStatus, \
      coalesce(SUM(missingSampling),0) AS MissingSampling, \
      coalesce(SUM(illogicalData),0) As IllogicalData, \
      coalesce(SUM(illogicalDate),0) As IllogicalDate, \
      coalesce(SUM(illogicalPhone),0) AS IllogicalPhone,\
      coalesce(SUM(illogicalOther),0) AS IllogicalOther,\
      coalesce(SUM(duplicatedPhone),0) As DuplicatedPhone, \
      coalesce(SUM(duplicatedPhoneBetweenS1AndS2),0) As DuplicatedPhoneBetweenS1AndS2, \
      coalesce(SUM(duplicatedPhoneS1),0) AS DuplicatedPhoneS1,\
      coalesce(SUM(duplicatedPhoneS2),0) AS DuplicatedPhoneS2,\
      coalesce(SUM(duplicatedWithinPast2Years),0) AS DuplicatedWithinPast2Years,\
      coalesce(SUM(duplicatedOverPast2Years),0) AS DuplicatedOverPast2Years,\
      coalesce(SUM(duplicatedWithSameYear),0) AS DuplicatedWithSameYear,\
      coalesce(SUM(duplicatedWith2023),0) AS DuplicatedWith2023,\
      coalesce(SUM(duplicatedWith2022),0) AS DuplicatedWith2022,\
      coalesce(SUM(duplicatedWith2021),0) AS DuplicatedWith2021,\
      coalesce(SUM(duplicatedWith2020),0) AS DuplicatedWith2020,\
      coalesce(SUM(duplicatedWith2019),0) AS DuplicatedWith2019 FROM customers'

    let whereCondition = ''
    let joinTable = ''
    let params = {}

    if (
      filterType === 'Key Urban 1' ||
      filterType === 'Key Urban 2' ||
      filterType === 'Urban'
    ) {
      joinTable =
        'JOIN hospitals ON customers.hospital_id = hospitals.hospital_id \
        JOIN provinces ON hospitals.province_id = provinces.province_id \
        JOIN areas ON provinces.area_id = areas.area_id'

      whereCondition = 'WHERE areas.channel = :channel'

      params = {
        channel: filterType
      }
    } else if (filterType === 'S1' || filterType === 'S2') {
      whereCondition = 'WHERE customers.sampling = :sampling'

      params = {
        sampling: filterType
      }
    } else if (filterType.areaId !== undefined && filterType.areaId !== null) {
      joinTable =
        'JOIN hospitals ON customers.hospital_id = hospitals.hospital_id \
        JOIN provinces ON hospitals.province_id = provinces.province_id'

      whereCondition = 'WHERE provinces.area_id = :areaId'

      params = {
        areaId: filterType.areaId
      }
    } else if (
      filterType.provinceId !== undefined &&
      filterType.provinceId !== null
    ) {
      joinTable =
        'JOIN hospitals ON customers.hospital_id = hospitals.hospital_id \
        JOIN provinces ON hospitals.province_id = provinces.province_id'

      whereCondition = 'WHERE provinces.province_id = :provinceId'

      params = {
        provinceId: filterType.provinceId
      }
    }

    if (batch !== '' && filterType !== 'All') {
      params = _.merge(params, {
        batch: batch
      })

      if (whereCondition === '') {
        whereCondition = 'WHERE customers.batch = :batch'
      } else {
        whereCondition += ' AND customers.batch = :batch'
      }
    }

    if (source == 'IMC' || source == 'OTB' || source == 'OTB-LHTS') {
      params = _.merge(params, {
        source: source
      })

      if (whereCondition === '') {
        whereCondition = 'WHERE customers.source = :source'
      } else {
        whereCondition += ' AND customers.source = :source'
      }
    }

    let query = baseQuery + ' ' + joinTable + ' ' + whereCondition + ';'

    let data = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
      replacements: params
    })

    return data[0]
  }
}

module.exports = exportDataService
