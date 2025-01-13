// Fonction utilitaire pour vérifier si un nœud est dans un composant
function isInComponent(node) {
    let parent = node.parent;
    while (parent) {
        if (parent.type === 'COMPONENT' || parent.type === 'COMPONENT_SET' || parent.type === 'INSTANCE') {
            return true;
        }
        parent = parent.parent;
    }
    return false;
}

// Trouver tous les vecteurs sur la page
const allNodes = figma.currentPage.findAll(node => node.type === 'VECTOR');

// Filtrer les vecteurs qui ne sont PAS dans des composants ou des instances
const standaloneVectors = allNodes.filter(node => !isInComponent(node));

// Sélectionner automatiquement les vecteurs autonomes
figma.currentPage.selection = standaloneVectors;

// Afficher une notification avec le nombre de vecteurs sélectionnés
if (standaloneVectors.length === 0) {
    figma.notify("Aucun vecteur autonome trouvé !");
} else {
    figma.notify(`${standaloneVectors.length} vecteurs autonomes trouvés et sélectionnés !`);
}

// Fermer le plugin
figma.closePlugin();
