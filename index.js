// Show projects cards
const moreProjectsBtn = document.getElementById('more-projects')
const hiddenProjects = document.querySelectorAll('#card-hidden')

const haveHiddenCards = hiddenProjects.length === 0 ? false : true

if(haveHiddenCards) {
    moreProjectsBtn.style = 'visibility: visible'
}

moreProjectsBtn.onclick = () => {
    for (let hiddenProject of hiddenProjects) {
        hiddenProject.classList.remove('card-hidden')
        moreProjectsBtn.style = 'visibility: hidden'
    }
}

// Menu button - Mobile
const menu = document.getElementById('menu-mobile')
const navigation = document.querySelector('.header nav')
menu.onclick = () => {
    navigation.classList.toggle('move-menu')
    menu.classList.toggle('menu-active')
}

// Navigation by anchor links
const anchorsLink = document.querySelectorAll('#anchorLink')

for (let anchorLink of anchorsLink) {
    anchorLink.onclick = (e) => {
        const anchorWord = anchorLink.href.split('#')[1]
        const contentID = document.getElementById(anchorWord)

        e.preventDefault()
        navigation.classList.remove('move-menu')
        menu.classList.remove('menu-active')
        contentID?.scrollIntoView({ behavior: 'smooth' })
    }
}