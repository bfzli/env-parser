import type { EnvParserPropTypes, EnvParserReturnTypes } from '@/ts'

const ClientEnvParser = (props: EnvParserPropTypes): EnvParserReturnTypes => {
    const { envContent } = props

    if (envContent) {
        const lines = envContent.split('\n')
        const variables: Record<string, string> = {}

        for (const l of lines) {
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

    return {
        success: true,
        error: false,
        variables: {}
    }
}

export default ClientEnvParser