const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// DB config goes here
const dbURI = require('./config/keys').dbURI

mongoose
	.connect(dbURI, { useNewUrlParser: true })
	.then(() => console.log('Database connected successfully'))
	.catch(err => console.log('Something went wrong connecting DB', err))

const db = mongoose.connection

app.get('/preferences', (req, res) => {
	db.collection('preferences')
		.find({})
		.toArray((err, data) => {
			if (err) res.json({ success: false, error: err })
			res.json({ success: true, data: data })
		})
})

app.post('preferences', (req, res) => {
	requestBody = req.body
	requestBody.forEach(
		obj => {
			let category = {}
			category[obj.category] = obj.subCategories
			console.log(category)
			// let subCategories = obj.subCategories
			db.collection('preferences').update(
				{ _id: obj.id },
				{ $set: category },
				{ multi: true }
			)
		},
		() => res.send({ success: true })
	)
})

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Listening on port ${port}`))
