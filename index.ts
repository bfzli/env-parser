import type { EnvParserPropTypes, EnvParserReturnTypes } from '@/ts'
import { ClientEnvParser, ServerEnvParser } from '@/lib'

export const EnvParser = (props: EnvParserPropTypes): Promise<EnvParserReturnTypes> => {
    const { envContent, envPath } = props

    if (envContent !== undefined && envPath !== undefined) return Promise.resolve({
        success: false,
        error: 'The envContent and envPath cannot be used together!',
        variables: {}
    })

    if (envContent) {
        if (typeof envContent !== 'string') return Promise.resolve({
            success: false,
            error: 'The envContent must be a string!',
            variables: {}
        })

        else if (envContent === '') return Promise.resolve({
            success: false,
            error: 'The envContent must not be empty!',
            variables: {}
        })

        else if (envContent) return Promise.resolve(ClientEnvParser(props))

        else return Promise.resolve({
            success: false,
            error: 'The envContent must be provided!',
            variables: {}
        })
    }

    if (envPath) {
        if (typeof envPath !== 'string') return Promise.resolve({
            success: false,
            error: 'The envPath must be a string!',
            variables: {}
        })
    
        else if (envPath === '') return Promise.resolve({
            success: false,
            error: 'The envPath must not be empty!',
            variables: {}
        })

        else if (envPath) return ServerEnvParser(props)

        else return Promise.resolve({
            success: false,
            error: 'The envPath must be provided!',
            variables: {}
        })
    }

    else return Promise.resolve({
        success: false,
        error: 'The envContent or envPath must be provided!',
        variables: {}
    })
}

export default EnvParser