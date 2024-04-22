require('dotenv').config()

const config = {
	port: process.env.PORT,
	app_url: process.env.APP_URL,
	development: {
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		dialect: process.env.DB_DIALECT,
		dialectOptions: {
			bigNumberStrings: true,
		},
	},
	shopify: {
		api_version: process.env.SHOPIFY_API_VERSION,
		client_id: process.env.SHOPIFY_CLIENT_ID,
		client_secret: process.env.SHOPIFY_CLIENT_SECRET
	}
}

module.exports = config;