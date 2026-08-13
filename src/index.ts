const openedWindows = new Map<string, Window>();

export function windowOpenOnce(windowName: string, url: string) {
  const existingWindow = openedWindows.get(windowName);

  if (existingWindow && !existingWindow.closed) {
    existingWindow.focus();
    return;
  }

  const newWindow = window.open(
    url,
    windowName
  );

  if (newWindow) {
    openedWindows.set(windowName, newWindow);
  }
}

// LAYOUT
export var screenResolutionFactor: number = 0;

export class ScreenResolutions {
  static xs = 600 - screenResolutionFactor;
  static sm = 960 - screenResolutionFactor;
  static md = 1280 - screenResolutionFactor;
  static lg = 1920 - screenResolutionFactor;
  static xl = 1921 - screenResolutionFactor;

  static getCurrent = (): ScreenResolutions => {
    let width = window.innerHeight;
    return width <= ScreenResolutions.xs
      ? ScreenResolutions.xs
      : width > ScreenResolutions.xs && width <= ScreenResolutions.sm
        ? ScreenResolutions.sm
        : width > ScreenResolutions.sm && width <= ScreenResolutions.md
          ? ScreenResolutions.md
          : width > ScreenResolutions.md && width <= ScreenResolutions.lg
            ? ScreenResolutions.lg
            : ScreenResolutions.xl;
  }
}

// BROWSER
export class BrowserUtils {
  static setCookie(cname: string, cvalue: string, exdays: number) {
    let d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  static getCookie(cname: string) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return null;
  }

  static deleteCookie(cname: string) {
    let d = new Date();
    d.setTime(d.getTime() - (24 * 60 * 60 * 1000)); // Define a data de expiração para um dia atrás
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=;" + expires + ";path=/";
  }

  static getCookieObj<T extends object>(cname: string): T | undefined {
    const resultStr = BrowserUtils.getCookie(cname)
    if (resultStr)
      return JSON.parse(resultStr) as T
    return undefined
  }
}