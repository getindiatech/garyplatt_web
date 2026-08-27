import Section from "@/components/ui/Section";
import ExperienceCard from "@/components/ui/ExperienceCard";
import { EXPERIENCES } from "@/content/home";

export default function DesignedForEveryExperience() {
  return (
    <Section className="bg-white" id="services">
      <div className="px-gutter">
        <div className="mx-auto flex w-full max-w-[1680px] flex-col items-center gap-8 lg:gap-10">
          <div className="flex flex-col items-center gap-3 text-center lg:gap-5">
            <h2 className="font-display text-[clamp(2rem,2.6vw+1.1rem,3.75rem)] font-medium leading-tight text-[#0a0a0a]">
              Designed For Every Experience
            </h2>
            <p className="max-w-[762px] text-copy leading-normal text-[#0a0a0a]/60">
              Premium seating crafted for comfort, style, and performance ..
            </p>
          </div>

          <div className="grid w-full grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-10">
            {EXPERIENCES.map((item) => (
              <ExperienceCard key={item.title} {...item} />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
