const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');

(async () => {
  await imagemin(['public/images/**/*.{jpg,jpeg,png}'], {
    destination: 'public/images',
    plugins: [
      imageminMozjpeg({ quality: 50 }),
      imageminPngquant({
        quality: [0.5, 0.5]
      })
    ]
  });

  console.log('Images optimized');
})();
