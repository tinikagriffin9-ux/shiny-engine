export default function CountriesSection() {
  const countries = [
    {
      flag: "🇰🇪",
      name: "Kenya",
      location: "Nairobi & major cities",
      image: "https://images.unsplash.com/photo-1611348586804-61bf6c080437?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=200",
      alt: "Nairobi Kenya cityscape",
      applications: "847",
      placed: "623",
      successRate: "74%",
      testId: "country-kenya"
    },
    {
      flag: "🇺🇬",
      name: "Uganda", 
      location: "Kampala & surrounding regions",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=200",
      alt: "Kampala Uganda urban landscape",
      applications: "524",
      placed: "398", 
      successRate: "76%",
      testId: "country-uganda"
    },
    {
      flag: "🇬🇭",
      name: "Ghana",
      location: "Accra, Kumasi & major cities",
      image: "https://images.unsplash.com/photo-1594736797933-d0ce2ba2ddd9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=200",
      alt: "Accra Ghana modern cityscape",
      applications: "672",
      placed: "489",
      successRate: "73%",
      testId: "country-ghana"
    },
    {
      flag: "🇳🇬",
      name: "Nigeria",
      location: "Lagos, Abuja & all states", 
      image: "https://images.unsplash.com/photo-1605640840605-14ac1855827b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=200",
      alt: "Lagos Nigeria business district skyline",
      applications: "1,204",
      placed: "921",
      successRate: "77%",
      testId: "country-nigeria"
    }
  ];

  return (
    <section id="countries" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6" data-testid="countries-title">
            Recruiting from East and West Africa
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="countries-description">
            We have established partnerships and processes in these key markets
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {countries.map((country, index) => (
            <div key={index} className="country-card bg-card p-6 rounded-2xl shadow-lg cursor-pointer" data-testid={country.testId}>
              <div className="text-center">
                <img 
                  src={country.image}
                  alt={country.alt}
                  className="w-full h-32 object-cover rounded-lg mb-4" 
                />
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {country.flag} {country.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {country.location}
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Applications:</span>
                    <span className="font-semibold text-foreground" data-testid={`${country.testId}-applications`}>
                      {country.applications}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Placed:</span>
                    <span className="font-semibold text-accent" data-testid={`${country.testId}-placed`}>
                      {country.placed}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Success Rate:</span>
                    <span className="font-semibold text-accent">{country.successRate}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
