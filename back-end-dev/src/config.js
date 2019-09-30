/* eslint-disable max-len */

module.exports = {
  // Node.js app
  port: process.env.BED_PORT || 3004,
  host: process.env.BED_HOST || 'http://localhost:3004',
  gatewayHost:
    process.env.API_GATEWAY_HOST ||
    `http://localhost:${process.env.BED_PORT || 3004}`,
  websocketPort: process.env.WEBSOCKET_PORT || 3003,

  frontEndServer: process.env.FED_HOST || 'http://localhost:3004',

  ethereumNodeAPI: process.env.ETH_HOST || 'http://localhost:4040',
  bitcoinNodeAPI: process.env.BTC_HOST || 'http://localhost:5050',

  platformName: process.env.PLATFORM_NAME || 'FERDOSI',

  // Database
  // databaseUrl:
  //   process.env.DATABASE_URL ||
  //   `mysql://${process.env.DB_USER || 'root'}:${process.env.DB_PASS ||
  //     ''}@${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT ||
  //     '3306'}/${process.env.DB_NAME || 'ferdosi'}`,

  databaseUrl: `mysql://admin:123456@localhost:3306/ferdosi`,

  initializeDB: false,
  alterDB: false, // eslint-disable-line
  sequelizeLogging: false,
  // initializePriceTables: false,
  // initializeBotUsers: false,
  // giveReward: false,
  // rewardInvoCount: 0,
  // usdEquivalentOfReward: 25,
  // usdEquivalentOfRewardForRefferedUser: 25,
  // giveReferralReward: true,
  // maxNumberOfReferralReward: 20,
  // rewardLockEndDate: '2019-09-01 00:00:00',

  // upload image size limit
  imageMaxSize: 1024 * 1024 * 20,

  // time that user stays in blacklist
  blacklistTime: 60 * 60,

  // number of failed attempts before getting blacklisted
  maxFailedAttempt: 3,

  // // number of wallets in WalletAddress model for each token
  // numberOfWallets: 2000,

  // environment
  environment: process.env.ENVIRONMENT || 'development',

  // ssl credentials
  sslPrivateKeyPath:
    process.env.SSL_PRIVATE_KEY_PATH || '/etc/ssl/private/nydax.com.pem',
  sslCertificatePath:
    process.env.SSL_CERTIFICATE_PATH || '/etc/ssl/certs/nydax.com.crt',

  // Email service
  nodemailer: {
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    user: 'ferdosi.info@gmail.com',
    pass: 'qweQWE123!@#',
  },

  // Authentication
  auth: {
    jwt: {
      secret: 'ferdosi secret',
      expiration: 24 * 60 * 60,
    },
  },

  // google recaptcha configs
  recaptcha: {
    secretKey: '6LfxfooUAAAAAMpZ4UmmzKhWXwFA7aEJXAfls_nX',
  },

  // // Payment api keys
  // paymentApiKeys: {
  //   stripe: {
  //     apiKey: 'pk_live_k7vSwmJljQsragVTG4iemS2p',
  //     secretKey: 'sk_live_PP5rPuTLNd0IkeQTvQt67hZk',
  //   },
  // },
};
