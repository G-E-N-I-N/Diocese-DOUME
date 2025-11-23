
export async function getZoneAndParoisse(){
    try {
        const currentUrl = new URL(window.location.href);
        const zone = currentUrl.searchParams.get("zone");

        if(zone) {
            return { zone, success: true };
        } else {
            return { zone: "DOUME", success: false };
        }
    } catch(error) {
        console.error({ error: "Erreur lors de la récupération des données" });
        return { zone: "DOUME", success: false };
    }
}