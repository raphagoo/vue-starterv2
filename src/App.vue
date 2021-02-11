<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
// @import '~normalize.css';
// @import '~reset-css/_reset.scss';
* {
    box-sizing: border-box;
}
.loader{
    display: flex;
    height: 100vh;
    align-items: center;
    justify-content: center;
}

@keyframes arrows {
    0%,
    100% {
        color: black;
        transform: translateY(0);
    }
    50% {
        color: #3AB493;
        transform: translateY(20px);
    }
}

span {
    --delay: 0s;
    animation: arrows 1s var(--delay) infinite ease-in;
}
</style>
