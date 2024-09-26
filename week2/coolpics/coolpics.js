function manageMenu(){
    const links = document.querySelectorAll('.link');
    if (window.innerWidth > 599){
        links.forEach(element => {
            if (element.classList.contains('unhide')){
                element.classList.remove('unhide');
                element.classList.add('hide')
            }else{
                element.classList.add('unhide');
                element.classList.remove('hide')
            }
        });
    }else{
        links.forEach(element => {
            if (element.classList.contains('unhide')){
                element.classList.remove('unhide');
                element.classList.add('hide')
            }else{
                element.classList.add('unhide');
                element.classList.remove('hide')
            }
        });
    }
}

function handleResize(){
    const menu = document.querySelectorAll('.link');
    menu.forEach(element => {
        if (window.innerWidth > 1000){
            element.classList.remove('hide');
        }else if(!element.classList.contains('hide')){
            element.classList.add('hide');
        }
    });
}

function manageImageViewer(event){
    const img = event.target;
    if (img.tagName.toLowerCase() === 'button'){
        const div = img.closest('div');
        div.classList.add('hide');
        div.classList.add('no_display')
    }else{
        const viewer = document.querySelector('.viewer');
        const viewer_img = viewer.querySelector('img');
        viewer_img.src = img.src.split('-').slice(0, -1).join('-') + '-full.jpeg';
        viewer.classList.remove('hide');
    }
}

const menu = document.querySelector('#menu');
menu.addEventListener('click', manageMenu);

window.addEventListener('resize', handleResize)

const img = document.querySelectorAll('main img');
img.forEach(element => {
    element.addEventListener('click', manageImageViewer)
});

const close = document.querySelector('.close-viewer');
close.addEventListener('click', manageImageViewer);