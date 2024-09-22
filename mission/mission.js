const box = document.querySelector('#dropbox')
box.addEventListener('change', function(event) {
    changeTheme()
});

function changeTheme(){
    const img = document.querySelector('#logo')
    const selected_value = box.value
    if (selected_value == 'Dark'){
        document.body.style.cssText = 'color: whitesmoke; background-color: #333;';
        img.remove()
        const dark_img = document.createElement('img');
        dark_img.src = 'byui_logo_dark.png';
        dark_img.id = 'logo';
        dark_img.alt = 'BYUI Logo';
        dark_img.className = 'center';
        const footer = document.querySelector('footer')
        footer.append(dark_img)
    }else{
        document.body.style.cssText = 'color: black; background-color: white;';
        img.remove()
        const light_img = document.createElement('img');
        light_img.src = 'byui_logo.png';
        light_img.id = 'logo';
        light_img.alt = 'BYUI Logo';
        light_img.className = 'center';
        const footer = document.querySelector('footer')
        footer.append(light_img)
    }
}