export default function downloadImage(image, imageName = '', format) {
    const a = document.createElement('a')

    a.href = image.src;
    a.setAttribute('download', `${imageName}.${format}`)
    a.click()
}