<template>
    <div class="menu-item" @click="isOpen = !isOpen">
        <a href="#">
            {{ title }}
        </a>
        <transition name="fade" apear>
            <div class="sub-menu" v-if="isOpen">
                <div class="menu-item">
                    <router-link to="/services/web">Web</router-link>
                </div>
                <div class="menu-item">
                    <router-link to="/services/design">Design</router-link>
                </div>
                <div class="menu-item">
                    <router-link to="/services/videos">Videos</router-link>
                </div>
            </div>
        </transition>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { RouterLink } from "vue-router";

defineProps({
    title: String,
});

const isOpen = ref(false);
</script>

<style>
nav .menu-item svg {
    width: 10px;
    margin-left: 10px;
}
nav .menu-item .sub-menu {
    position: absolute;
    background-color: #222;
    top: calc(100% + 5px);
    left: 50%;
    transform: translateX(-50%);
    width: max-content;
    border-radius: 0px 0px 16px 16px;
}
.fade-enter-active,
.fade-leave-active {
    transition: all 0.5s ease-out;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}
.sub-menu {
    cursor: pointer;
}
</style>
