"use client";

import {
  Banknote,
  Building2,
  Camera,
  ClipboardList,
  Clock,
  CreditCard,
  FileSearch,
  FileSignature,
  FileText,
  Fingerprint,
  Globe,
  GraduationCap,
  HandCoins,
  HeartPulse,
  Home,
  IdCard,
  Landmark,
  MapPin,
  MessageSquareText,
  Network,
  Phone,
  Printer,
  ScanLine,
  ScrollText,
  Search,
  ShieldCheck,
  Signal,
  Sprout,
  Users,
} from "lucide-react";

/**
 * Icons are looked up by name rather than passed in as components: the pages
 * that declare their chips are Server Components, and a React component is a
 * function, which cannot cross the server/client boundary as a prop.
 */
const ICONS = {
  Banknote,
  Building2,
  Camera,
  ClipboardList,
  Clock,
  CreditCard,
  FileSearch,
  FileSignature,
  FileText,
  Fingerprint,
  Globe,
  GraduationCap,
  HandCoins,
  HeartPulse,
  Home,
  IdCard,
  Landmark,
  MapPin,
  MessageSquareText,
  Network,
  Phone,
  Printer,
  ScanLine,
  ScrollText,
  Search,
  ShieldCheck,
  Signal,
  Sprout,
  Users,
} as const;

export type ChipIcon = keyof typeof ICONS;

export type ChipItem = { label: string; icon: ChipIcon };

export type StageChip = ChipItem & {
  /** Depth in px. Negative places the chip behind the copy — see below. */
  z: number;
  top: string;
  left: string;
};

/**
 * Chips drifting along the floor behind the copy.
 *
 * `z` is kept negative on purpose: a perspective projection pushes positive-Z
 * elements *outward* from the vanishing point, which walks anything near an
 * edge straight off the screen. Sitting them behind the front plane keeps them
 * inside the frame and lets the copy read as the nearest layer.
 */
export function StageChips({ chips }: { chips: readonly StageChip[] }) {
  return (
    <div aria-hidden="true" className="stage-depth hidden md:block">
      {chips.map(({ label, icon, z, top, left }) => {
        const Icon = ICONS[icon];
        return (
          <span
            key={label}
            className="chip-3d"
            style={{ top, left, ["--z" as string]: z, ...depthCue(z) }}
          >
            <Icon aria-hidden="true" />
            {label}
          </span>
        );
      })}
    </div>
  );
}

/**
 * Depth of field: the further back a chip sits, the dimmer and softer it gets.
 * Without this the chips all read as equally present and the stage looks like
 * flat stickers rather than a scene with air in it.
 */
function depthCue(z: number) {
  const depth = Math.min(1, Math.abs(z) / 480);
  return {
    ["--chip-opacity" as string]: (0.9 - depth * 0.35).toFixed(2),
    ["--chip-blur" as string]: `${(depth * 2.2).toFixed(1)}px`,
  };
}

/** Placement shared by every hero, so the scene composition stays consistent. */
const CHIP_SLOTS = [
  { z: -180, top: "88%", left: "7%" },
  { z: -300, top: "96%", left: "26%" },
  { z: -420, top: "90%", left: "46%" },
  { z: -240, top: "97%", left: "66%" },
  { z: -360, top: "86%", left: "80%" },
  { z: -140, top: "94%", left: "3%" },
] as const;

/** Pairs labelled icons with the shared slots, in order. */
export function chipsFrom(items: readonly ChipItem[]): StageChip[] {
  return items.slice(0, CHIP_SLOTS.length).map((item, index) => ({
    ...item,
    ...CHIP_SLOTS[index]!,
  }));
}
