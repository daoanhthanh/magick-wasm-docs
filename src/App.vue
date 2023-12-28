<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";

</script>

<template>
    <header>
        <div class="wrapper">
            <nav id="vue">
                <a
                    href="https://github.com/dlemstra/magick-wasm"
                    target="_blank"
                    ><img alt="Github logo" src="./assets/github.svg"
                /></a>
                <div class="menu-item">
                    <router-link to="/">Home</router-link>
                </div>
                <div class="menu-item">
                    <router-link to="/classes/magick">Magick</router-link>
                </div>
                <div class="menu-item">
                    <router-link to="/classes/magick-image"
                        >Playground</router-link
                    >
                </div>
                <Services title="Services" />
            </nav>
        </div>
    </header>

    <RouterView />
</template>

<style>
@font-face {
    font-family: "Hack";
    src: url("./assets/fonts/Hack-Regular.ttf") format("truetype");
}

body {
    font-family: "Hack", monospace;
    margin: 0;
    padding: 0 0 60px 0;
}

button {
    cursor: pointer;
    font-family: "Hack", monospace;
    font-weight: bold;
    border-radius: 2em;
    border-color: black;
    color: pink;
    background-color: black;
    text-align: center;
    display: inline-block;
    padding: 0.5em 1em;
    margin: 0 1em 1em 0;
}
button:hover {
    color: pink;
    background-color: black;
}
.arguments {
    margin-top: 10px;
}
.arguments label {
    display: inline-block;
    width: 80px;
}
.arguments input {
    width: 50px;
    margin-bottom: 10px;
}
.arguments .multiselect {
    display: inline-block;
    width: 400px;
    margin-bottom: 10px;
}

nav {
    width: 100vw;
    background-color: #0d0d0e;
    display: flex;
    align-items: center;
    justify-content: center;
}
nav .menu-item {
    color: #fff;
    padding: 25px 40px;
    position: relative;
    text-align: center;
    border-bottom: 5px solid transparent;
    display: flex;
    transition: 0.4s;
}
nav .menu-item.active,
nav .menu-item:hover {
    background-color: #0d0d0e;
    border-bottom-color: #bb3030;
}
nav .menu-item a {
    color: inherit;
    text-decoration: none;
}

.column {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
}

.row {
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;
}
</style>
