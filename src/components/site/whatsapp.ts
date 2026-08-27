export const WHATSAPP_NUMBER = "917999469627";
export const WHATSAPP_DISPLAY = "+91 79994 69627";

/**
 * A pre-filled WhatsApp chat link.
 *
 * `wa.me` is the only endpoint that behaves on both ends: on a phone it hands
 * the chat straight to the installed app with the message typed, and on a
 * desktop it forwards to WhatsApp Web (or the desktop app). The site used
 * `web.whatsapp.com/send` before, which is the desktop-web endpoint — on a
 * phone that has no app to hand off to, so the browser fell back to the OS
 * share sheet and the message never made it into a chat.
 *
 * The text is encoded with encodeURIComponent rather than URLSearchParams:
 * URLSearchParams writes spaces as "+", which some WhatsApp clients paste into
 * the message literally.
 */
export function waLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
