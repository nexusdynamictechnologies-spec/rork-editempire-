export interface AppConfig {
  app: {
    name: string;
    version: string;
    platforms: string[];
    summary: string;
  };
}

export const appConfig: AppConfig = {
  app: {
    name: "NanoBanana-MVP",
    version: "0.9.0",
    platforms: ["ios", "android", "web"],
    summary: "All-in-one AI image editor: upload, edit anything by prompt, blend multiple images, upscale, and export."
  }
};
