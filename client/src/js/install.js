const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
//: Add an event handler to the `beforeinstallprompt` event
// to do that we will need to do the following steps
// 1. add an event listener to the window object
// 2. add a callback function to the event listener

window.addEventListener('beforeinstallprompt', (event) => {
    window.deferredPrompt = event;
    event.preventDefault();
    butInstall.removeAttribute('hidden');
    console.log('beforeinstallprompt working');
});

//: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
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
