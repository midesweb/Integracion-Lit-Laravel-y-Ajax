import { LitElement, html, css } from 'lit';
import '@dile/dile-input/dile-input'
import '@dile/dile-modal/dile-modal';
import './eit-company-element';
import './eit-company-edit';

export class EitCompanies extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
            }
            section {
                margin-bottom: 1.5rem;
            }
        `
    ];

    static get properties() {
      return {
        companies: { type: Array }
      };
    }

    constructor() {
        super();
        this.companies = [];
    }

    firstUpdated() {
        this.elajaxget = this.shadowRoot.getElementById('elajaxget');
        this.elajaxpost = this.shadowRoot.getElementById('elajaxpost');
        this.elajaxget.generateRequest();
    }

    render() {
        return html`
            <h2>Empresas</h2>
            <dw-ajax
                id="elajaxget"
                url="/api/companies"
                method="get"
                @ajax-success=${this.ajaxSuccessGet}
                @ajax-error=${this.ajaxError}
            ></dw-ajax>
            <dw-ajax
                id="elajaxpost"
                url="/api/companies"
                method="post"
                @ajax-success=${this.ajaxSuccessPost}
                @ajax-error=${this.ajaxError}
            ></dw-ajax>

            <section>
                <dile-input label="Nombre" name="name" id="name"></dile-input>
                <dile-input label="Cif" name="vat_number" id="vat_number"></dile-input>
                <dile-input label="Dirección" name="address" id="address"></dile-input>
                <button type="button" @click=${this.addCompany}>Crear</button>
            </section>

            <section>
                ${this.companies.map(company => html`
                    <eit-company-element 
                        .company=${company}
                        @edit-company=${this.editCompany}
                    ></eit-company-element>
                `)}
            </section>
                
            <eit-company-edit></eit-company-edit>
        `;
    }

    addCompany() {
        const name = this.shadowRoot.getElementById('name').value;
        const vat_number = this.shadowRoot.getElementById('vat_number').value;
        const address = this.shadowRoot.getElementById('address').value;
        this.elajaxpost.data = {
            name,
            vat_number,
            address
        }
        this.elajaxpost.generateRequest();
    }

    ajaxSuccessPost(e) {
        console.log('successs post!!!', e.detail);
        this.showFeedbackSuccess(e.detail);
        this.elajaxget.generateRequest();
    }

    ajaxSuccessGet(e) {
        this.companies = e.detail;
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

    editCompany(e) {
        this.shadowRoot.querySelector('eit-company-edit').edit(e.detail);
    }
}
customElements.define('eit-companies', EitCompanies);
