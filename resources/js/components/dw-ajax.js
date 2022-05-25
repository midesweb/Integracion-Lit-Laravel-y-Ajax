import { LitElement, html, css } from "lit";

export class DwAjax extends LitElement {
    static get properties() {
        return {
            data: { type: Object },
            method: { type: String },
            url: { type: String },
        };
    }

    constructor() {
        super();
        this.data = {};
        this.method = "post";
        this.url = "";
    }

    generateRequest() {
        let request;
        switch (this.method.toLowerCase().trim()) {
            case "post":
                request = axios.post(this.url, this.data);
                break;
            case "get":
                request = axios.get(this.url, this.data);
                break;
            case "put":
                request = axios.put(this.url, this.data);
                break;
            case "delete":
                request = axios.delete(this.url, this.data);
                break;
        }
        request
            .then((response) => {
                let res = response.data;
                if (res.error) {
                    this.dispatchError(res.data);
                } else {
                    this.dispatchSuccess(res.data);
                }
            })
            .catch((err) => {
                this.describeError(err);
            });
    }

    describeError(err) {
        if (err.response) {
            const status = err.response.status;
            switch (status) {
                case 401:
                    this.dispatchError(
                        "No autorizado. Quizás tu sesión haya caducado"
                    );
                    break;
                case 419:
                    this.dispatchError(
                        "Tu sesión ha caducado. Refresca la página"
                    );
                    break;
                case 502:
                    this.dispatchError(
                        "Error de conexión, puerta de enlace no válida"
                    );
                    break;
                case 504:
                    this.dispatchError(
                        "Timeout en conexión con la puerta de enlace"
                    );
                    break;
                default:
                    this.dispatchError(
                        "Acción no completada por error en el servidor"
                    );
            }
        } else {
            this.dispatchError("Respuesta no recibida del servidor");
        }
    }

    dispatchError(msg) {
        //console.log('ajax error', msg);
        this.dispatchEvent(
            new CustomEvent("ajax-error", {
                detail: msg,
            })
        );
    }

    dispatchSuccess(data) {
        //console.log('ajax error', msg);
        this.dispatchEvent(
            new CustomEvent("ajax-success", {
                detail: data,
            })
        );
    }
}
customElements.define("dw-ajax", DwAjax);
