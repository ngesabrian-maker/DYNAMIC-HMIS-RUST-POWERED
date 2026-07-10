import type { RolePageConfig } from '../types/role';

type RolePageProps = RolePageConfig;

export function RolePage({ title, subtitle, summary, useCases, accent }: RolePageProps) {
  return (
    <section className="page-card">
      <div className="page-header" style={{ borderColor: accent }}>
        <div>
          <p className="eyebrow">Role dashboard</p>
          <h2>{title}</h2>
          <p className="page-subtitle">{subtitle}</p>
        </div>
        <span className="chip" style={{ backgroundColor: accent }}>
          {title}
        </span>
      </div>

      <p className="page-summary">{summary}</p>

      <div className="card-grid">
        {useCases.map((useCase) => (
          <article key={useCase.title} className="mini-card">
            <h3>{useCase.title}</h3>
            <p>{useCase.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
