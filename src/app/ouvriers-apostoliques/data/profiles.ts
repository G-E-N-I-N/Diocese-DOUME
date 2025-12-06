
import { createClient } from "@/utils/supabase/client";
const supabase = createClient();

export const ouvriersProfiles = async () => {
  const { data: zonesData } = await supabase.from('ouvriersApostoliques').select();
  return zonesData || [];
}

export const categories = ["Prêtre", "Sœur/Frère", "Séminariste"];

export const subCategories = {
  "Prêtre": ["Diocésains", "Missionnaires", "FIDEI DONUM", "Religieux"],
  "Sœur/Frère": ["Congrégation", "Lieu du travail", "Nombre"],
  "Séminariste": ["Propédeutes", "Philosophes", "Théologiens"]
};