const { upload } = require('./importDataController')
const { importMatches } = require('../services/importMatchesService')

const importMatchesController = {
  importData(req, res) {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).send(err)
      }

      if (req.file == undefined) {
        return res.status(400).send('Error: No File Selected!')
      }

      try {
        await importMatches(req.file)
      } catch (error) {
        return res.status(500).send('Import Dữ Liệu Bệnh Viện thất bại!')
      }

      return res.status(200).send('Import Dữ Liệu Bệnh Viện thành công!')
    })
  }
}

module.exports = {
  importMatchesController
}
