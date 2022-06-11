import {downloadURL} from '../src/utils'
import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'
import * as tc from '@actions/tool-cache'
import {expect, test} from '@jest/globals'

const cachePath = path.join(__dirname, 'CACHE')
const tempPath = path.join(__dirname, 'TEMP')
process.env['RUNNER_TEMP'] = tempPath
process.env['RUNNER_TOOL_CACHE'] = cachePath

test('download URL', async () => {
    const url = downloadURL('0.0')
    expect(url).toContain('https://downloads.clarity.st/release/0.0/clarity')
})

test('test download', async () => {
    const url =
        'https://downloads.clarity.st/release/0.0/clarity_darwin_arm64.zip'
    const downloadPath = await tc.downloadTool(url)
    const extPath = await tc.extractZip(downloadPath)
    const cachedDir = await tc.cacheDir(extPath, 'clarity', '0.0')
})

// shows how the runner will run a javascript action with env / stdout protocol
test('test runs', () => {
    process.env['INPUT_VERSION'] = '0.0'
    const np = process.execPath
    const ip = path.join(__dirname, '..', 'lib', 'main.js')
    const options: cp.ExecFileSyncOptions = {
        env: process.env,
        stdio: 'pipe'
    }
    console.log(cp.execFileSync(np, [ip], options).toString())
})
