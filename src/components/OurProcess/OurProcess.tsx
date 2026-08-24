import styles from "./OurProcess.module.css";

const STEPS = [
  {
    number: "01",
    title: "Consultation",
    body: "We begin with an in-depth consultation to understand your vision, lifestyle, and requirements.",
  },
  {
    number: "02",
    title: "Design",
    body: "Our designers create detailed proposals, material selections, and 3D visualizations for your approval.",
  },
  {
    number: "03",
    title: "Production",
    body: "Skilled craftsmen bring the designs to life using premium materials and meticulous attention to detail.",
  },
  {
    number: "04",
    title: "Delivery",
    body: "Professional installation and styling, ensuring every element is perfectly placed and finished.",
  },
];

export default function OurProcess() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.head}>
          <p className="eyebrow">How We Work</p>
          <h2 className={`sectionTitle ${styles.title}`}>Our Process</h2>
        </div>

        <div className={styles.grid}>
          {STEPS.map(({ number, title, body }) => (
            <article key={number}>
              <p className={styles.number}>{number}</p>
              <h3 className={styles.stepTitle}>{title}</h3>
              <p className={styles.stepBody}>{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
