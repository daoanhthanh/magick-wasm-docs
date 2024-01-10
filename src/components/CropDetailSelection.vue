<template>
    <div>
        <label for="operators">Choose shape:&nbsp;</label>

        <select name="operators" v-on:change="navigate" v-model="supOperator">
            <option
                v-for="cropOption in cropOptions"
                :key="cropOption.path"
                :value="cropOption.path"
            >
                {{ cropOption.name }}
            </option>
        </select>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const cropOptions = [
    {
        name: "Circle",
        path: "/circle",
    },
    {
        name: "Rectangle",
        path: "/rectangle",
    },
    {
        name: "Semicircle",
        path: "/semicircle",
    },
];

const prop = defineProps({
    cropSuperPath: {
        type: String,
        required: true,
    },
});

const navigate = (event: Event) => {
    const target = event.target as HTMLSelectElement;
    const path = prop.cropSuperPath + target.value;
    router.push(path);
};

const supOperator = ref<string | undefined>(
    router.currentRoute.value.path.split("/").pop()
);
</script>

