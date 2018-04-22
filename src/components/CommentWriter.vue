<template>
  <div class="box">
    <!-- <textarea -->
    <!-- class="textarea box" -->
    <!-- placeholder="What do you think?"/> -->
  <!--
    <textarea
    type="textarea"
    class="comment-textarea"
    placeholder="What do you think?"
    resizable="false" />
    <div class="level">
      <div class="level-left"></div>
      <div class="level-right">
        <button class="button is-success">Submit Comment</button>
      </div>
    </div>
    -->
      <div class="level">
        <div class="level-left"></div>
          <textarea
          type="textarea"
          class="comment-textarea"
          placeholder="What do you think?"
          resizable="false" />
        <div class="level-right comment-textarea">
          <button disabled class="button is-outlined comment-textarea">Submit</button>
        </div>
    </div>
  </div>
</template>
<script>
</script>

<style type="css">
textarea.comment-textarea {
  width: 100%;
  height: 80px;
  max-height: 100% !important;
  font-family: monospace;
  font-size: .75em;
  box-sizing: border-box;
  resize: none;
  background-color: #fafafa !important;
  border: 1px solid #b5b5b5;
  padding: 1rem;
  z-index: 1;
}
button.comment-textarea {
  height: 80px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-left: none;
}
</style>
