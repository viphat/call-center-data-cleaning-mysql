const _ = require('lodash')
const Excel = require('exceljs')
const padStart = require('string.prototype.padstart')

const { generateCleanedDataTemplate } = require('./excelTemplateService')
const { createCustomer } = require('./createCustomerService')
const Customer = require('../models').Customer
const { writeExcelFile } = require('./writeExcelFileService')

const { sequelize } = require('../models/index')

const OUTPUT_PATH = './output/'

const importDataService = {
  importData: async (file, source, batch) => {
    const service = new ImportDataService(file, source, batch)
    const outputPath = await service.import()
    return outputPath
  }
}

class ImportDataService {
  constructor(file, source, batch) {
    this.file = file
    this.source = source
    this.batch = batch

    // Set Rows and Columns
    this.dataBeginRow = 2
    this.lastNameCol = 2

    this.emailCol = 4
    this.districtCol = 5
    this.provinceCol = 6

    this.s1Col = 11
    this.s2Col = 12

    if (source === 'OTB-LHTS') {
      this.firstNameCol = 2
      this.dayCol = 3
      this.monthCol = 4
      this.yearCol = 5
      this.phoneCol = 6
      this.collectedDayCol = 7
      this.collectedMonthCol = 8
      this.collectedYearCol = 9
      this.hospitalNameCol = 10
    } else {
      this.firstNameCol = 3
      this.phoneCol = 7
      this.dayCol = 8
      this.monthCol = 9
      this.yearCol = 10
      this.hospitalNameCol = 13
    }

    if (source === 'OTB') {
      this.collectedDateCol = 17
      this.staffCol = 18
      this.noteCol = 19
      this.pgCodeCol = 20
      this.qrCodeCol = 21
    } else if (source === 'IMC') {
      this.collectedDateCol = 19
      this.staffCol = 20
      this.noteCol = 21
      this.pgCodeCol = 22
      this.qrCodeCol = 23
    }
  }

  async import() {
    const workbook = new Excel.Workbook()
    await workbook.xlsx.readFile(this.file.path)
    const worksheet = workbook.getWorksheet(1)

    const outputPath = `${OUTPUT_PATH}${this.batch}_${this.source}_${Date.now()}_cleaned.xlsx`
    let outputWorkbook = await generateCleanedDataTemplate(outputPath)

    for (let i = this.dataBeginRow; i <= worksheet.rowCount; i++) {
      if (isEmptyRow(worksheet.getRow(i))) {
        break
      }

      outputWorkbook = await this.readEachRow(outputWorkbook, worksheet, i)

      if (i % 1000 === 0) {
        // Wait for 0.5 seconds
        await new Promise((resolve) => setTimeout(resolve, 500))
      }
    }

    await outputWorkbook.xlsx.writeFile(outputPath)

    return outputPath
  }

  async readEachRow(outputWorkbook, worksheet, rowNumber) {
    const row = worksheet.getRow(rowNumber)
    console.log('Row: ' + rowNumber)

    let source = this.source
    let batch = this.batch

    let hospitalName = row.getCell(this.hospitalNameCol).value
    hospitalName = hospitalName.trim().replace(/\s+/g, ' ')

    let collectedDate
    let collectedDay
    let collectedMonth
    let collectedYear

    if (source === 'OTB-LHTS') {
      collectedDay = row.getCell(this.collectedDayCol).value
      collectedMonth = row.getCell(this.collectedMonthCol).value
      collectedYear = row.getCell(this.collectedYearCol).value
    } else {
      collectedDate = row.getCell(this.collectedDateCol).value
      collectedDate = new Date(collectedDate)

      collectedDay = collectedDate.getDate()
      collectedMonth = collectedDate.getMonth() + 1
      collectedYear = collectedDate.getFullYear()
    }

    if (collectedYear == 1970) {
      throw new Error('Lỗi Ngày tháng ở dòng ' + rowNumber)
    }

    let lastName = row.getCell(this.lastNameCol).value
    if (source === 'OTB-LHTS') {
      lastName = ''
    }

    let email = row.getCell(this.emailCol).value
    if (source === 'OTB-LHTS') {
      email = ''
    }

    let district = row.getCell(this.districtCol).value
    if (source === 'OTB-LHTS') {
      district = ''
    }

    let province = row.getCell(this.provinceCol).value
    if (source === 'OTB-LHTS') {
      province = ''
    }

    const hospital = await this.getHospital(hospitalName)

    let customer = {
      lastName: lastName,
      firstName: row.getCell(this.firstNameCol).value,
      email: email,
      district: district,
      province: province,
      phone: row.getCell(this.phoneCol).value,
      day: row.getCell(this.dayCol).value,
      month: row.getCell(this.monthCol).value,
      year: row.getCell(this.yearCol).value,
      s1: row.getCell(this.s1Col).value,
      s2: row.getCell(this.s2Col).value,
      collectedDay: parseInt(collectedDay),
      collectedMonth: parseInt(collectedMonth),
      collectedYear: parseInt(collectedYear),
      staff: row.getCell(this.staffCol).value,
      note: row.getCell(this.noteCol).value,
      pgCode: parseInt(row.getCell(this.pgCodeCol).value),
      qrCode: row.getCell(this.qrCodeCol).value,
      hospital_id: hospital.hospital_id,
      batch: batch,
      source: source
    }

    if (row.getCell(this.s1Col).value === 'S1') {
      customer.sampling = 'S1'
    }

    if (row.getCell(this.s2Col).value === 'S2') {
      customer.sampling = 'S2'
    }

    customer = await createCustomer(customer)

    let duplicateData = customer.isPhoneDuplicated
    let missingData = this.isMissingData(customer, row)
    let illogicalData = this.isIllogicalData(customer, row)
    let duplicateDataWithAnotherAgency =
      customer.isPhoneDuplicatedWithAnotherAgency

    let rowData = [
      customer.customer_id,
      customer.lastName,
      customer.firstName,
      customer.email,
      customer.district,
      customer.province,
      row.getCell(this.phoneCol).value,
      customer.day,
      customer.month,
      customer.year,
      customer.s1,
      customer.s2,
      hospital.hospital_name,
      hospital.province_name,
      hospital.area_channel,
      hospital.area_name,
      customer.source,
      customer.collectedDay,
      customer.collectedMonth,
      customer.collectedYear,
      customer.staff,
      customer.note,
      customer.pgCode,
      customer.qrCode
    ]

    let outputSheetName = 'Valid'

    if (duplicateData === true) {
      if (customer.duplicatedWithinPast2Years === 1) {
        outputSheetName = 'Duplication - Within 24 Months'
      } else {
        outputSheetName = 'Duplication - Over 24 Months'
      }
    } else if (missingData || illogicalData) {
      outputSheetName = 'Invalid'
    } else if (duplicateDataWithAnotherAgency === true) {
      outputSheetName = 'Duplication With Another Agency'
    }

    if (duplicateData == true || missingData == true || illogicalData == true) {
      // Update Database
      customer.hasError = 1
      if (missingData) {
        customer.missingData = 1
      }
      if (illogicalData) {
        customer.illogicalData = 1
      }

      // 2024-02-26 - Not count as duplicated with another agency if it has been counted with other errors
      if (duplicateDataWithAnotherAgency == true) {
        customer.duplicateWithAnotherAgency = null
        customer.duplicatedWithAnotherAgency = 0
        customer.isPhoneDuplicatedWithAnotherAgency = false
        duplicateDataWithAnotherAgency = false
      }
    }

    await Customer.update(customer, {
      where: {
        customer_id: customer.customer_id
      }
    })

    var toHighlight = false
    var duplicatedRow = false

    if (duplicateData == true || duplicateDataWithAnotherAgency == true) {
      var duplicatedWith

      if (duplicateDataWithAnotherAgency) {
        duplicatedWith = customer.duplicateWithAnotherAgency
      } else {
        duplicatedWith = customer.duplicatedWith
      }

      duplicatedRow = [
        duplicatedWith.customer_id,
        duplicatedWith.last_name,
        duplicatedWith.first_name,
        duplicatedWith.email,
        duplicatedWith.district,
        duplicatedWith.province,
        duplicatedWith.phone,
        duplicatedWith.day,
        duplicatedWith.month,
        duplicatedWith.year,
        duplicatedWith.s1,
        duplicatedWith.s2,
        duplicatedWith.hospital_name,
        duplicatedWith.province_name,
        duplicatedWith.area_channel,
        duplicatedWith.area_name,
        duplicatedWith.source,
        duplicatedWith.collectedDay,
        duplicatedWith.collectedMonth,
        duplicatedWith.collectedYear,
        duplicatedWith.staff,
        duplicatedWith.note,
        duplicatedWith.pgCode,
        duplicatedWith.qrCode,
        duplicatedWith.batch
      ]

      if (
        duplicatedWith.batch == customer.batch &&
        duplicatedWith.source == customer.source
      ) {
        toHighlight = true
      }

      rowData.push(customer.batch)
    }

    if (duplicatedRow) {
      outputWorkbook = writeExcelFile(
        outputWorkbook,
        outputSheetName,
        duplicatedRow,
        toHighlight
      )
    }

    outputWorkbook = writeExcelFile(
      outputWorkbook,
      outputSheetName,
      rowData,
      toHighlight
    )

    return outputWorkbook
  }

  async getHospital(hospitalName) {
    let query =
      'SELECT hospitals.hospital_id, hospitals.name AS hospital_name, provinces.name AS province_name, areas.area_id AS area_id, areas.name As area_name, areas.channel as area_channel FROM hospitals LEFT JOIN matches ON hospitals.hospital_id = matches.hospital_id JOIN provinces ON hospitals.province_id = provinces.province_id JOIN areas ON provinces.area_id = areas.area_id WHERE hospitals.name = ? OR matches.name = ?;'

    const hospitals = await sequelize.query(query, {
      replacements: [hospitalName, hospitalName],
      type: sequelize.QueryTypes.SELECT
    })

    if (hospitals.length === 0) {
      throw new Error('Không tìm thấy bệnh viện ' + hospitalName)
    }

    return hospitals[0]
  }

  isIllogicalData(customer, row) {
    if (customer.isPhoneDuplicated === true) {
      return false
    }

    let phone = row.getCell(this.phoneCol).value
    let lastName = row.getCell(this.lastNameCol).value
    let firstName = row.getCell(this.firstNameCol).value
    let email = row.getCell(this.emailCol).value
    let province = row.getCell(this.provinceCol).value
    let day = row.getCell(this.dayCol).value
    let month = row.getCell(this.monthCol).value
    let year = row.getCell(this.yearCol).value

    let sampling = ''
    let flag = false
    if (row.getCell(this.s1Col).value === 'S1') {
      sampling = 'S1'
    }

    if (row.getCell(this.s2Col).value === 'S2') {
      sampling = 'S2'
    }

    if (
      row.getCell(this.s1Col).value === 'S1' &&
      row.getCell(this.s2Col).value === 'S2'
    ) {
      customer.illogicalSampling = 1
      flag = true
    }

    if (phone !== undefined && phone !== null) {
      phone = '' + phone.replace(/[\.\-\_\s\+\(\)]/g, '')
      if (isNaN(parseInt(phone))) {
        customer.illogicalPhone = 1
        flag = true
      } else {
        if (phone.length !== 10) {
          customer.illogicalPhone = 1
          flag = true
        }
      }
    }

    if (
      lastName !== undefined &&
      lastName !== null &&
      firstName &&
      customer.source !== 'OTB-Chatbot' &&
      customer.source !== 'OTB-LHTS'
    ) {
      let fullName = '' + firstName + lastName
      if (!isNaN(parseInt(fullName)) || hasSpecialCharacter(fullName)) {
        // If is a Number
        customer.illogicalName = 1
        flag = true
      }
    }

    if (email !== undefined && email !== null && email !== '') {
      email = '' + email
      email = email.trim()
      if (validateEmail(email) == false) {
        customer.illogicalEmail = 1
      }
    }

    if (
      province !== undefined &&
      province !== null &&
      customer.source !== 'OTB-Chatbot' &&
      customer.source !== 'OTB-LHTS'
    ) {
      province = '' + province
      province = province.trim().replace(/\s+/g, ' ')
      if (
        !isNaN(province) ||
        (province.length > 0 && hasSpecialCharacter(province))
      ) {
        customer.illogicalAddress = 1
        flag = true
      }
    }

    if (
      customer.illogicalName == 1 ||
      customer.illogicalAddress == 1 ||
      customer.illogicalSampling == 1
    ) {
      customer.illogicalOther = 1
      flag = true
    }

    let date = year + '-' + padStart(month, 2, 0) + '-' + padStart(day, 2, 0)
    date = new Date(date)

    if (date !== null && date !== undefined) {
      let day, month, year

      day = customer.day
      month = customer.month
      year = customer.year

      if (date.toString() === 'Invalid Date') {
        customer.illogicalDate = 1
        flag = true
      } else {
        if (parseInt(month) == 2 && parseInt(day) > 29) {
          customer.illogicalDate = 1
          flag = true
        }

        if (
          (parseInt(month) == 4 ||
            parseInt(month) == 6 ||
            parseInt(month) == 9 ||
            parseInt(month) == 11) &&
          parseInt(day) > 30
        ) {
          customer.illogicalDate = 1
          flag = true
        }

        var today = new Date()
        var next9Months = today.setMonth(today.getMonth() + 9)
        var currentYear = today.getFullYear()

        if (
          date.getFullYear() < currentYear - 1 ||
          date.getFullYear() > currentYear + 1
        ) {
          customer.illogicalDate = 1
          flag = true
        }

        if (sampling == 'S2' && date >= today) {
          // Ngày sinh của em bé không được lớn hơn hoặc bằng ngày import
          customer.illogicalDate = 1
          flag = true
        } else {
          if (date > next9Months) {
            customer.illogicalDate = 1
            flag = true
          }
        }
      }
    }

    return flag
  }

  isMissingData(customer, row) {
    if (customer.isPhoneDuplicated === true) {
      return false
    }

    // Kiểm tra thiếu thông tin
    let missingFields = []

    if (
      (row.getCell(this.firstNameCol).value === null ||
        row.getCell(this.firstNameCol).value === '') &&
      customer.source !== 'OTB-Chatbot'
    ) {
      missingFields.push('Tên')
      customer.missingFirstName = 1
      customer.missingMomName = 1
    }

    if (
      (row.getCell(this.firstNameCol).value === null ||
        row.getCell(this.firstNameCol).value === '') &&
      (row.getCell(this.lastNameCol).value === null ||
        row.getCell(this.lastNameCol).value === '') &&
      customer.source === 'OTB-Chatbot' &&
      customer.source !== 'OTB-LHTS'
    ) {
      missingFields.push('Tên')
      customer.missingFirstName = 1
      customer.missingMomName = 1
    }

    if (
      (row.getCell(this.emailCol).value === null ||
        row.getCell(this.emailCol).value == '') &&
      customer.source !== 'OTB-Chatbot' &&
      customer.source !== 'OTB-LHTS'
    ) {
      customer.missingEmail = 1
    }

    if (
      (row.getCell(this.districtCol).value === null ||
        row.getCell(this.districtCol).value.length == 0) &&
      customer.source !== 'OTB-Chatbot' &&
      customer.source !== 'OTB-LHTS'
    ) {
      missingFields.push('Quận/Huyện')
      customer.missingDistrict = 1
      customer.missingAddress = 1
    }

    if (
      (row.getCell(this.provinceCol).value === null ||
        row.getCell(this.provinceCol).value.length == 0) &&
      customer.source !== 'OTB-Chatbot' &&
      customer.source !== 'OTB-LHTS'
    ) {
      missingFields.push('Tỉnh/Thành')
      customer.missingProvince = 1
      customer.missingAddress = customer.missingAddress || 1
    }

    if (row.getCell(this.phoneCol).value === null) {
      missingFields.push('Điện Thoại')
      customer.missingPhone = 1
    }

    if (
      customer.source !== 'OTB-LHTS' &&
      row.getCell(this.s1Col).value !== 'S1' &&
      row.getCell(this.s2Col).value !== 'S2'
    ) {
      missingFields.push('Đối tượng đặt mẫu')
      customer.missingSampling = 1
      customer.missingMomStatus = 1
    }

    if (
      row.getCell(this.dayCol).value === null ||
      row.getCell(this.monthCol).value === null ||
      row.getCell(this.yearCol).value === null
    ) {
      customer.missingDate = 1
      customer.missingMomStatus = 1
      missingFields.push('Ngày dự sinh/Ngày sinh')
    }

    if (missingFields.length > 0) {
      return true
    }

    return false
  }
}

const isEmptyRow = (row) => {
  if (
    row.getCell(1).value === null &&
    row.getCell(2).value === null &&
    row.getCell(3).value === null &&
    row.getCell(4).value === null &&
    row.getCell(5).value === null &&
    row.getCell(6).value === null &&
    row.getCell(7).value === null &&
    row.getCell(8).value === null &&
    row.getCell(9).value === null
  ) {
    // Empty Row
    return true
  }
  return false
}

function validateEmail(email) {
  let re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

function hasSpecialCharacter(string) {
  var re = /[!@#$%^&*_+=\[\]{};:"\\|<>\/?]/
  return re.test(string)
}

module.exports = importDataService
