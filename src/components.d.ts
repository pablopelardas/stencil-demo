/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface MyComponent {
        /**
          * The first name
         */
        "first": string;
        /**
          * The last name
         */
        "last": string;
        /**
          * The middle name
         */
        "middle": string;
    }
    interface YlCardHighlight {
        /**
          * Exporta el componente a HTML para poder ser usado en cualquier lado con las mismas propiedades
          * @returns Retorna el HTML del componente
         */
        "exportHtml": () => Promise<string>;
        /**
          * El nivel de <h?></h?> que se va a generar
         */
        "headerLevel": number;
        /**
          * La imagen y sus variantes para cada vista. Es un objeto que viene en un encodedUri
         */
        "image": string;
        /**
          * Los links que se van a mostrar en la carpeta. Es un arreglo que viene en un encodedUri
         */
        "links": string;
        /**
          * Exporta el manifest del componente para poder ser usado en el builder, devuelve un objeto con la siguiente estructura { name: string, (Nombre del componente) title: string, (Titulo del componente) preview: string, (url de la imagen) category: string, (General, Formularios, etc) initHTML: string (HTML minimo del componente)
          * @returns Retorna el manifest del componente para poder ser usado en el builder
         */
        "manifest": () => Promise<object>;
        /**
          * La posición de la imagen, pueder ser top | bottom | left | right
         */
        "position": string;
    }
}
declare global {
    interface HTMLMyComponentElement extends Components.MyComponent, HTMLStencilElement {
    }
    var HTMLMyComponentElement: {
        prototype: HTMLMyComponentElement;
        new (): HTMLMyComponentElement;
    };
    interface HTMLYlCardHighlightElement extends Components.YlCardHighlight, HTMLStencilElement {
    }
    var HTMLYlCardHighlightElement: {
        prototype: HTMLYlCardHighlightElement;
        new (): HTMLYlCardHighlightElement;
    };
    interface HTMLElementTagNameMap {
        "my-component": HTMLMyComponentElement;
        "yl-card-highlight": HTMLYlCardHighlightElement;
    }
}
declare namespace LocalJSX {
    interface MyComponent {
        /**
          * The first name
         */
        "first"?: string;
        /**
          * The last name
         */
        "last"?: string;
        /**
          * The middle name
         */
        "middle"?: string;
    }
    interface YlCardHighlight {
        /**
          * El nivel de <h?></h?> que se va a generar
         */
        "headerLevel"?: number;
        /**
          * La imagen y sus variantes para cada vista. Es un objeto que viene en un encodedUri
         */
        "image"?: string;
        /**
          * Los links que se van a mostrar en la carpeta. Es un arreglo que viene en un encodedUri
         */
        "links"?: string;
        /**
          * La posición de la imagen, pueder ser top | bottom | left | right
         */
        "position"?: string;
    }
    interface IntrinsicElements {
        "my-component": MyComponent;
        "yl-card-highlight": YlCardHighlight;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "my-component": LocalJSX.MyComponent & JSXBase.HTMLAttributes<HTMLMyComponentElement>;
            "yl-card-highlight": LocalJSX.YlCardHighlight & JSXBase.HTMLAttributes<HTMLYlCardHighlightElement>;
        }
    }
}
