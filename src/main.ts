import {createApp} from "vue";
import {initializeImageMagick, Magick} from "@imagemagick/magick-wasm";
import App from "./App.vue";
import router from "./router";
// import "vue-material/dist/vue-material.min.css";

const wasmLocation = new URL(
    "@imagemagick/magick-wasm/magick.wasm",
    import.meta.url
);
initializeImageMagick(wasmLocation).then(() => {
    const fontLocation = new URL(
        "./assets/fonts/Hack-Regular.ttf",
        import.meta.url
    ).href;
    fetch(fontLocation).then((response) => {
        response.arrayBuffer().then((buffer) => {
            const font = new Uint8Array(buffer);
            Magick.addFont("Hack", font);
            createApp(App).use(router)
                .mount("#app");
        });
    });
});
