/** Brand / contact details — poster creatives se standardised. */
export const business = {
  name: "Vishal Web World",
  tagline: "Your Trusted Digital Partner",
  taglineHi: "आपकी सुविधा, हमारा संकल्प",
  phone: "7999469627",
  phoneDisplay: "+91 79994 69627",
  phoneHref: "tel:+917999469627",
  email: "vishalwebworld99@gmail.com",
  website: "www.vishalwebworld.in",
  address: {
    line1: "Shop No. 3, In Front of Suraj Banarsi Dairy",
    line2: "Imaliya Mod, Pariyat, Panagar",
    city: "Jabalpur, Madhya Pradesh - 482001",
  },
  hours: "Monday - Sunday, 9:00 AM to 8:00 PM",
  promises: [
    "Vishwasniya seva",
    "Uchit shulk",
    "Samay par kaam",
    "Sahi margdarshan",
  ],
} as const;

export const addressLines = [
  business.address.line1,
  business.address.line2,
  business.address.city,
];

export const addressOneLine = addressLines.join(", ");
