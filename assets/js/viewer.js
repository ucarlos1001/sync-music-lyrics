const syncListElement = document.getElementById('sync-list')
const viewerElement = document.getElementById('viewer-lyrics')

if (syncLocal.length > 0) {

    syncLocal.map(item => {

        for (let prop in musicsLocal) {

            if (musicsLocal[prop].directory == item.directory) {

                syncListElement.innerHTML +=
                `<div class="music" data-directory="${musicsLocal[prop].directory}">
                    <div class="details">
                        <h3>${musicsLocal[prop].name}</h3>
                        <p>${musicsLocal[prop].author}</p>
                    </div>
                    <span>${time.converter(Math.floor(item.time))}</span>
                </div>`
                
            }
        }
    })

} else {
    syncListElement.innerHTML = `
    <div class="no-sync">
        <img src="assets/images/logo.png">
        <h3>Nenhuma Música Sincronizada foi encontrada!</h3>
        <p>Clique no botão para criar uma Sincronização de música e letra.</p>
    </div>`
}

const musicElements = syncListElement.querySelectorAll('.music')

musicElements.forEach(music => {
    music.addEventListener('click', () => {
        const dataDirectory = music.getAttribute('data-directory')

        for (let prop in musicsLocal) {
            if (musicsLocal[prop].directory == dataDirectory) {
                viewerElement.style.display = 'block'

                document.title = `${musicsLocal[prop].name} | ${musicsLocal[prop].author}`

                source.src = 'musics/' + musicsLocal[prop].directory
                audio.load()
                audio.currentTime = 0
                audio.play()

                for (let prop in musicElements) {
                    if (musicElements[prop] == music) {

                        let current = 0
                        let lyrics = syncLocal[prop].fullSync
                        const syncActionElement = document.getElementById('sync-action')
        
                        let timerLyrics = setInterval(() => {
                            if (time.converter(Math.floor(audio.currentTime)) == time.converter(Math.floor(lyrics[current].time))) {
                                syncActionElement.innerHTML = `<span class="current">${lyrics[current].line}</span>`
                                current++
                            }
        
                        }, 100);

                        break
                    }
                }

                break
            }
        }

    })
})


viewerElement.querySelector('.control-play').addEventListener('click', event => {
    console.log(event)
    if (!controlsLocal.play) {
        audio.play()
        controlsLocal.play = true
    } else {
        audio.pause()
        controlsLocal.play = false
    }

    setLocal('controls', JSON.stringify(controlsLocal))
})
viewerElement.querySelector('.control-delete').addEventListener('click', () => {

})

viewerElement.querySelector('.control-close').addEventListener('click', () => {

})