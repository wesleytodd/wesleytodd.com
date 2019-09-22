'use strict'
/* eslint-env browser */
const { LitElement, html, css } = require('es5-lit-element')

class WTPage extends LitElement {
  static get properties () {
    return {

    }
	}
	static get styles () {
		return css`
			:host {
				font-family:
					Consolas,
					"Andale Mono WT",
					"Andale Mono",
					"Lucida Console",
					"Lucida Sans Typewriter",
					"DejaVu Sans Mono",
					"Bitstream Vera Sans Mono",
					"Liberation Mono",
					"Nimbus Mono L",
					Monaco,
					"Courier New",
					Courier,
					monospace;
			}

			.logo {
				margin-top: .5rem;
				background: url(/static/images/logo.svg) no-repeat;
				background-size: 6rem;
				background-position: top center;
				text-align: center;
				padding: 4rem 0 0;
			}
			@media (min-width: 45rem) {
				.logo {
					background-size: contain;
					background-position: center left;
					padding: 0 0 0 6rem;
					text-align: left;
				}
			}

			main {
				overflow: hidden;
			}

			em {
				color: #e37c18;
				font-style: normal;
			}

			@media (min-width: 60rem) {
				aside {
					width: 24rem;
					float: right;
					margin-left: 3rem;
				}
			}

			aside img {
				max-width: 100%;
			}

			nav ul {
				margin-bottom: 2rem;
			}

			nav li {
				margin-bottom: .5rem;
			}

			a {
				color: #259ddc;
			}

			footer {
				margin: 3rem 0;
				padding-top: 1rem;
				border-top: .025rem solid #259ddc;
			}
		`
	}
  render () {
		return html`
			<header>
				<h1 class="logo">Wes Builds <em>JavaScript</em> Things</h1>
			</header>

			<main class="content">
				<aside>
					<h4>About Wes</h4>
					<p>I am passionate about buiding great things. You can find out about some of that here. I work <a href="https://twitter.com/wearenetflix">@Netflix</a>, formerly Director of Development at @StreamMe.</p>
					<img src="/static/images/wes.jpg" />
				</aside>

				<nav>
					<h3>Things I <em>work</em> on:</h3>
					<ul>
						<li><a target="_blank" href="https://expressjs.github.io/statusboard/">Express</a>: As a member of the TC, I help steward the project.</li>
						<li><a target="_blank" href="https://github.com/tj/node-migrate">Migrate</a>: A few years ago I took this over. I am working on a <a href="https://github.com/migratejs">new major version now</a>.</li>
						<li><a target="_blank" href="https://github.com/pkgjs">PkgJS</a>: A set of tools for JavaScript package authors and maintainers.</li>
						<li><a target="_blank" href="https://github.com/nodejs/package-maintenance/">Package Maintenance WG</a>: A Node.js working group to help package maintainers.</li>
						<li><a target="_blank" href="https://github.com/wesleytodd/nighthawk">Nighthawk</a>: Use the Express router in the browser.</li>
					</ul>

					<h3>Things I've <em>written</em>:</h3>
					<ul>
						<li><a target="_blank" href="https://dev.to/wesleytodd/state-of-express-2018-37oi">State of Express 2018</a></li>
						<li><a target="_blank" href="https://dev.to/wesleytodd/on-kissing-24ml">On KISSing</a></li>
					</ul>

					<h3>Where you can <em>find me</em>:</h3>
					<ul>
						<li><a target="_blank" href="https://github.com/wesleytodd">@wesleytodd</a> on GitHub</li>
						<li><a target="_blank" href="https://twitter.com/wesleytodd">@wesleytodd</a> on Twitter</li>
					</ul>
				</nav>
			</main>

			<footer>
				<small title="Designed, Developed &amp; Written by Wes Todd">Designed, Developed &amp; Written by Wes Todd</small>
			</footer>
    `
  }
}
customElements.define('wt-page', WTPage)
