import type { EnvParserPropTypes, EnvParserReturnTypes } from '@/ts'

import { createReadStream } from 'fs'
import { createInterface } from 'readline'
import { Readable as readable } from 'stream'

const ServerEnvParser = async (props: EnvParserPropTypes): Promise<EnvParserReturnTypes> => {
    const { envContent, envPath } = props

    try {
        let lines: AsyncIterableIterator<string> | null = null
        const variables: Record<string, string> = {}

        if (envContent && window === undefined) {
            const stream = readable.from(envContent)

            const rl = createInterface({
                input: stream,
                crlfDelay: Infinity
            })

            lines = rl[Symbol.asyncIterator]()
        }

        if (envPath) {
            const fileStream = createReadStream('.env', {
                encoding: 'utf8'
            })
            
            const rl = createInterface({
                input: fileStream,
                crlfDelay: Infinity
            })

            lines = rl[Symbol.asyncIterator]()
        }

        if (lines) {
            for await (const l of lines) {
                const line = l.trim()
            
                if (line && line.includes('=') && !line.startsWith('#')) {
                    const equalSplits = line.split('=')
            
                    if (equalSplits.length >= 2) {
                        const [k, v, ...rest] = equalSplits
            
                        const key = k?.trim()
                        let value = v?.replace(/\\n/g, '\n')?.trim()
                        
                        if (rest && rest.length > 0) value = value + rest.map(r => '=' + r).join('=')
                        if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, value.length - 1)
                        if (key && value) variables[key] = value
                    }
                }
            } 

            return {
                success: true,
                error: false,
                variables
            }
        }  

        else return {
            success: false,
            error: 'The envContent or envPath must be provided!',
            variables: {}
        }
    }

    catch (error) {
        return {
            success: false,
            error: error as string,
            variables: {}
        }
    }
}

export default ServerEnvParser