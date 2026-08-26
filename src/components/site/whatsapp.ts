export const WHATSAPP_NUMBER = "917999469627";
export const WHATSAPP_DISPLAY = "+91 79994 69627";

export function waLink(message: string) {
  const params = new URLSearchParams({
    phone: WHATSAPP_NUMBER,
    text: message,
  });

  return `https://web.whatsapp.com/send?${params.toString()}`;
}
