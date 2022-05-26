import { LitElement, html, css } from 'lit';

export class EitCompanyEdit extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
            }
            h2 {
                margin-top: 0;
            }
        `
    ];

    firstUpdated() {
        this.elmodal = this.shadowRoot.getElementById('elmodal');
    }

    render() {
        return html`
            <dile-modal id="elmodal">
                <h2>Editar empresa</h2>
            </dile-modal>
        `;
    }

    edit(company) {
        this.elmodal.open();
    }
}
customElements.define('eit-company-edit', EitCompanyEdit);
