# yl-card-highlight


<!-- Auto Generated Below -->


## Properties

| Property      | Attribute           | Description                                                                            | Type     | Default                         |
| ------------- | ------------------- | -------------------------------------------------------------------------------------- | -------- | ------------------------------- |
| `headerLevel` | `data-header-level` | El nivel de <h?></h?> que se va a generar                                              | `number` | `2`                             |
| `image`       | `data-image`        | La imagen y sus variantes para cada vista. Es un objeto que viene en un encodedUri     | `string` | `encodeURI(JSON.stringify({}))` |
| `links`       | `data-links`        | Los links que se van a mostrar en la carpeta. Es un arreglo que viene en un encodedUri | `string` | `encodeURI(JSON.stringify([]))` |
| `position`    | `data-position`     | La posición de la imagen, pueder ser top \| bottom \| left \| right                    | `string` | `'top'`                         |


## Methods

### `exportHtml() => Promise<string>`

Exporta el componente a HTML para poder ser usado en cualquier lado con las mismas propiedades

#### Returns

Type: `Promise<string>`

Retorna el HTML del componente

### `manifest() => Promise<object>`

Exporta el manifest del componente para poder ser usado en el builder, devuelve un objeto con la siguiente estructura
{
name: string, (Nombre del componente)
title: string, (Titulo del componente)
preview: string, (url de la imagen)
category: string, (General, Formularios, etc)
initHTML: string (HTML minimo del componente)

#### Returns

Type: `Promise<object>`

Retorna el manifest del componente para poder ser usado en el builder


## Slots

| Slot            | Description             |
| --------------- | ----------------------- |
| `"description"` | La descripcion del card |
| `"title"`       | El titulo del card      |


## Shadow Parts

| Part            | Description                                         |
| --------------- | --------------------------------------------------- |
| `"description"` | Part de la descripcion para poder cambiar el estilo |
| `"link"`        | Part del link para poder cambiar el estilo          |
| `"title"`       | Part del titulo para poder cambiar el estilo        |


## CSS Custom Properties

| Name                                  | Description                        |
| ------------------------------------- | ---------------------------------- |
| `--yl-card-highlight-big-font-size`   | font size for the title.           |
| `--yl-card-highlight-font-family`     | font family used in the component. |
| `--yl-card-highlight-max-width`       | max width host element can reach.  |
| `--yl-card-highlight-small-font-size` | font size for the description.     |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
