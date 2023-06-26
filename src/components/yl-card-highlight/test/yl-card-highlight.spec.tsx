import { newSpecPage } from '@stencil/core/testing';
import { YlCardHighlight } from '../yl-card-highlight';

describe('yl-card-highlight internal logic', () => {
  it('builds', () => {
    expect(new YlCardHighlight()).toBeTruthy();
  })

  it('has default values', async () => {
    expect(new YlCardHighlight()).toEqual({
      headerLevel: 2,
      position: 'top',
      image: encodeURIComponent(JSON.stringify({})),
      links: encodeURIComponent(JSON.stringify([])),
      viewport: 'desktop',
    })
  })

  describe('decodeUri()', () => {
    it('decodes a URI-encoded string', () => {
      const component = new YlCardHighlight();
      const uri = 'https%3A%2F%2Fexample.com%2Fimage.jpg';
      const result = component['decodeUri'](uri);
      expect(result).toEqual('https://example.com/image.jpg');
    });
    it ('decodes an image object URI-encoded string', () => {
      const component = new YlCardHighlight();
      const uri = encodeURIComponent(JSON.stringify({
        src: 'https://example.com/image.jpg',
        alt: 'alt',
        desktop: 'https://example.com/image-desktop.jpg',
        tablet: 'https://example.com/image-tablet.jpg',
        mobile: 'https://example.com/image-mobile.jpg',
      }));
      const result = component['decodeUri'](uri);
      expect(result).toEqual(JSON.stringify({
        src: 'https://example.com/image.jpg',
        alt: 'alt',
        desktop: 'https://example.com/image-desktop.jpg',
        tablet: 'https://example.com/image-tablet.jpg',
        mobile: 'https://example.com/image-mobile.jpg',
      }));
    });
  });

  describe('getImageSrc()', () => {

    it('returns src when viewport is desktop', () => {
      const component = new YlCardHighlight();
      const imageData = {
        src: 'https://example.com/image.jpg',
        desktop: 'https://example.com/image-desktop.jpg',
      };
      const viewport = 'desktop';
      const result = component['getImageSrc'](imageData, viewport);
      expect(result).toEqual(imageData.desktop);
    });

    it('returns tablet when viewport is tablet', () => {
      const component = new YlCardHighlight();
      const imageData = {
        src: 'https://example.com/image.jpg',
        desktop: 'https://example.com/image-desktop.jpg',
        tablet: 'https://example.com/image-tablet.jpg',
      };
      const viewport = 'tablet';
      const result = component['getImageSrc'](imageData, viewport);
      expect(result).toEqual(imageData.tablet);
    });

    it('returns mobile when viewport is mobile', () => {
      const component = new YlCardHighlight();
      const imageData = {
        src: 'https://example.com/image.jpg',
        desktop: 'https://example.com/image-desktop.jpg',
        tablet: 'https://example.com/image-tablet.jpg',
        mobile: 'https://example.com/image-mobile.jpg',
      };
      const viewport = 'mobile';
      const result = component['getImageSrc'](imageData, viewport);
      expect(result).toEqual(imageData.mobile);
    });

    it('returns desktop when viewport is mobile and tablet is empty', () => {
      const component = new YlCardHighlight();
      const imageData = {
        src: 'https://example.com/image.jpg',
        desktop: 'https://example.com/image-desktop.jpg',
      };
      const viewport = 'mobile';
      const result = component['getImageSrc'](imageData, viewport);
      expect(result).toEqual(imageData.desktop);
    });

    it('returns tablet when viewport is tablet', () => {
      const component = new YlCardHighlight();
      const imageData = {
        src: 'https://example.com/image.jpg',
        desktop: 'https://example.com/image-desktop.jpg',
        tablet: 'https://example.com/image-tablet.jpg',
      };
      const viewport = 'tablet';
      const result = component['getImageSrc'](imageData, viewport);
      expect(result).toEqual(imageData.tablet);
    });

    it('returns src when viewport is mobile and tablet and desktop are empty', () => {
      const component = new YlCardHighlight();
      const imageData = {
        src: 'https://example.com/image.jpg',
      };
      const viewport = 'mobile';
      const result = component['getImageSrc'](imageData, viewport);
      expect(result).toEqual(imageData.src);
    });
  });

  describe('getHeader()', () => {
    it('returns h2 by default', () => {
      const component = new YlCardHighlight();
      const headerLevel = undefined;
      const result = component['getHeader'](headerLevel);
      expect(result).toEqual('<h2 class=title part="title"><slot name=\'title\'>Titulo</slot></h2>');
    });

    it('returns h1 when headerLevel is 1', () => {
      const component = new YlCardHighlight();
      const headerLevel = 1;
      const result = component['getHeader'](headerLevel);
      expect(result).toEqual('<h1 class=title part="title"><slot name=\'title\'>Titulo</slot></h1>');
    });

    it('returns h2 when headerLevel is 2', () => {
      const component = new YlCardHighlight();
      const headerLevel = 2;
      const result = component['getHeader'](headerLevel);
      expect(result).toEqual('<h2 class=title part="title"><slot name=\'title\'>Titulo</slot></h2>');
    });

    it('returns h3 when headerLevel is 3', () => {
      const component = new YlCardHighlight();
      const headerLevel = 3;
      const result = component['getHeader'](headerLevel);
      expect(result).toEqual('<h3 class=title part="title"><slot name=\'title\'>Titulo</slot></h3>');
    });
    it('returns h6 when headerLevel is bigger than 6', () => {
      const component = new YlCardHighlight();
      const headerLevel = 12;
      const result = component['getHeader'](headerLevel);
      expect(result).toEqual('<h6 class=title part="title"><slot name=\'title\'>Titulo</slot></h6>');
    });
  });

  describe('updateViewport()', () => {
    it('sets viewport to mobile when window width is less than 768px', () => {
      const component = new YlCardHighlight();
      const mobileQuery = {
        matches: true,
      };
      const tabletQuery = {
        matches: false,
      };
      window.matchMedia = jest.fn().mockImplementation((query) => {
        if (query === '(max-width: 768px)') {
          return mobileQuery;
        } else if (query === '(max-width: 1024px)') {
          return tabletQuery;
        }
      });
      component['updateViewport']();
      expect(component['viewport']).toEqual('mobile');
    });

    it('sets viewport to tablet when window width is between 768px and 1024px', () => {
      const component = new YlCardHighlight();
      const mobileQuery = {
        matches: false,
      };
      const tabletQuery = {
        matches: true,
      };
      window.matchMedia = jest.fn().mockImplementation((query) => {
        if (query === '(max-width: 768px)') {
          return mobileQuery;
        } else if (query === '(max-width: 1024px)') {
          return tabletQuery;
        }
      });
      component['updateViewport']();
      expect(component['viewport']).toEqual('tablet');
    });

    it('sets viewport to desktop when window width is greater than 1024px', () => {
      const component = new YlCardHighlight();
      const mobileQuery = {
        matches: false,
      };
      const tabletQuery = {
        matches: false,
      };
      window.matchMedia = jest.fn().mockImplementation((query) => {
        if (query === '(max-width: 768px)') {
          return mobileQuery;
        } else if (query === '(max-width: 1024px)') {
          return tabletQuery;
        }
      });
      component['updateViewport']();
      expect(component['viewport']).toEqual('desktop');
    });
  });
});

describe.only('yl-card-highlight rendering', () => {
  it('renders correctly with default props', async () => {
    const page = await newSpecPage({
      components: [YlCardHighlight],
      html: '<yl-card-highlight></yl-card-highlight>',
    });
    expect(page.root).toMatchSnapshot();
  });

  it('renders correctly with custom props', async () => {
    const page = await newSpecPage({
      components: [YlCardHighlight],
      html: `
      <yl-card-highlight data-header-level="1" data-position="top"
      data-image="%7B%22src%22%3A%22https%3A%2F%2Fth.bing.com%2Fth%2Fid%2FOIP.SMAmS1MxCpssY-raDGzy1wHaE7%3Fpid%3DImgDet%26rs%3D1%22%2C%22alt%22%3A%22imagen%20decorativa%22%7D"
      data-links="%5B%7B%22href%22%3A%22https%3A%2F%2Fapi.spotify.com%2Fv1%2Fartists%2F0OdUWJ0sBjDrqHygGUXeCF%22%2C%22label%22%3A%22Wilco%22%2C%22title%22%3A%22Wilco%22%7D%2C%7B%22href%22%3A%22https%3A%2F%2Fapi.spotify.com%2Fv1%2Fartists%2F7jy3rLJdDQY21OgRLCZ9sD%22%2C%22label%22%3A%22Tomas%22%2C%22title%22%3A%22Tomas%22%7D%5D">
      </yl-card-highlight>
      `,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('renders correctly with custom props and slot', async () => {
    const page = await newSpecPage({
      components: [YlCardHighlight],
      html: `
      <yl-card-highlight data-header-level="1" data-position="top"
    data-image="%7B%22src%22%3A%22https%3A%2F%2Fth.bing.com%2Fth%2Fid%2FOIP.SMAmS1MxCpssY-raDGzy1wHaE7%3Fpid%3DImgDet%26rs%3D1%22%2C%22alt%22%3A%22imagen%20decorativa%22%7D"
    data-links="%5B%7B%22href%22%3A%22https%3A%2F%2Fapi.spotify.com%2Fv1%2Fartists%2F0OdUWJ0sBjDrqHygGUXeCF%22%2C%22label%22%3A%22Wilco%22%2C%22title%22%3A%22Wilco%22%7D%2C%7B%22href%22%3A%22https%3A%2F%2Fapi.spotify.com%2Fv1%2Fartists%2F7jy3rLJdDQY21OgRLCZ9sD%22%2C%22label%22%3A%22Tomas%22%2C%22title%22%3A%22Tomas%22%7D%5D">
    <div slot=title>Header desde Slot</div>
    <div slot=description>Descripción desde Slot</div>
  </yl-card-highlight>
      `,
    })
    expect(page.root).toMatchSnapshot();
  });
});
