// Fonction utilitaire pour vérifier si un nœud est directement dans un composant
function isDirectlyInComponent(node) {
    const parent = node.parent;
    return parent && (parent.type === 'COMPONENT' || parent.type === 'COMPONENT_SET' || parent.type === 'INSTANCE');
}

// Trouver tous les vecteurs sur la page
const allNodes = figma.currentPage.findAll(node => node.type === 'VECTOR');

// Filtrer les vecteurs qui ne sont PAS directement dans des composants ou des instances
const standaloneVectors = allNodes.filter(node => !isDirectlyInComponent(node));

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
