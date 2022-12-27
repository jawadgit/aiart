import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";
dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.Open_AI_Key,
});
const openai = new OpenAIApi(configuration);
const response = await openai.createImage({
  prompt: "A cute baby cat",
  response_format: "url",
  n: 2,
  size: "1024x1024",
});

console.log("response", response.data);
console.log("response.data.data[0].url", response.data.data[0].url);

let imageUrl = response.data.data[0].url;
// async function download(imageUrl) {
//   const response = await fetch(imageUrl);
//   const buffer = await response.buffer();
//   fs.writeFile(`./image.jpg`, buffer, () =>
//     console.log("finished downloading!")
//   );
// }

// download(imageUrl);

// import { Configuration, OpenAIApi } from "openai";

// const configuration = new Configuration({
//   apiKey: "sess-zFnpE4xXasyydS34JiI2U91TQgYhDhza9t6Tace9", // "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",
// });

// const openai = new OpenAIApi(configuration);

// const response = await openai.createImage({
//   prompt: "a white cat",
//   n: 1,
//   size: "512x512",
// });
// //image_url = response.data.data[0].url;
// //console.log("image_url", response);
// // import { Dalle } from "node-dalle2";

// // //const getDalle2Images = async (caption) => {
// // export async function getDalle2Images(caption) {
// //   //export async function getDalle2Images(caption) {
// //   // Add Session key
// //   const dalle = new Dalle({
// //     apiKey: "sess-zFnpE4xXasyydS34JiI2U91TQgYhDhza9t6Tace9",
// //   });

// //   // Call the Dall-e 2 API
// //   const response = await dalle.generate(caption);

// //   // If Dall-e 2 couldn't generate images from the given caption
// //   if (!response) {
// //     console.error(
// //       "The AI couldn't generate images based upon the given caption."
// //     );
// //     return null;
// //   }

// //   // Get the image array from the response object
// //   const { data } = response;

// //   // Return the image array
// //   return data;
// // }

// // // Using top level await
// // const data = await getDalle2Images(
// //   "Man in a suit riding a horse during the medieval times"
// // );

// // // If the image array is empty for some reason
// // if (!data) {
// //   console.error("Something has gone horribly wrong...");
// // }

// // // Log the image array
// // console.log(data);

// // // // Add Session key
// // // const dalle = new Dalle({
// // //   apiKey: "sess-zFnpE4xXasyydS34JiI2U91TQgYhDhza9t6Tace9",
// // // });

// // // // Create an async function
// // // const getDalle2Images = async (caption) => {
// // //   // Call the Dall-e 2 API
// // //   const response = await dalle.generate(caption);

// // //   // If Dall-e 2 couldn't generate images from the given caption
// // //   if (!response) {
// // //     console.error(
// // //       "Dall-e 2 couldn't generate images based upon the given caption."
// // //     );
// // //     return null;
// // //   }

// // //   // Get the image array from the response object
// // //   const { data } = response;

// // //   // Return the image array
// // //   return data;
// // // };

// // // // Using top level await
// // // const data = await getDalle2Images(
// // //   "Man in a suit riding a horse during the medieval times"
// // // );

// // // // If the image array is empty for some reason
// // // if (!data) {
// // //   console.error("Something has gone horribly wrong...");
// // // }

// // // // Log the image array
// // // console.log(data);
