export function initSubscribeForm() {
    const form = document.getElementById('about-subscribe');
    if (!form) return;

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const input = form.querySelector('input[type="email"]');
        if (!input || !input.checkValidity()) {
            input?.focus();
            return;
        }

        console.log('Подписка:', input.value.trim());  // TODO: заменить на fetch
        form.reset();
    });
}