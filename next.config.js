const nextEnv = require('next-env')
const dotenvLoad = require('dotenv-load')

// load env vars
dotenvLoad()
const withEnv = nextEnv()

module.exports = {
  ...withEnv(),
  reactStrictMode: true,
  webpack: (config) => {
    // Unset client-side javascript that only works server-side
    config.resolve.fallback = { fs: false, module: false }

    return config
  },
  images: {
    domains: ['i.redd.it'],
  },
}
