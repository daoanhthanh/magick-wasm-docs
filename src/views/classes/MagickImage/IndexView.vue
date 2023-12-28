<script setup lang="ts">
import ImageCanvas from "@/components/ImageCanvas.vue";
import {ImageMagick, type IMagickImage} from "@imagemagick/magick-wasm";
import {ref} from "vue";
import {useRouter} from "vue-router";

const canvas = ref<typeof ImageCanvas>();

const router = useRouter();

const currentPath = ref<string>(router.currentRoute.value.path);

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

const changeRoute = (event: Event) => {
    const target = event.target as HTMLSelectElement;
    const path = target.value;
    router.push(path);
};

const routes = [
    {
        path: "/classes/magick-image/blur",
        name: "Blur",
    },
    {
        path: "/classes/magick-image/charcoal",
        name: "Charcoal",
    },
    {
        path: "/classes/magick-image/liquidRescale",
        name: "Liquid Rescale",
    },
    {
        path: "/classes/magick-image/rotate",
        name: "Rotate",
    },
    {
        path: "/classes/magick-image/crop-advanced",
        name: "Crop",
    }
];

</script>

<template>
    <h1>MagickImage</h1>

    <div class="container">
        <div>

            <label for="operators">Choose operator:&nbsp</label>

            <select name="operators" v-on:change="changeRoute" v-model="currentPath">
                <option v-for="route in routes" :key="route.path" :value="route.path">
                    {{ route.name }}
                </option>
            </select>
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
