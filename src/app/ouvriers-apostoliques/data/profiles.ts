export const profiles = [
  { id: 1, name: "Père Jean", ordained: "Ordonné prêtre le 08 septembre 2002'", role: "Diocésains", email: "jean@example.com", imageSrc: "/unknown.png", type: "Prêtre" },
  { id: 2, name: "Père Michel", ordained: "Ordonné en 2015", role: "Missionnaires", email: "michel@example.com", imageSrc: "/unknown.png", type: "Prêtre" },
  { id: 3, name: "Sœur Marie", ordained: "Profession en 2012", role: "Congrégation", email: "marie@example.com", imageSrc: "/unknown.png", type: "Sœur/Frère" },
  { id: 4, name: "Frère Paul", ordained: "Profession en 2018", role: "Lieu du travail", email: "paul@example.com", imageSrc: "/unknown.png", type: "Sœur/Frère" },
  { id: 5, name: "Séminariste André", ordained: "", role: "Philosophes", email: "andre@example.com", imageSrc: "/unknown.png", type: "Séminariste" },
  { id: 6, name: "Séminariste Thomas", ordained: "", role: "Théologiens", email: "thomas@example.com", imageSrc: "/unknown.png", type: "Séminariste" }
];

export const categories = ["Prêtre", "Sœur/Frère", "Séminariste"];

export const subCategories = {
  "Prêtre": ["Diocésains", "Missionnaires", "FIDEI DONUM", "Religieux"],
  "Sœur/Frère": ["Congrégation", "Lieu du travail", "Nombre"],
  "Séminariste": ["Propédeutes", "Philosophes", "Théologiens"]
};