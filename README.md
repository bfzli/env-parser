# **Env Parser 🛠️**

Parse your variables into objects easily, or use it to build something greater with them. Below is a simple explanation of how to use it. It runs smoothly on both the client and the server without conflicts.

When you provide `envPath` (the path to your .env file) as a prop, the function is called on the server side. Alternatively, if you provide `envContent` (a copy-paste of your env files), it runs on either the client or the backend, depending on your environment.

<br />

## **How To Env Parser**

### **Importing the Env Parser**

```ts
import EnvParser from '@minilibs/env-parser'

// or

import { EnvParser } from '@minilibs/env-parser'
```

### **Using The Import**

```ts
// If you want to run it on the server side, provide envPath. For client-side usage, provide envContent, as files cannot be read directly from the client.

const { success, error variables } = await EnvParser({
    envContent: '...',
    envPath: '.env'
})


if (success) {
    // Prints the parsed variables; may be empty if none are found.
    console.log({ variables })
}

else {
    // If an error occurs, it will provide details to help diagnose the issue.
    console.error({ error })
}

```

### Fixing a Known Issue with Next.js

If you are running Next.js on the server and encountering a 'module not found' error after you installed `@minilibs/env-parser`, you can resolve this by adding the following code to your next.config.js file:

```js
const nextConfig = {
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.fallback = {
                fs: false,
                net: false,
                tls: false,
                request: false,
                readline: false,
                stream: false,
            }
        }

        return config
    }
}

module.exports = nextConfig
```