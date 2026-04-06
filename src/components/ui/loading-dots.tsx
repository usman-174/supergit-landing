import { cn } from "@/lib/utils";

const LoadingDots = ({
  color = "black",
  style = "large",
}: {
  color?: string;
  style?: string;
}) => {
  return (
    <span
      className={cn("flex items-center justify-center", {
        "gap-1": style === "small",
        "gap-2": style === "large",
      })}
    >
      <span
        className={cn("rounded-full", {
          "h-1 w-1": style === "small",
          "h-2 w-2": style === "large",
          "animate-[bounce_1s_infinite]": true,
          "animation-delay-[-0.3s]": true,
        })}
        style={{ backgroundColor: color }}
      />
      <span
        className={cn("rounded-full", {
          "h-1 w-1": style === "small",
          "h-2 w-2": style === "large",
          "animate-[bounce_1s_infinite]": true,
          "animation-delay-[-0.15s]": true,
        })}
        style={{ backgroundColor: color }}
      />
      <span
        className={cn("rounded-full", {
          "h-1 w-1": style === "small",
          "h-2 w-2": style === "large",
          "animate-[bounce_1s_infinite]": true,
        })}
        style={{ backgroundColor: color }}
      />
    </span>
  );
};

export { LoadingDots };
