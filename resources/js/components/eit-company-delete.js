import { LitElement, html, css } from 'lit';
import '@dile/dile-confirm/dile-confirm';

export class EitCompanyDelete extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
                --dile-confirm-accept-button-color: red;
                --dile-confirm-cancel-text-button-color: #303030;
                --dile-confirm-cancel-button-color: transparent;

            }
        `
    ];

    static get properties() {
      return {
        resourceId: { type: Number },
        endpoint: { type: String },
        resourceName: { type: String },
      };
    }
    
    firstUpdated() {
        this.elmodal = this.shadowRoot.getElementById('elmodal');
        this.elajaxdelete = this.shadowRoot.getElementById('elajaxdelete');
    }

    render() {
        return html`
            <dw-ajax
                id="elajaxdelete"
                url="${this.endpoint}/${this.resourceId}"
                method="delete"
            ></dw-ajax>
            <dile-confirm 
                id="elmodal" 
                cancelLabel="Cancelar"
                acceptLabel="Eliminar"
                @dile-confirm-accepted=${this.doDeleteCompany}
            >
                <p>
                    ¿De verdad deseas borrar esta ${this.resourceName}?
                </p>
            </dile-confirm> 
        `;
    }

    delete(companyId) {
        this.resourceId = companyId;
        this.elmodal.open();
    }

    doDeleteCompany() {
        this.elajaxdelete.generateRequest();
    }

}
customElements.define('eit-company-delete', EitCompanyDelete);
