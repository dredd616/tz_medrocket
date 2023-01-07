export const Loader = {
    node: null,
    init() {
        this.node = document.createElement('div')
        this.node.id = 'loader';
        this.node.classList.add('lds-ring')
        this.node.innerHTML = '<div></div><div></div><div></div><div></div>'
        document.body.appendChild(this.node)
    },
    show() {
        this.node.style.pointerEvents = 'all';
        this.node.style.opacity = '1';
    },
    hide() {
        this.node.style.pointerEvents = 'none';
        this.node.style.opacity = '0';
    }
}