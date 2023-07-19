const qrcode = require('qrcode-terminal')
const { Client, LocalAuth } = require('whatsapp-web.js')

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')

const argv = yargs(hideBin(process.argv)).argv
const toWaNumber = (numStr) => `972${numStr.substring(1)}@c.us`

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    hea,
  },
})

const number = `${argv.number}`
if (!number) throw new Error('must provide number')
console.log(`Starting for number: ${number}`)

const waNumber = toWaNumber(number)
console.log(`WhatsApp number: ${waNumber}`)

client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true })
})

client.on('ready', () => {
  console.log('Client Ready')
  let sendMessage = true
  setInterval(async () => {
    const date = new Date()
    const hour = date.getHours()
    const minute = date.getMinutes()
    if (minute % 2 == 0) {
      // if (hour === minute) {
      if (sendMessage) {
        try {
          const message = `${hour}${hour}`
          await client.sendMessage(waNumber, message)
          console.log(
            `Sent message ${message} to number ${number} at ${date.toLocaleTimeString()}`
          )
        } catch (e) {
          console.error('Failed to send message', e)
        }
      }
      sendMessage = false
    } else {
      sendMessage = true
    }
  }, 1000)
})

client.initialize()
