import { LitElement, html, css } from 'lit';
import '@dile/dile-icon/dile-icon';
import { deleteIcon } from '@dile/icons';

export class EitCompanyElement extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
            }
            article {
                display: flex;
                align-items: center;
                background-color: #eee;
                padding: 10px;
                margin-bottom: 10px;
            }
            main {
                flex-grow: 1;
            }
            span {
                cursor: pointer;
                color: blue;
            }
            .deleteicon {
                cursor: pointer;
                --dile-icon-size: 26px;
                --dile-icon-color: red;
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
                <main>
                    <span @click=${this.edit}>[Editar]</span>
                    <b>${this.company.name}</b>
                    <i>${this.company.vat_number}</i>
                </main>
                <aside>
                    <dile-icon class="deleteicon" .icon=${deleteIcon} @click=${this.delete}></dile-icon>
                </aside>
            </article>
        `;
    }

    edit() {
        this.dispatchEvent(new CustomEvent('edit-company', {
            detail: this.company
        }));
    }

    delete() {
        this.dispatchEvent(new CustomEvent('eit-company-element-delete', {
            detail: this.company
        }));
    }
}
customElements.define('eit-company-element', EitCompanyElement);
