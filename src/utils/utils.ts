export function format(first: string, middle: string, last: string): string {
  return (first || '') + (middle ? ` ${middle}` : '') + (last ? ` ${last}` : '');
}

export function toAbsoluteUrl(path: string): string {
  let url = (window as any)["SITE_PAGES_URL"] || null;
  return url != null && path != ""
    ? path.replace(
        // eslint-disable-next-line
        /^((\.\/|\/)?(css\/|js\/|images\/|fonts\/|documents\/|videos\/))/gi,
        url + "$3"
      )
    : path;
}