<template>
  <div class="wrapper">
    <main>
      <nuxt/>
    </main>
    <footer>
      <p>新元号予想サイト
        <router-link to="/">トップページ</router-link>
        <router-link to="/search">予想を探す</router-link>
      </p>
      <p>
        作成者：
        <a href="https://twitter.com/uhyo_" target="_blank">@uhyo_</a> /
        <a href="https://github.com/uhyo/gengou-yosou" target="_blank">GitHub</a>
      </p>
      <p>このサイトはフィクションであり、実在の人物・組織・年号とは関係ありません。</p>
    </footer>
  </div>
</template>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.wrapper {
  min-height: 100vh;
  display: flex;
  flex-flow: column nowrap;
}
.wrapper > main {
  flex: auto 1 0;
}
.wrapper > footer {
  flex: auto 0 0;
  background-color: #eeeeee;
  color: #666666;
  font-size: small;
}
.wrapper > footer p {
  margin: 0.2em;
}
.wrapper > footer a {
  color: #444444;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--blue {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #303b80;
  color: #303b80;
  text-decoration: none;
  padding: 10px 30px;
}

.button--blue:hover {
  color: #fff;
  background-color: #303b80;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}

.container {
  max-width: 640px;
  text-align: center;
  margin: 12px auto;
  padding: 0 6px;
}

.links {
  padding-top: 15px;
}
.page-section {
  margin: 1em 0;
}

h1.page-title {
  font-size: 1.5em;
}
h2.page-section {
  font-size: 1.1em;
}
</style>
