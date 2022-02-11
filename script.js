const firePixelsArray = []
let fireWidth = 50
let fireHeight = 40
const fireColorsPalette = [{"r":7,"g":7,"b":7},{"r":31,"g":7,"b":7},{"r":47,"g":15,"b":7},{"r":71,"g":15,"b":7},{"r":87,"g":23,"b":7},{"r":103,"g":31,"b":7},{"r":119,"g":31,"b":7},{"r":143,"g":39,"b":7},{"r":159,"g":47,"b":7},{"r":175,"g":63,"b":7},{"r":191,"g":71,"b":7},{"r":199,"g":71,"b":7},{"r":223,"g":79,"b":7},{"r":223,"g":87,"b":7},{"r":223,"g":87,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":103,"b":15},{"r":207,"g":111,"b":15},{"r":207,"g":119,"b":15},{"r":207,"g":127,"b":15},{"r":207,"g":135,"b":23},{"r":199,"g":135,"b":23},{"r":199,"g":143,"b":23},{"r":199,"g":151,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":167,"b":39},{"r":191,"g":167,"b":39},{"r":191,"g":175,"b":47},{"r":183,"g":175,"b":47},{"r":183,"g":183,"b":47},{"r":183,"g":183,"b":55},{"r":207,"g":207,"b":111},{"r":223,"g":223,"b":159},{"r":239,"g":239,"b":199},{"r":255,"g":255,"b":255}];
let debug = false

function start(){
    createFireDataStruture()
    createFireSource()
    renderFire()

    setInterval(calculateFirePropagation, 50)
}
function createFireDataStruture(){
    const number0fPixels = fireWidth * fireHeight

    for (let i = 0; i < number0fPixels; i++){
        firePixelsArray.push(0)
    }
}
function calculateFirePropagation(){
    for (let column = 0; column < fireWidth; column++){
        for (let row = 0; row < fireHeight; row++){
            const pixelIndex = column + (row * fireWidth)

            updateFireIntensity(pixelIndex)
        }
    }
    renderFire()
}
function updateFireIntensity(currentPixel){
    const belowPixelIndex = (currentPixel + fireWidth)

    if(belowPixelIndex >= fireHeight * fireWidth){
        return
    }
    
    const decay = Math.floor(Math.random() * 3)
    const belowPixelFireIntensity = firePixelsArray[belowPixelIndex]
    const newFireIntensity = (belowPixelFireIntensity - decay) >= 0 ? (belowPixelFireIntensity - decay) : 0

    firePixelsArray[currentPixel - decay] = newFireIntensity
}
function renderFire(){
    let html = '<table cellpadding=0 cellspacing=0>'

    for (let row = 0; row < fireHeight; row++){
        html += '<tr>'
            for (let column = 0; column < fireWidth; column++){
                const pixelIndex = column + (row * fireWidth)
                const fireIntensity = firePixelsArray[pixelIndex]

                const color = fireColorsPalette[fireIntensity]
                const colorString = `rgb(${color.r},${color.g},${color.b})`
                
                if(debug){
                    html += `<td>`
                    html += `<div class="pixel-index">${pixelIndex}</div>`
                    html += `<div style="color:${colorString}">${fireIntensity}</div>`
                    html += '</td>'
                }else{

                    html += `<td class='pixel' style='background-color:${colorString}'>`
                    html += '</td>'
                }

            }
        html += '</tr>'
    }

    html +=  '</table>'

    document.querySelector('#fireCanvas').innerHTML = html
}
function createFireSource(){
    for(let column = 0; column < fireWidth; column++){
        const pixelBase = fireHeight * fireWidth
        const pixelBaseIndex = (pixelBase - fireWidth) + column
        
        firePixelsArray[pixelBaseIndex] = 36
    }
}

function resetFireSource(){
    for(let column = 0; column < fireWidth; column++){
        const pixelBase = fireHeight * fireWidth
        const pixelBaseIndex = (pixelBase - fireWidth) + column
        
        firePixelsArray[pixelBaseIndex] = 0
    }
}
function lowerFire(){

    for(let column = 0; column < fireWidth; column++){
        const pixelBase = fireHeight * fireWidth
        const pixelBaseIndex = (pixelBase - fireWidth) + column
        const currentFireIntensity = firePixelsArray[pixelBaseIndex] 
        
        if(currentFireIntensity < 0){
            return
        }
        const decay = Math.floor(Math.random() * 14)
        const newFireIntensity = currentFireIntensity - decay >= 0 ? currentFireIntensity - decay : 0
        firePixelsArray[pixelBaseIndex] = newFireIntensity
    }
}
function upperFire(){
    for(let column = 0; column < fireWidth; column++){
        const pixelBase = fireHeight * fireWidth
        const pixelBaseIndex = (pixelBase - fireWidth) + column
        const currentFireIntensity = firePixelsArray[pixelBaseIndex]
        
        if(currentFireIntensity > 36){
            return
        }
        const increase = Math.floor(Math.random() * 14)
        const newFireIntensity = currentFireIntensity + increase <= 36 ? currentFireIntensity + increase: 36 
        firePixelsArray[pixelBaseIndex] = newFireIntensity
    }
}
function toggleDebugMode(){
    if(debug === false){
        fireWidth = 25
        fireHeight = 17
        debug = true
    }else{
       fireHeight = 40
       fireWidth = 50
       debug = false
    }

    createFireDataStruture()
    createFireSource()
}

start()
