import { LitElement, html, css } from 'lit';

export class EitCompanyElement extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
            }
            article {
                background-color: #eee;
                padding: 10px;
                margin-bottom: 10px;
            }
            span {
                cursor: pointer;
                color: blue;
            }
        `
    ];

    static get properties() {
      return {
        company: { type: Object }
      };
    }

    render() {
        return html`
            <article>
                <span @click=${this.edit}>[Editar]</span>
                <b>${this.company.name}</b>
                <i>${this.company.vat_number}</i>
            </article>
        `;
    }

    edit() {
        this.dispatchEvent(new CustomEvent('edit-company', {
            detail: this.company
        }));
    }
}
customElements.define('eit-company-element', EitCompanyElement);
