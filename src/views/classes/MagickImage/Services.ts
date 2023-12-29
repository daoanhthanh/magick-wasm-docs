// import type {IMagickImage} from "@imagemagick/magick-wasm";
// import {
//     AlphaOption,
//     Channels,
//     CompositeOperator,
//     DrawableRoundRectangle,
//     EvaluateOperator,
//     Gravity,
//     MagickGeometry,
// } from "@imagemagick/magick-wasm";
//
// const circularCrop = (image: IMagickImage, x: number, y: number, radius: number) => {
//   const { width, height } = image.size();
//   const mask = new MagickImage({ width, height }, 'transparent');
//   mask.drawCircle(x, y, x + radius, y + radius);
//   image.composite(mask, 'DstInCompositeOp');
// }
