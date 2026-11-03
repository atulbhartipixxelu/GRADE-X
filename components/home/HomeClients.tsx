import { Building2, Store, UtensilsCrossed, Users } from "lucide-react";
import { Button } from "@/components/ui/Button";

const sectors = [
  {
    n: "01",
    t: "Quick-service restaurant groups and franchisees",
    icon: UtensilsCrossed,
  },
  {
    n: "02",
    t: "Hotels and clubs",
    icon: Building2,
  },
  {
    n: "03",
    t: "Shopping centres",
    icon: Store,
  },
  {
    n: "04",
    t: "Facility managers who look after them",
    icon: Users,
  },
] as const;

export function HomeClients() {
  return (
    <section className="gx-clients" aria-labelledby="gx-clients-heading">
      <div className="gx-clients-inner">
        <header className="gx-clients-head" data-aos="fade-right">
          <div>
            <p className="gx-clients-kicker">Clients</p>
            <h2 id="gx-clients-heading">
              Who we already <em>work for.</em>
            </h2>
            <p>
              Quick-service restaurant groups and franchisees, hotels and clubs, shopping centres,
              and the facility managers who look after them.
            </p>
          </div>
          <Button href="/contact">Request a quote</Button>
        </header>

        <ul className="gx-clients-grid">
          {sectors.map((item, index) => (
            <li
              key={item.n}
              data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
              data-aos-delay={index * 70}
            >
              <span className="gx-clients-icon" aria-hidden>
                <item.icon strokeWidth={1.7} />
              </span>
              <b>{item.n}</b>
              <strong>{item.t}</strong>
            </li>
          ))}
        </ul>

        <div className="gx-clients-hold" data-aos="fade-up">
          <div className="gx-clients-slots" aria-hidden>
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
          <p className="gx-clients-note">
            Brand logos and named testimonials go here only with written permission. Until then, this
            row stays empty on purpose.
          </p>
          <p className="gx-clients-wait">Permission pending</p>
        </div>
      </div>
    </section>
  );
}
