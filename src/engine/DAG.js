export class DependencyGraph {
    constructor(modulesJson) {
        this.modules = {};
        this.adjacencyList = {}; // Node -> Array of Nodes it DEPENDS ON
        
        // Initialize graph
        modulesJson.forEach(mod => {
            this.modules[mod.id] = mod;
            this.adjacencyList[mod.id] = mod.requires || [];
        });
    }

    // Resolves all dependencies for a given set of selected node IDs
    resolveDependencies(selectedIds) {
        const resolved = new Set(selectedIds);
        let addedNew = true;

        while (addedNew) {
            addedNew = false;
            for (const id of resolved) {
                const deps = this.adjacencyList[id] || [];
                for (const dep of deps) {
                    if (!resolved.has(dep)) {
                        resolved.add(dep);
                        addedNew = true;
                    }
                }
            }
        }
        return Array.from(resolved);
    }

    // Topological Sort of the resolved nodes using Depth First Search (DFS)
    // Returns sorted array of module objects. Throws if a cycle is detected.
    topologicalSort(resolvedIds) {
        const result = [];
        const visited = new Set();
        const visiting = new Set();

        const visit = (id) => {
            if (visiting.has(id)) throw new Error(`Döngüsel Bağımlılık Tespit Edildi (Circular Dependency Detected): ${id}`);
            if (!visited.has(id)) {
                visiting.add(id);
                const deps = this.adjacencyList[id] || [];
                
                // We must process dependencies FIRST so they appear before the node that requires them.
                for (const dep of deps) {
                    if (resolvedIds.includes(dep)) {
                        visit(dep);
                    }
                }
                
                visiting.delete(id);
                visited.add(id);
                result.push(this.modules[id]);
            }
        };

        for (const id of resolvedIds) {
            visit(id);
        }

        return result;
    }
}
