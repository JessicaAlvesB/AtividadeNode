const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

app.set('view engine', 'njk')
app.use(express.urlencoded({ extended: false }))

const checkAgeQueryParam = (req, res, next) => {
  const { age } = req.query

  if (!age) {
    return res.redirect('/')
  }

  return next()
}

app.get('/', (req, res) => {
  return res.render('formulario')
})

app.get('/maior', checkAgeQueryParam, (req, res) => {
  const { age } = req.query

  return res.render('maior', { age })
})

app.get('/menor', checkAgeQueryParam, (req, res) => {
  const { age } = req.query

  return res.render('menor', { age })
})

app.post('/check', (req, res) => {
  const { age } = req.body

  if (age >= 18) {
    return res.redirect(`/maior?age=${age}`)
  } else {
    return res.redirect(`/menor?age=${age}`)
  }
})

app.listen(3000)
