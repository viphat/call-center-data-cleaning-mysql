const { exec } = require('child_process')

// Restore MySQL database via MySqlDump
// Read the Database Configuration from the config/config.json file
const config = require('../config/config.json')
const database = config.development
const backupPath = './backup/'

// Read the Filename from the command line
const filename = process.argv[2]

// Delete the Existing Database first and Create a new one
const createDatabase = `mysql -h db -u ${database.username} -p${database.password} -e "DROP DATABASE IF EXISTS ${database.database}; CREATE DATABASE ${database.database};"`

exec(createDatabase, (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`)
    return
  }
  console.log(`stdout: ${stdout}`)
  console.error(`stderr: ${stderr}`)
  console.log(`Database ${database.database} created`)
})

// Restore the Database from the Backup file
const restoreDatabase = `mysql -h db -u ${database.username} -p${database.password} ${database.database} < ${backupPath}${filename}`

exec(restoreDatabase, (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`)
    return
  }
  console.log(`stdout: ${stdout}`)
  console.error(`stderr: ${stderr}`)

  console.log(`Database ${database.database} restored from ${filename}`)
})
