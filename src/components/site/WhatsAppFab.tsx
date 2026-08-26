import { waLink } from "./whatsapp";
import { WhatsAppButton } from "./WhatsAppButton";

export function WhatsAppFab() {
  return (
    <WhatsAppButton
      href={waLink("Namaste Vishal Web World! Mujhe online service ki jaankari chahiye.")}
      size="lg"
      className="fixed bottom-5 right-5 z-50 animate-float"
    >
      <span className="hidden sm:inline">WhatsApp Now</span>
      <span className="sm:hidden">Chat</span>
    </WhatsAppButton>
  );
}
