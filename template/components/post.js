'use strict'
/* eslint-env browser */
const { LitElement, html } = require('es5-lit-element')

class Post extends LitElement {
  static get properties () {
    return {
      post: { type: Array }
    }
	}
  render () {
    return html`
			<header id="content-header">
				<small class="date">${this.post.month}.${this.post.day}.${this.post.year}</small>
				<h1>${this.post.title}</h1>
			</header>
			<section class="section">
				<slot></slot>
			</section>
    `
  }
}
customElements.define('wt-post', Post)
