<script setup lang="ts">
import ImageCanvas from "@/components/ImageCanvas.vue";
import { ImageMagick, type IMagickImage } from "@imagemagick/magick-wasm";
import { ref } from "vue";

const canvas = ref<typeof ImageCanvas>();

const routes = [
    {
        url: "/classes/magick-image/blur",
        operator: "Blur",
    },
    {
        url: "/classes/magick-image/charcoal",
        operator: "Charcoal",
    },
    {
        url: "/classes/magick-image/liquidRescale",
        operator: "Liquid Rescale",
    },
    {
        url: "/classes/magick-image/rotate",
        operator: "Rotate",
    },
];

const load = (image: string): void => {
    ImageMagick.read(image, (image) => canvas.value?.write(image));
};

async function loadDefault(): Promise<void> {
    const filePath = "/default_load.jpeg";
    const file = await fetch(filePath);

    const fileBuffer = await file.arrayBuffer();

    const byteArray = new Uint8Array(fileBuffer);

    ImageMagick.read(byteArray, (image) => {
        canvas.value?.write(image);
    });
}

const showExample = (func: (image: IMagickImage) => void) => {
    canvas.value?.read((image: IMagickImage) => {
        func(image);
        canvas.value?.write(image);
    });
};
</script>

<template>
    <h1>MagickImage</h1>

    <div class="container">
        <div>
            <RouterLink to="/classes/magick-image/blur">blur</RouterLink> |
            <RouterLink to="/classes/magick-image/charcoal"
                >charcoal</RouterLink
            >
            |
            <RouterLink to="/classes/magick-image/liquidRescale"
                >liquidRescale</RouterLink
            >
            |
            <RouterLink to="/classes/magick-image/rotate">rotate</RouterLink> |
            <RouterLink to="/classes/magick-image/crop-advanced"
                >Crop</RouterLink
            >
            <RouterView @showExample="showExample" />
        </div>
        <div>
            <div class="buttons">
                <button v-on:click="load('logo:')">Load logo</button>
                <button v-on:click="load('wizard:')">Load wizard</button>
                <button v-on:click="loadDefault()">Load Custom Image</button>
            </div>
            <ImageCanvas ref="canvas" />
        </div>
    </div>
</template>

<style scoped>
.container {
    display: flex;
}

.container div {
    padding: 0 1em 0 1em;
    flex: 0 1 50%;
}

.container .buttons {
    padding: 1em 0 1em 0;
}
</style>
