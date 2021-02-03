getFileList();
const dialog = new mdc.dialog.MDCDialog(document.querySelector('.mdc-dialog'));
const buttons = document.querySelectorAll('.mdc-button');
for (const button of buttons) {
    mdc.ripple.MDCRipple.attachTo(button);
}
const topAppBar = new mdc.topAppBar.MDCTopAppBar(document.querySelector('.mdc-top-app-bar'));
dialog.listen('MDCDialog:opened', function() {
    // Assuming contentElement references a common parent element with the rest of the page's content
    contentElement.setAttribute('aria-hidden', 'true');
});
dialog.listen('MDCDialog:closing', function() {
    contentElement.removeAttribute('aria-hidden');
});