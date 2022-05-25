import { LitElement, html, css } from 'lit';
import '@dile/dile-toast/dile-toast';

export class EitFeedback extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
            }
        `
    ];

    constructor() {
        super();
        document.addEventListener('error-feedback', this.showError.bind(this));
        document.addEventListener('success-feedback', this.showSuccess.bind(this));
    }
    
    firstUpdated() {
        this.eltoast = this.shadowRoot.getElementById('myToast');
    }

    render() {
        return html`
            <dile-toast id="myToast" duration="5000"></dile-toast>
        `;
    }

    showError(e) {
        console.log('un errorrrr');
        this.eltoast.open(e.detail, 'error');
    }

    showSuccess(e) {
        this.eltoast.open(e.detail, 'success');
    }
}
customElements.define('eit-feedback', EitFeedback);
