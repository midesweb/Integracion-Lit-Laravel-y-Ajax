import { LitElement, html, css } from 'lit';

export class EitCompanyInsert extends LitElement {
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

    firstUpdated() {
        this.elajaxpost = this.shadowRoot.getElementById('elajaxpost');
        this.insertForm = this.shadowRoot.getElementById('insertForm');
    }

    render() {
        return html`
            <dw-ajax
                id="elajaxpost"
                url="/api/companies"
                method="post"
                @ajax-success=${this.ajaxSuccessPost}
                @ajax-error=${this.ajaxError}
            ></dw-ajax>

            <section>
                <eit-company-form id="insertForm"></eit-company-form>
                <button type="button" @click=${this.addCompany}>Crear</button>
            </section>
        `;
    }

    addCompany() {
        const data = this.insertForm.getData();
        this.elajaxpost.data = data;
        this.elajaxpost.generateRequest();
    }

    ajaxError(e) {
        this.dispatchEvent(new CustomEvent('eit-company-insert-error', {
            detail: e.detail
        }));
    }

    ajaxSuccessPost(e) {
        this.insertForm.clear()
        this.dispatchEvent(new CustomEvent('eit-company-insert-success', {
            detail: e.detail
        }));
    }
}
customElements.define('eit-company-insert', EitCompanyInsert);
