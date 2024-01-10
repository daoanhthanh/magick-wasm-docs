<template>
    <CodeSample
        code="image.crop(
  new MagickGeometry(
    this.x_cor,
    this.y_cor,
    this.croppedWidth,
    this.croppedHeight
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
    this.croppedHeight,
    this.croppedWidth,
    this.croppedHeight / 2,
    this.croppedWidth / 2
    );

    clone.draw(circle);

    // Composite the original image with the modified clone using 'DstIn' composition
    image.compositeGravity(clone, Gravity.Center, CompositeOperator.DstIn);
});

// Resize the final image to 300 pixels
image.resize(this.resizedWidth, this.resizedHeight);
"
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
    DrawableRoundRectangle,
    EvaluateOperator,
    Gravity,
    CompositeOperator,
    MagickGeometry,
} from "@imagemagick/magick-wasm";
import type { IMagickImage } from "@imagemagick/magick-wasm";
import CodeSample from "@/components/CodeSample.vue";
import { ref } from "vue";

const croppedWidth = ref<number>(2848);
const croppedHeight = ref<number>(2848);
const x_cor = ref<number>(560);
const y_cor = ref<number>(0);
const resizedWidth = ref<number>(300);
const resizedHeight = ref<number>(300);

const emit =
    defineEmits<
        (e: "showExample", func: (image: IMagickImage) => void) => void
    >();

function showExample(): void {
    emit("showExample", circularCrop);
}

function circularCrop(image: IMagickImage): void {
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
