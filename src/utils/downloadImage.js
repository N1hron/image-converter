export default function downloadImage(image, imageName = '') {
    const a = document.createElement('a')

    a.href = image.src; console.log(image)
    a.setAttribute('download', imageName.replace('.', ''))
    a.click()
}