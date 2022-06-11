import * as core from '@actions/core'
import * as io from '@actions/io'
import * as tc from '@actions/tool-cache'

import {downloadURL} from './utils'

async function run(): Promise<void> {
    try {
        const version: string = core.getInput('version')
        core.debug(`version: ${version} `)

        const url: string = downloadURL(version)
        core.info(`Downloading clarity ${url}`)

        core.info('running')
        const downloadPath = await tc.downloadTool(url)

        core.info('Extracting clarity...')
        const extPath = await tc.extractZip(downloadPath)
        core.info(`Successfully extracted clarity to ${extPath}`)
        core.info('Adding to the cache ...')
        const cachedDir = await tc.cacheDir(extPath, 'clarity', version)
        core.info(`Successfully cached go to ${cachedDir}`)
        core.addPath(cachedDir)
        core.info('Added clarity to the path')

        const c = await io.which('clarity')
        if (!c) {
            core.setFailed('Internal, unable to find clarity on the path')
        }
    } catch (error) {
        if (error instanceof Error) core.setFailed(error.message)
    }
}

run()
