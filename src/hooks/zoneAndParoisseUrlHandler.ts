
export async function getZoneAndParoisse(){
    try {
        const currentUrl = new URL(window.location.href);
        const zone = currentUrl.searchParams.get("zone");
        // const paroisse = currentUrl.searchParams.get("paroisse");

        // if(zone && paroisse) {
        if(zone) {
            return { zone, success: true }; // { zone, paroisse, success: true };
        } else {
            return { zone: "DOUME", success: false }; //{ zone: "DOUME", paroisse: "Sacré-Cœur", success: false };
        }
    } catch(error) {
        console.error({ error: "Erreur lors de la récupération des données" });
        return { zone: "DOUME", success: false }; //{ zone: "DOUME", paroisse: "Sacré-Cœur", success: false };
    }
}