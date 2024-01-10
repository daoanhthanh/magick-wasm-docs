<template>
    <CodeSample
        code="image.crop(
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
    const rectangle = new DrawableRectangle(
        0,
        0,
        croppedWidth.value,
        croppedHeight.value
    );

    clone.draw(rectangle);

    // Composite the original image with the modified clone using 'DstIn' composition
    image.compositeGravity(clone, Gravity.Center, CompositeOperator.DstIn);
});

image.resize(resizedWidth.value, resizedHeight.value);"
    />

    <ul class="argument">
        <li>
            <label class="tab">Width:</label
            ><input type="number" v-model="croppedWidth" />
        </li>
        <li>
            <label class="tab">Height:</label
            ><input type="number" v-model="croppedHeight" />
        </li>
        <li>
            <label class="tab">Crop X coord:</label
            ><input type="number" v-model="x_cor" />
        </li>
        <li>
            <label class="tab">Crop Y coord:</label>
            <input type="number" v-model="y_cor" />
        </li>
        <li>
            <label class="tab">Width after resized:</label
            ><input type="number" v-model="resizedWidth" />
        </li>
        <li>
            <label class="tab">Height after resized:</label>
            <input type="number" v-model="resizedHeight" />
        </li>
    </ul>

    <button :onclick="showExample">Execute</button>
</template>

<script setup lang="ts">
import {
    AlphaOption,
    Channels,
    EvaluateOperator,
    Gravity,
    CompositeOperator,
    MagickGeometry,
    DrawableRectangle,
} from "@imagemagick/magick-wasm";
import type { IMagickImage } from "@imagemagick/magick-wasm";
import CodeSample from "@/components/CodeSample.vue";
import { ref } from "vue";

const croppedWidth = ref<number>(1678);
const croppedHeight = ref<number>(1678);
const x_cor = ref<number>(516);
const y_cor = ref<number>(516);
const resizedWidth = ref<number>(815);
const resizedHeight = ref<number>(815);

const emit =
    defineEmits<
        (e: "showExample", func: (image: IMagickImage) => void) => void
    >();

function showExample(): void {
    emit("showExample", diamondCrop);
}

function diamondCrop(image: IMagickImage): void {
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
        const rectangle = new DrawableRectangle(
            0,
            0,
            croppedWidth.value,
            croppedHeight.value
        );

        clone.draw(rectangle);

        // Composite the original image with the modified clone using 'DstIn' composition
        image.compositeGravity(clone, Gravity.Center, CompositeOperator.DstIn);
    });

    image.resize(resizedWidth.value, resizedHeight.value);
}
</script>

<style scoped>
li {
    list-style-type: none;
    margin-bottom: 12px;
}

.tab {
    display: inline-block;
    width: 150px;
}
</style>
