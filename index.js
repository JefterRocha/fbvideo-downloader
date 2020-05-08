(function () {
    const modalFBDownload = document.createElement('div'),
        modalContent = document.createElement('div'),
        modalHeader = document.createElement('div'),
        modalBody = document.createElement('div'),
        closeButton = document.createElement('button'),
        closeSpan = document.createElement('span'),
        modalTitle = document.createElement('h2'),
        videoSources = document.createElement('ul'),
        styles = document.createElement('style')

    modalFBDownload.className = 'modal-fb-download'
    modalContent.className = 'modal-content'
    modalBody.className = 'modal-body'
    modalHeader.className = 'modal-header'
    closeButton.className = 'close'
    closeSpan.innerHTML = '×'
    modalTitle.innerText = 'sources for the current video.'
    videoSources.className = 'video-sources'
    styles.innerText = require('./styles.scss')

    closeButton.append(closeSpan)
    modalHeader.append(closeButton)
    modalContent.append(modalHeader)

    modalBody.append(modalTitle)

    const scripts = [...document.querySelectorAll('script')]
    const videoScript = scripts.find(s => s.outerHTML.includes('d_src'))

    function getVideoLinksInMetaTags() {
        const videosMetaTags = [...document.querySelectorAll('meta[content*=\\.mp4]')]
        /* const qualities = ['sd_src_no_ratelimit', 'hd_src_no_ratelimit', 'sd_src', 'hd_src'] */
        const videoSources = videosMetaTags.map(({ content }) => content)
        return [...new Set(videoSources)].map(src => {
            /* const [quality, , rateLimit] = qualities[index].split('_') */
            return { quality: 'sd', rateLimit: true, src }
        })
    }

    function getVideoLinksInScriptTags() {
        const scriptRaw = videoScript.outerHTML.replace(/amp|\\{1,}/g, '')
        const start = scriptRaw.indexOf('indicator_config')
        const end = scriptRaw.indexOf('hd_tag')
        const rawSection = scriptRaw.slice(start, end)
        const pattern = /[sh]d_src.*?:"(.*?)"/g
        return rawSection.match(pattern).map(resource => {
            const [videoInfo, src] = resource.replace(/"$/g, '').split(/:"/)
            const [quality, , rateLimit] = videoInfo.split('_')
            return { quality, rateLimit: Boolean(rateLimit), src }
        })
    }

    const videosResources = videoScript ? getVideoLinksInScriptTags() : getVideoLinksInMetaTags()

    function closeModal() {
        document.body.removeChild(document.querySelector('.modal-fb-download'))
    }

    closeButton.addEventListener('click', closeModal)

    videosResources.forEach(resource => {
        const listItem = document.createElement('li'),
            listItemLink = document.createElement('a')
        listItemLink.href = resource.src
        listItemLink.target = '_blank'
        listItemLink.innerText = `${resource.quality} source`
        listItem.append(listItemLink)
        videoSources.append(listItem)
    })
    modalBody.append(videoSources)
    modalContent.append(modalBody)
    modalFBDownload.append(styles)
    modalFBDownload.append(modalContent)
    document.body.append(modalFBDownload)
})()