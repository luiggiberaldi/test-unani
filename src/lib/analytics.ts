declare global {
  interface Window {
    umami?: {
      track: (event: string, data?: Record<string, unknown>) => void;
    };
  }
}

export const track = (event: string, data?: Record<string, unknown>) => {
  try {
    window.umami?.track(event, data);
  } catch {
    // silently fail if umami not loaded
  }
};
