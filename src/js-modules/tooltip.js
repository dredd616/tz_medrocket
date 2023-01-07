export const Tooltip = {
    node: null,
    init() {
        this.node = document.createElement('div')
        this.node.id = 'tooltip';
        document.body.appendChild(this.node)
    },
    changeContent(content) {
        if (!this.node) return;
        this.node.textContent = content;
    },
    updatePosition(x, y) {
        this.node.style.transform = `translate(${x - 65}px, ${y + 31}px)`;
    },
    show() {
        this.node.style.display = 'block';
    },
    hide() {
        this.node.style.display = 'none';
    }
}