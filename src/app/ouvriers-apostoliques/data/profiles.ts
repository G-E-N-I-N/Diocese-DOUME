
import { createClient } from "@/utils/supabase/client";
const supabase = createClient();

export const ouvriersProfiles = async () => {
  const { data: zonesData } = await supabase.from('ouvriersApostoliques').select();
  return zonesData || [];
}

export const categories = ["Prêtre", "Sœur", "Frère", "Séminariste"];

export const subCategories = {
  "Prêtre": ["Diocésains", "FIDEI DONUM"],
  "Sœur": ["Congrégation"],
  "Frère": ["Congrégation"],
  "Séminariste": ["Propédeutes"]
};