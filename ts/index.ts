export type EnvFile = { 
    envPath: string
    envContent?: never 
}

export type EnvContent = { 
    envPath?: never
    envContent: string 
}

export type EnvParserPropTypes = EnvFile | EnvContent

export type EnvParserReturnTypes = {
    success: boolean
    error: string | false
    variables: Record<string, string>
} 