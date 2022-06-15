import { LitElement, html, css } from 'lit';
import '@dile/dile-select/dile-select';
import '@dile/dile-input/dile-input';

export class EitCompanyForm extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
                --dile-input-background-color: #cef;
            }
        `
    ];

    render() {
        return html`
            <dile-input label="Nombre" name="name" id="name"></dile-input>
            <dile-input label="Cif" name="vat_number" id="vat_number"></dile-input>
            <dile-input label="Dirección" name="address" id="address"></dile-input>
            <dile-select name="type" label="Tipo de empresa">
                <select slot="select">
                    <option value="provider">Proveedor</option>
                    <option value="customer">Cliente</option>
                    <option value="affiliate">Afiliado</option>
                </select>
            </dile-select>
        `;
    }

    getData() {
        const name = this.shadowRoot.getElementById('name').value;
        const vat_number = this.shadowRoot.getElementById('vat_number').value;
        const address = this.shadowRoot.getElementById('address').value;
        return {
            name,
            vat_number,
            address
        }
    }

    clear() {
        this.shadowRoot.querySelectorAll('dile-input').forEach(input => {
            input.value = '';
        });
    }

    setData(data) {
        this.shadowRoot.querySelectorAll('dile-input').forEach(input => {
            input.value = data[input.name];
        });
    }
}
customElements.define('eit-company-form', EitCompanyForm);
