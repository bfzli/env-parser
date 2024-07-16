import type { EnvParserPropTypes, EnvParserReturnTypes } from '@/ts'
import { ClientEnvParser } from '@/lib'

export const EnvParser = async (props: EnvParserPropTypes): Promise<EnvParserReturnTypes> => {
    try {
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

            else if (envPath) {
                const isServer = typeof window === 'undefined'

                if (isServer) {
                    const { ServerEnvParser } = await import('@/lib')
                    return Promise.resolve(ServerEnvParser(props))
                }

                else return Promise.resolve({
                    success: false,
                    error: 'The envPath cannot be used in the browser!',
                    variables: {}
                })
            }

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

    catch (error) {
        return Promise.resolve({
            success: false,
            error: error as string,
            variables: {}
        })
    }
}

export default EnvParser