let lastButtonElement = null;

async function clickLastButton() {
  const buttonElements = document.querySelectorAll('.mat-mdc-tooltip-trigger.tts-button.mdc-icon-button.mat-mdc-icon-button.mat-unthemed.mat-mdc-button-base.gmat-mdc-button.ng-star-inserted');
  const latestButtonElement = buttonElements[buttonElements.length - 1];

  if (latestButtonElement && latestButtonElement !== lastButtonElement) {
    await latestButtonElement.click(); // Use await for click action to finish
    lastButtonElement = latestButtonElement;
  }
}

function observeMutations() {
  const observer = new MutationObserver(async function(mutations) {
    for (const mutation of mutations) { // Loop through mutations
      await clickLastButton(); // Wait for each click to finish
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

observeMutations();
