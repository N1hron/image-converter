export default function downloadImage(image, imageName = '') {
    const a = document.createElement('a')

    a.href = image.src
    a.setAttribute('download', imageName)
    a.click()
}