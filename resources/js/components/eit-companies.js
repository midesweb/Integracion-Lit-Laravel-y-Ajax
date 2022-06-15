import { LitElement, html, css } from 'lit';
import '@dile/dile-modal/dile-modal';
import './eit-company-element';
import './eit-company-edit';
import './eit-company-form';
import './eit-company-insert';
import './eit-company-delete';

export class EitCompanies extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
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
        this.eldelete = this.shadowRoot.getElementById('eldelete');
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
            
            <eit-company-insert
                @eit-company-insert-success=${this.ajaxSuccess}
                @eit-company-insert-error=${this.ajaxError}
            ></eit-company-insert>

            <section>
                ${this.companies.map(company => html`
                    <eit-company-element 
                        .company=${company}
                        @edit-company=${this.editCompany}
                        @eit-company-element-delete=${this.deleteCompany}
                    ></eit-company-element>
                `)}
            </section>
                
            <eit-company-edit
                @ajax-success=${this.ajaxSuccess}
                @ajax-error=${this.ajaxError}
            ></eit-company-edit>

            <eit-company-delete
                id="eldelete"
                endpoint="/api/companies"
                resourceName="empresa"
                @ajax-success=${this.ajaxSuccess}
                @ajax-error=${this.ajaxError}
            ></eit-company-delete>
        `;
    }

    

    ajaxSuccess(e) {
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
        console.log(e.detail);
        this.shadowRoot.querySelector('eit-company-edit').edit(e.detail);
    }

    deleteCompany(e) {
        console.log('me estan pidiendo borrar', e.detail);
        this.eldelete.delete(e.detail.id);
    }
}
customElements.define('eit-companies', EitCompanies);
