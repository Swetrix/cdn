require('dotenv').config()

const isNewRelicEnabled = Boolean(process.env.USE_NEW_RELIC)

const ACCESS_TOKEN = process.env.ACCESS_TOKEN

export {
  ACCESS_TOKEN,
  isNewRelicEnabled,
}
