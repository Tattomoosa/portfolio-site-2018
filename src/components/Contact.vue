<template>
  <div class="level">
    <div class="level-item full-screen-element">
      <div class="has-text-centered">
      <div class="box contact-box">
          <br/>
          <h1 class="title is-3">Get In Touch</h1>
          <br/>
          <p class="is-size-5">
            Have a question for me? &nbsp; Want to work together?
          </p>
          <br/>
          <a href="mailto:matt@mattotousa.com">
            <button class="button is-medium">
              <b-icon icon="email" size="is-medium" />
              <span>
                Email Me
              </span>
            </button>
          </a>
          <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <a href="https://firebasestorage.googleapis.com/v0/b/vue-blog-2e5c5.appspot.com/o/matt%2Fdocuments%2FMatt%20O%E2%80%99Tousa's%20Resume.pdf?alt=media&token=6f7ac555-ba90-46e5-99c8-776937254403">
            <button class="button is-expanded is-medium">
              <b-icon icon="file-document" size="is-medium" />
              <span>
                My Resume
              </span>
            </button>
          </a>
          <br/>
          <br/>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'Contact'
}
</script>

<style>
.contact-box {
  width: 550px;
  max-width: 100%;
}
.full-screen-element {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
}
</style>
