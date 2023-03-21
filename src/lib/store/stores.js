import { writable } from "svelte/store";
import { browser } from "$app/environment";

const linksData = {
  titleLink: ["Github", "Youtube", "MEXIC0DE BLOG", "Whatsapp", "StackOverflow"],
  link: ["https://github.com/", "https://www.youtube.com/", "https://mexic0de-tuto.vercel.app/", "https://web.whatsapp.com/", "https://stackoverflow.com/"],
  imageLink:
    ["https://th.bing.com/th/id/R.49f81ba9c837e6b0abbb4601f88430c6?rik=leTBggQOAr2C4Q&pid=ImgRaw&r=0", "https://th.bing.com/th/id/OIP.NBCNmpWH3ylJGY_ydZnsVwHaEs?pid=ImgDet&rs=1", "https://phx02pap002files.storage.live.com/y4mzQYww794jQSgDlNHOY03GhO85ZSgnyo_VFF6aJLEmu_W2Rm4D5WebzaELkZtUr_fbmatZHxuho7FX6_CBTlP1r6cwYSiDW47znHltBdXj__dBuppsCpJ5_p3iylYLDcZSijoY1VOKHZ_0PVnr54IcDQA-fjhaSU5ZcfhDhNt1BNrzomGxEETIZT7qWNZ79pe?width=500&height=500&cropmode=none",
      "https://th.bing.com/th/id/R.cefeab3432af5dd14fa5e01ff20ecdfe?rik=STRb29P8CBVpmw&riu=http%3a%2f%2fwww.whatphone.net%2fwp-content%2fuploads%2f2016%2f01%2fwhatsapp-home.jpg&ehk=%2fBVO4bTJp55Z31njIwIuNl8Y%2b%2bXg%2bCRDKgBpT5RV6I8%3d&risl=&pid=ImgRaw&r=0", "https://th.bing.com/th/id/OIP.UyKbEGU1AljlUHnNX9dITQHaEK?pid=ImgDet&rs=1"],
};

const createLinkStore = (key) => {
  const storedValue = browser && (localStorage.getItem(key));
  const initialValue = storedValue !== null ? JSON.parse(storedValue) : linksData[key];

  const store = writable(initialValue);

  store.subscribe((value) => {
    browser && localStorage.setItem(key, JSON.stringify(value));
  });

  return store;
};

export const titleLink = createLinkStore("titleLink");
export const link = createLinkStore("link");
export const imageLink = createLinkStore("imageLink");
