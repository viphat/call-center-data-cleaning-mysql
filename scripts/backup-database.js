const { exec } = require('child_process')

// Backup MySQL database via MySqlDump
// Read the Database Configuration from the config/config.json file
const config = require('../config/config.json')
const database = config.development
const backupPath = './backup/'

const backupDatabase = () => {
  const backupFileName = `${database.database}_${new Date().toISOString()}.sql`
  const backupFile = `${backupPath}${backupFileName}`

  const command = `mysqldump -h db -u ${database.username} -p${database.password} ${database.database} > ${backupFile}`
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`)
      return
    }
    console.log(`stdout: ${stdout}`)
    console.error(`stderr: ${stderr}`)

    console.log(`Database backup completed: ${backupFile}`)
  })
}

backupDatabase()
