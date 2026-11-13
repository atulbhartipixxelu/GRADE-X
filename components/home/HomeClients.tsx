import Image from "next/image";

type ClientLogo = {
  src: string;
  alt: string;
};

const clientLogos: ClientLogo[] = [];

export function HomeClients() {
  if (clientLogos.length === 0) return null;

  return (
    <section className="gx-clients" aria-labelledby="gx-clients-heading">
      <div className="gx-clients-inner">
        <header className="gx-clients-head">
          <div>
            <p className="gx-clients-kicker">Clients</p>
            <h2 id="gx-clients-heading">
              Who we work <em>with.</em>
            </h2>
          </div>
        </header>
        <ul className="gx-clients-grid">
          {clientLogos.map((logo) => (
            <li key={logo.src}>
              <Image
                src={logo.src}
                alt={logo.alt}
                width={160}
                height={64}
                className="object-contain"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
