export function initModal() {
    const dialog = document.getElementById('ask-question');
    if (!dialog) return;

    const openBtn = document.querySelector('[data-modal-open="ask-question"]');
    const closeBtn = dialog.querySelector('.modal__close');
    const form = dialog.querySelector('#ask-question-form');

    if (openBtn) {
        openBtn.addEventListener('click', () => dialog.showModal());
    }

    closeBtn?.addEventListener('click', () => dialog.close());

    dialog.addEventListener('click', (event) => {
        if (event.target === dialog) dialog.close();
    });

    form?.addEventListener('submit', (event) => {
        event.preventDefault();
        const data = Object.fromEntries(new FormData(form).entries());
        console.log('Заявка:', data);        // TODO: заменить на fetch
        form.reset();
        dialog.close();
    });
}