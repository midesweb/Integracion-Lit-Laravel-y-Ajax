import { LitElement, html, css } from 'lit';

export class EitCompanyEdit extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
                --dile-modal-width: 90%;
                --dile-modal-close-icon-size: 32px;
                --dile-modal-close-icon-top: 20px;
                --dile-modal-close-icon-color: red;
            }
            h2 {
                margin-top: 0;
            }
        `
    ];

    static get properties() {
      return {
        resourceId: { type: Number }
      };
    }

    firstUpdated() {
        this.elmodal = this.shadowRoot.getElementById('elmodal');
        this.elajaxput = this.shadowRoot.getElementById('elajaxput');
        this.elform = this.shadowRoot.getElementById('elform');
    }

    render() {
        return html`
            <dw-ajax
                id="elajaxput"
                url="/api/companies/${this.resourceId}"
                method="put"
                @ajax-success=${this.ajaxSuccessPut}
            ></dw-ajax>
            <dile-modal id="elmodal" showCloseIcon blocking>
                <h2>Editar empresa</h2>
                <eit-company-form id="elform"></eit-company-form>
                <button type="button" @click=${this.updateCompany}>Actualizar</button>
            </dile-modal>
        `;
    }

    edit(company) {
        this.elform.setData(company);
        this.resourceId = company.id;
        this.elmodal.open();
    }

    updateCompany() {
        this.elajaxput.data = this.elform.getData();
        this.elajaxput.generateRequest();
    }

    ajaxSuccessPut(e) {
        this.elform.clearData();
        this.elmodal.close();
    }
}
customElements.define('eit-company-edit', EitCompanyEdit);
