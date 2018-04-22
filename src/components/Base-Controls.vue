<template>
  <b-dropdown class="post-controls">

    <button
    class="button"
    slot="trigger">
    <b-icon icon="dots-vertical"/>
    </button>

    <b-dropdown-item>
      <delete-post :post="post" v-if="isActiveUser"></delete-post>
    </b-dropdown-item>

  </b-dropdown>
</template>
