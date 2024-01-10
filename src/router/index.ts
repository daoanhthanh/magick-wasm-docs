import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: () => import("@/views/HomeView.vue"),
        },
        {
            path: "/classes/magick",
            component: () => import("@/views/classes/Magick/IndexView.vue"),
        },
        {
            path: "/classes/magick-image",
            redirect() {
                return { path: "/classes/magick-image/blur" };
            },
            component: () =>
                import("@/views/classes/MagickImage/IndexView.vue"),
            children: [
                {
                    path: "blur",
                    component: () =>
                        import("@/views/classes/MagickImage/BlurView.vue"),
                },
                {
                    path: "charcoal",
                    component: () =>
                        import("@/views/classes/MagickImage/CharcoalView.vue"),
                },
                {
                    path: "liquidRescale",
                    component: () =>
                        import(
                            "@/views/classes/MagickImage/LiquidRescaleView.vue"
                        ),
                },
                {
                    path: "rotate",
                    component: () =>
                        import("@/views/classes/MagickImage/RotateView.vue"),
                },
                {
                    path: "crop-advanced",
                    children: [
                        {
                            path: "circle",
                            component: () =>
                                import(
                                    "@/views/classes/MagickImage/crop/CropView.vue"
                                ),
                        },
                    ],
                    redirect: {
                        path: "/classes/magick-image/crop-advanced/circle",
                    },
                },
                {
                    path: "composite",
                    component: () =>
                        import("@/views/classes/MagickImage/CombineImage.vue"),
                },
            ],
        },
        {
            path: "/:pathMatch(.*)*",
            component: () => import("@/views/NotFoundView.vue"),
        },
    ],
});

export default router;
