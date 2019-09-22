'use strict'
/* eslint-disable */
/* eslint-env browser */
require('regenerator-runtime/runtime')
const { html } = require('es5-lit-element')
const { render } = require('es5-lit-html')
const Router = require('nighthawk')
const queryParser = require('querystring').parse

require('./components/page')
const MOUNT_NODE = document.getElementById('app')

function renderPage (content) {
  render(html`
    <wt-page>
      ${content}
    </wt-page>
  `, MOUNT_NODE)
}

Router({ queryParser })

  // Handle when serer 404 page redirects
  .use((req, res, next) => req.query.__path ? res.redirect(req.query.__path) : next())

  // Home page
  .get('/', (req, res) => renderPage())

  // Posts
  // .get('/posts/:post', (req, res) => renderPage(html`
  //   <wt-post>
  //     <h1>${req.params.post}</h1>
  //   </wt-post>
  // `))

  // 404 page
  .use(() => renderPage(html`<p>404</p>`))

  // Start listening for route changes
  .listen()
