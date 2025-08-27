export default function StatsSection() {
  const stats = [
    { value: "2,847", label: "Applications Processed", testId: "stat-applications" },
    { value: "2,031", label: "Successful Placements", testId: "stat-placements" },
    { value: "21", label: "Days Avg. Processing", testId: "stat-processing" },
    { value: "156", label: "Partner Hospitals", testId: "stat-partners" },
  ];

  return (
    <section className="py-16 bg-card">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} data-testid={stat.testId}>
              <div className={`text-4xl font-bold mb-2 ${
                index === 0 ? 'text-primary' : 
                index === 1 ? 'text-accent' : 
                index === 2 ? 'text-secondary' : 
                'text-primary'
              }`}>
                {stat.value}
              </div>
              <p className="text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
