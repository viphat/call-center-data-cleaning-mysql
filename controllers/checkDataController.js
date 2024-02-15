const { upload } = require('./importDataController')
const { checkMissingHospitals } = require('../services/checkDataService')

const checkDataController = {
  checkData: (req, res) => {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).send(err)
      }

      const source = req.body.source

      if (source == undefined) {
        return res.status(400).send('Error: Source is undefined!')
      }

      if (req.file == undefined) {
        return res.status(400).send('Error: No File Selected!')
      }

      const outputPath = await checkMissingHospitals(req.file, source)

      if (outputPath === null) {
        res.set('Content-Type', 'text/plain')

        return res.status(200).send('All hospitals are found!')
      }

      // send file to browser (download)
      res.set(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      )

      const filename = outputPath.split('/').pop()

      res.download(outputPath, filename, (err) => {
        if (err) {
          return res
            .status(500)
            .send('Error: Could not download the file. ' + err)
        }
      })
    })
  }
}

module.exports = {
  checkDataController
}
