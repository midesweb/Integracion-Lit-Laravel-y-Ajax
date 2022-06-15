import { LitElement, html, css } from 'lit';
import '@dile/dile-select/dile-select';
import '@dile/dile-input/dile-input';
import { DileFormMixin } from '@dile/dile-form-mixin';

export class EitCompanyForm extends DileFormMixin(LitElement) {
    static styles = [
        css`
            :host {
                display: block;
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

    // getData() {
    //     const data = {};
    //     this.shadowRoot.querySelectorAll('[name]').forEach(element => {
    //         data[element.getAttribute('name')] = element.value;
    //     });
    //     return data;
    // }

    // clearData() {
    //     this.shadowRoot.querySelectorAll('[name]').forEach(element => {
    //         if(typeof element.clear === 'function') {
    //             element.clear();
    //         } else {
    //             element.value = '';
    //         }
    //     });
    // }

    // setData(data) {
    //     this.shadowRoot.querySelectorAll('[name]').forEach(element => {
    //         element.value = data[element.name];
    //     });
    // }
}
customElements.define('eit-company-form', EitCompanyForm);
