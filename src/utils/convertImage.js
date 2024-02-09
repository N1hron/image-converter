export default async function getConvertedImage(imageFile, format, background) {
    const image = new Image(),
          url = window.URL.createObjectURL(imageFile)

    const canvas = document.createElement('canvas'),
          ctx = canvas.getContext('2d')

    const convertedImage = await loadImage(image, url).then(() => {
        canvas.width = image.width
        canvas.height = image.height

        if (format === 'jpeg') {
            ctx.fillStyle = background === 'dark' ? '#000000' : '#FFFFFF'
            ctx.fillRect(0, 0, canvas.width, canvas.height)
        }

        ctx.drawImage(image, 0, 0)

        const dataUrl = canvas.toDataURL(`image/${format}`)
        image.src = dataUrl

        return image
    })

    return convertedImage
}

async function loadImage(image, src) {
    image.src = src

    return new Promise(resolve => {
        image.addEventListener('load', () => resolve(image), { once: true })
    })
}