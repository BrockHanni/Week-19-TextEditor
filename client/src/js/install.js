const butInstall = document.getElementById('buttonInstall');

window.addEventListener('beforeinstallprompt', (event) => {
    // this event is fired when the browser is ready to prompt the user to install the PWA, it then logs that it's working
    window.deferredPrompt = event;
    event.preventDefault();
    butInstall.removeAttribute('hidden');
    console.log('beforeinstallprompt working');
});

//: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    // this event is fired when the user clicks the install button, it then prompts the user to install the PWA
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
        return;
    }
    promptEvent.prompt();
    const result = await promptEvent.userChoice;
    if (result.outcome === 'accepted') {
        console.log('PWA setup accepted');
    } else {
        console.log('PWA setup rejected');
    }
    window.deferredPrompt = null;
    butInstall.setAttribute('hidden', true);
});

//: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    console.log('appinstalled working', event);
    window.deferredPrompt = null;
});
