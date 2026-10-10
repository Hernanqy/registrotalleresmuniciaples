import {
  BookOpen,
  Clapperboard,
  Music,
  Palette,
  PencilRuler,
  PenTool,
} from "lucide-react";

const items = [
  { Icon: Palette, className: "art-bg-icon one", size: 90 },
  { Icon: Music, className: "art-bg-icon two", size: 82 },
  { Icon: BookOpen, className: "art-bg-icon three", size: 88 },
  { Icon: PenTool, className: "art-bg-icon four", size: 84 },
  { Icon: Clapperboard, className: "art-bg-icon five", size: 86 },
  { Icon: PencilRuler, className: "art-bg-icon six", size: 90 },
  { Icon: Palette, className: "art-bg-icon seven", size: 72 },
  { Icon: Music, className: "art-bg-icon eight", size: 74 },
];

export default function ArtBackground() {
  return (
    <div className="art-background" aria-hidden="true">
      {items.map(({ Icon, className, size }, index) => (
        <div key={index} className={className}>
          <Icon size={size} strokeWidth={1.6} />
        </div>
      ))}
    </div>
  );
}
