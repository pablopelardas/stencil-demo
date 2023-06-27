import { Component, Host, h, Prop, State, Listen, Method, Element } from '@stencil/core';
import { toAbsoluteUrl } from '../../utils/utils';

type ImageData = {
  src?: string;
  alt?: string;
  desktop?: string;
  tablet?: string;
  mobile?: string;
}

type Links = {
  href: string;
  label: string;
  title: string;
}

/**
 * @slot title - El titulo del card
 * @slot description - La descripcion del card
 * @part title - Part del titulo para poder cambiar el estilo
 * @part description - Part de la descripcion para poder cambiar el estilo
 * @part link - Part del link para poder cambiar el estilo
 */

@Component({
  tag: 'yl-card-highlight',
  styleUrl: 'yl-card-highlight.css',
  shadow: true,
})
export class YlCardHighlight {

  private imageData: ImageData;
  private linksData: Links[];

  @Element() el: HTMLElement;

  @State() viewport: string = 'desktop';
  @Listen('resize', { target: 'window' })
  handleResize() {
    this.updateViewport();
  }

  /** El nivel de <h?></h?> que se va a generar */
  @Prop({ attribute: 'data-header-level' }) headerLevel: number = 2;
  /** La imagen y sus variantes para cada vista. Es un objeto que viene en un encodedUri */
  @Prop({ attribute: 'data-image', }) image: string = encodeURI(JSON.stringify({}));
  /** Los links que se van a mostrar en la carpeta. Es un arreglo que viene en un encodedUri */
  @Prop({ attribute: 'data-links', }) links: string = encodeURI(JSON.stringify([]));
  /** La posición de la imagen, pueder ser top | bottom | left | right */
  @Prop({ attribute: 'data-position', }) position: string = 'top';

  componentWillLoad() {
    this.imageData = this.image ? JSON.parse(this.decodeUri(this.image)) : {};
    let { src, desktop, tablet, mobile } = this.imageData;
    if (!src && !desktop && !tablet && !mobile) {
      this.imageData = {
        src: 'https://via.placeholder.com/300x300.png?text=Imagen+no+encontrada',
        alt: 'Imagen no encontrada',
        desktop: 'https://via.placeholder.com/300x300.png?text=Imagen+no+encontrada',
        tablet: 'https://via.placeholder.com/300x300.png?text=Imagen+no+encontrada',
        mobile: 'https://via.placeholder.com/300x300.png?text=Imagen+no+encontrada',
      }
    }
    this.linksData = this.links ? JSON.parse(this.decodeUri(this.links)) : [];
    this.updateViewport();
  }

  /**
   * Exporta el componente a HTML para poder ser usado en cualquier lado con las mismas propiedades
   * @returns Retorna el HTML del componente
   */
  @Method() async exportHtml(): Promise<string> {
    const titleSlot = this.el.querySelector('div[slot="title"]').textContent;
    const descriptionSlot = this.el.querySelector('div[slot="description"]').textContent;
    console.log(titleSlot)
    return `
      <yl-card-highlight
        data-header-level="${this.headerLevel}"
        data-position="${this.position}"
        data-image="${this.image}"
        data-links="${this.links}"
      >
        <div slot="title">${titleSlot}</div>
        <div slot="description">${descriptionSlot}</div>
      </yl-card-highlight>
    `;
  }

  /**
   * Exporta el manifest del componente para poder ser usado en el builder, devuelve un objeto con la siguiente estructura
   * {
   * name: string, (Nombre del componente)
   * title: string, (Titulo del componente)
   * preview: string, (url de la imagen)
   * category: string, (General, Formularios, etc)
   * initHTML: string (HTML minimo del componente)
   * @returns Retorna el manifest del componente para poder ser usado en el builder
   */
  @Method() async manifest(): Promise<object> {
    return {
      name: 'yl-card-highlight',
      title: 'Tarjeta Destacada',
      preview: 'https://via.placeholder.com/300x300.png?text=Imagen+no+encontrada',
      category: 'General',
      initHTML: `
        <yl-card-highlight
          data-header-level,
          data-position,
          data-image,
          data-links
        >
          <div slot="title">Titulo</div>
          <div slot="description">Descripcion</div>
        </yl-card-highlight>
        `
    }
  }


  render() {
    return (
      <Host
        class={{
          [this.position]: true,
        }}
      >
        <div class="cover">
          <img
            src={this.imageSrc(this.getImageSrc(this.imageData, this.viewport))}
            alt={this.imageData.alt}
          />
          <div>
            <span>{this.imageData.alt}</span>
          </div>
        </div>
        <div class="text">
          <div innerHTML={this.getHeader(this.headerLevel)}></div>
          <p class="description" part='description'><slot name='description'>Descripcion</slot></p>
          <ul>
            {this.linksData.map((link) => (
              <li class='link-item' part='link'>
                <a href={link.href} title={link.title}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </Host>
    );
  }

  private decodeUri(uri: string): string {
    return decodeURIComponent(uri);
  }

  private imageSrc(src: string): string {
    return toAbsoluteUrl(src);
  }

  private updateViewport() {
    const mobileQuery = window.matchMedia('(max-width: 768px)');
    const tabletQuery = window.matchMedia('(max-width: 1024px)');

    if (mobileQuery.matches) {
      this.viewport = 'mobile';
    } else if (tabletQuery.matches) {
      this.viewport = 'tablet';
    } else {
      this.viewport = 'desktop';
    }
  }

  private getImageSrc(imageData: ImageData, viewport: string): string {
    const { src, desktop, tablet, mobile } = imageData;
    if (!src && !desktop && !tablet && !mobile) return '';
    let imgSrc = imageData[viewport];
    if (!imgSrc) {
      if (viewport === 'mobile') {
        imgSrc = imageData.tablet || imageData.desktop || imageData.src;
      } else if (viewport === 'tablet') {
        imgSrc = imageData.desktop || imageData.src;
      } else {
        imgSrc = imageData.src;
      }
    }
    return imgSrc;
  }

  private getHeader(headerLevel: number = 2): string {
    if (headerLevel > 6) headerLevel = 6;
    return `<h${headerLevel} class=title part="title"><slot name='title'>Titulo</slot></h${headerLevel}>`;
  }
}