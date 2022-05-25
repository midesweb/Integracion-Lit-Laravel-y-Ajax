import { LitElement, html, css } from 'lit';


export class EitCompanies extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
            }
        `
    ];

    firstUpdated() {
        this.elajaxget = this.shadowRoot.getElementById('elajaxget');
        this.elajaxget.generateRequest();
    }

    render() {
        return html`
            <h2>Empresas</h2>
            <dw-ajax
                id="elajaxget"
                url="/api/companies"
                method="get"
                @ajax-success=${this.ajaxSuccess}
                @ajax-error=${this.ajaxError}
            ></dw-ajax>
        
        `;
    }

    ajaxSuccess(e) {
        console.log('successs!!!', e.detail);
        this.showFeedbackSuccess(e.detail);
    }
    
    ajaxError(e) {
        console.log('Errooooooor!!!', e.detail);
        this.showFeedbackError(e.detail);
    }

    showFeedbackError(msg) {
        this.dispatchEvent(new CustomEvent('error-feedback', {
            bubbles: true,
            composed: true,
            detail: msg
        }));
    }

    showFeedbackSuccess(data) {
        this.dispatchEvent(new CustomEvent('success-feedback', {
            bubbles: true,
            composed: true,
            detail: data
        }));
    }
}
customElements.define('eit-companies', EitCompanies);
