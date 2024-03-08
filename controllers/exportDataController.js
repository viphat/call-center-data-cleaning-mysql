const { generateReport } = require('../services/exportDataService')

const exportDataController = {
  exportData: async (req, res) => {
    const batch = req.body.batch
    const source = req.body.source

    if (batch == undefined || batch == null || batch == '') {
      return res.status(400).send('Error: Chưa khai báo batch!')
    }

    if (source == undefined || source == null || source == '') {
      return res.status(400).send('Error: Chưa khai báo source!')
    }

    const outputPath = await generateReport(batch, source)
    console.log('outputPath', outputPath)

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
  }
}

module.exports = { exportDataController }
