let lastButtonElement = null;

function clickLastButton() {
    const buttonElements = document.querySelectorAll('.mat-mdc-tooltip-trigger.tts-button.mdc-icon-button.mat-mdc-icon-button.mat-unthemed.mat-mdc-button-base.gmat-mdc-button.ng-star-inserted');
    const latestButtonElement = buttonElements[buttonElements.length - 1];
    
    if (latestButtonElement && latestButtonElement !== lastButtonElement) {
        latestButtonElement.click();
        lastButtonElement = latestButtonElement;
    }
}

function observeMutations() {
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            clickLastButton();
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

observeMutations();
