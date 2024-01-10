<template>
    <br /><br /><br />
    <button v-on:click="showExample">Execute</button>
</template>

<script setup lang="ts">
import $ from "jquery";
import { ImageMagick, type IMagickImage } from "@imagemagick/magick-wasm";

import {
    AlphaOption,
    Channels,
    CompositeOperator,
    DrawableRoundRectangle,
    EvaluateOperator,
    Gravity,
    MagickGeometry,
} from "@imagemagick/magick-wasm";
import { ref, onMounted } from "vue";

const croppedWidth = ref<number>(2848);
const croppedHeight = ref<number>(2848);
const x_cor = ref<number>(560);
const y_cor = ref<number>(0);
const resizedWidth = ref<number>(300);
const resizedHeight = ref<number>(300);

const imageSettings = [
    {
        
    }
];

const emit =
    defineEmits<
        (e: "showExample", func: (image: IMagickImage) => void) => void
    >();

function showExample(): void {
    emit("showExample", combineImages);
}

async function fetchImages(): Promise<IMagickImage[]> {
    const images = Array.from(
        { length: 6 },
        (_, i) => `/images/img${i + 1}.jpeg`
    );

    const promises = images.map((image) =>
        fetch(image)
            .then((res) => res.arrayBuffer())
            .then((buffer) => new Uint8Array(buffer))
            .then((byteArray) => ImageMagick.read(byteArray, (i) => i))
    );

    return Promise.all(promises);
}

function combineImages(image: IMagickImage): void {
    image.crop(
        new MagickGeometry(
            x_cor.value,
            y_cor.value,
            croppedWidth.value,
            croppedHeight.value
        )
    );

    image.autoOrient();

    // Enable alpha channel
    image.alpha(AlphaOption.On);

    // Create a clone of the image for further processing
    image.clone((clone) => {
        // Set the alpha channel of the clone to 0
        clone.evaluate(Channels.Alpha, EvaluateOperator.Multiply, 0);

        // Fill the clone with white color outside the circular area
        const circle = new DrawableRoundRectangle(
            0,
            0,
            croppedHeight.value,
            croppedWidth.value,
            croppedHeight.value / 2,
            croppedWidth.value / 2
        );

        clone.draw(circle);

        // Composite the original image with the modified clone using 'DstIn' composition
        image.compositeGravity(clone, Gravity.Center, CompositeOperator.DstIn);
    });

    // Resize the final image to 300 pixels
    image.resize(resizedWidth.value, resizedHeight.value);
}

onMounted(() => {
    $("#load-custom-img").trigger("click");
});
</script>

<style scoped>
li {
    list-style-type: none;
    margin-bottom: 12px;
}
</style>
