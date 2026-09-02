import Image from "next/image";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { CONFIGURATOR } from "@/content/about";

/** Dark configurator band, shared by the About and Gallery pages. */
export default function CustomConfigurator() {
  return (
    <Container className="pb-section">
      <div className="relative overflow-hidden bg-dark">
        <Image
          src="/images/about-configurator-bg.jpg"
          alt=""
          aria-hidden
          width={1680}
          height={376}
          className="absolute inset-0 size-full object-cover"
        />

        <div className="relative grid grid-cols-1 items-center gap-8 p-8 md:p-10 lg:grid-cols-[365fr_520fr_640fr] lg:gap-12">
          <Image
            src="/images/about-configurator-chair.png"
            alt="Configurable Gary Platt gaming chair"
            width={365}
            height={376}
            className="mx-auto h-auto w-[60%] max-w-[365px] object-contain lg:mx-0 lg:w-full"
          />

          <div>
            <p className="text-[clamp(1.125rem,0.8vw+0.9rem,1.5rem)] font-semibold leading-normal text-gold-deep">
              {CONFIGURATOR.eyebrow}
            </p>
            <h2 className="pt-2 text-[clamp(1.375rem,1.1vw+1rem,1.875rem)] font-semibold leading-tight text-white">
              {CONFIGURATOR.title}
            </h2>
            <p className="pt-3 text-copy leading-relaxed text-white">
              {CONFIGURATOR.body}
            </p>
            <Button
              href="/products/quote"
              icon="/images/icon-arrow-right-light.svg"
              className="mt-6"
            >
              {CONFIGURATOR.cta}
            </Button>
          </div>

          <ul className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3 lg:gap-x-10 lg:gap-y-10">
            {CONFIGURATOR.options.map((option) => (
              <li
                key={option}
                className="whitespace-nowrap text-[clamp(1rem,0.5vw+0.85rem,1.25rem)] font-medium leading-normal text-white"
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Container>
  );
}
