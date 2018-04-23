<template>

  <div class="column is-one-third is-hidden-touch">
    <div class="columns is-centered">

      <div class="column">

        <br/><br/>

      <div class="spacer"></div>
        <div class="full-width side-bar">
          <div class="level has-text-centered">
            <div class="level-item">
              <!-- <img class="image is-profile" src="http://placekitten.com/128/128" /> -->
              <img class="is-profile box" src="http://placekitten.com/128/128" />
            </div>
          </div>

          <div class="level">
            <div class="level-item">
              <div class="is-item has-text-centered">
                <h1 class="title">Matt O'Tousa</h1>
                <span class="subtitle">Front End Developer</span>
              </div>
            </div>
          </div>

          <div class="box full-width">
            <h4 class="title is-6">This Post</h4>
            <h4 class="title is-6">Related</h4>
          </div>

        </div>
      </div>

    </div>
  </div>

</template>

<script>

</script>

<style type="css">
.spacer {
  height: 60px;
}
.is-profile {
  border-radius: 50%;
  padding: .8rem;
}
.side-bar {
}
.full-width {
  width: 100%;
}
@media screen and (min-width: 1023px) {
  .side-bar {
    position: fixed;
    max-width: 300px;
  }
}
</style>
