<template>
  <footer class="footer">
    <div class="columns">
      <div class="column">

        <div class="level">
          <div class="level-item has-text-centered">
          </div>
        </div>

        <div class="level">
          <div class="level-item has-text-centered">
            <h4 class="title is-4">
              Made with
              &nbsp;
              &nbsp;
              <img class="footer-text-img" src="@/assets/logo.png">
              &nbsp;
              &nbsp;
              &nbsp;
              <!-- ,&nbsp; -->
              <img class="footer-text-img" src="@/assets/firebase-logo.png">
              &nbsp;
              &nbsp;
              &nbsp;
              <!-- , and &nbsp; -->
              <i class="mdi mdi-heart mdi-36px heart-beat"></i>
              &nbsp;
              &nbsp; by Matt O'Tousa
            </h4>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>

</script>

<style>
.heart-beat:before {
  color: #f44542;
  animation: heartbeat .4s infinite alternate;
  transform-origin: center;
  animation-timing-function: ease;
  text-shadow: 0 0 8px #ed8887;
  z-index: -1;
}

@keyframes heartbeat {
  to { transform: scale(1.3) }
}

.footer {
  flex: none;
}
.footer-text-img {
  max-width: 38px;
  max-height: 38px;
}
.firebase-logo {
  max-width: 38px;
  max-height: 40px;
}

</style>
