package caves;

import java.util.*;

public class CaveExplorer {
    private final Cave cave;
    private final Set<String> visited;
    private final List<String> explorationLog;

    public CaveExplorer(Cave cave) {
        this.cave = cave;
        this.visited = new LinkedHashSet<>();
        this.explorationLog = new ArrayList<>();
    }

    public List<Chamber> findPath(Chamber start, Chamber target) {
        Map<Chamber, Chamber> parentMap = new HashMap<>();
        Queue<Chamber> queue = new LinkedList<>();

        queue.add(start);
        parentMap.put(start, null);

        while (!queue.isEmpty()) {
            Chamber current = queue.poll();
            visited.add(current.getName());
            log("Exploring: " + current.getName());

            if (current.equals(target)) {
                return reconstructPath(parentMap, target);
            }

            for (Passage passage : cave.getPassages()) {
                Chamber neighbor = null;
                if (passage.getFrom().equals(current)) {
                    neighbor = passage.getTo();
                } else if (passage.getTo().equals(current)) {
                    neighbor = passage.getFrom();
                }

                if (neighbor != null && !parentMap.containsKey(neighbor)) {
                    parentMap.put(neighbor, current);
                    queue.add(neighbor);
                }
            }
        }

        log("No path found to " + target.getName());
        return Collections.emptyList();
    }

    public void exploreAll(Chamber start) {
        Deque<Chamber> stack = new ArrayDeque<>();
        Set<Chamber> seen = new HashSet<>();

        stack.push(start);
        seen.add(start);

        while (!stack.isEmpty()) {
            Chamber current = stack.pop();
            visited.add(current.getName());
            log("Discovered: " + current.getName() +
                    " (volume: " + String.format("%.1f", current.getVolume()) + " m³)");

            for (Passage passage : cave.getPassages()) {
                Chamber neighbor = null;
                if (passage.getFrom().equals(current)) {
                    neighbor = passage.getTo();
                } else if (passage.getTo().equals(current)) {
                    neighbor = passage.getFrom();
                }

                if (neighbor != null && !seen.contains(neighbor)) {
                    seen.add(neighbor);
                    stack.push(neighbor);
                }
            }
        }
    }

    private List<Chamber> reconstructPath(Map<Chamber, Chamber> parentMap, Chamber target) {
        List<Chamber> path = new ArrayList<>();
        Chamber current = target;

        while (current != null) {
            path.add(current);
            current = parentMap.get(current);
        }

        Collections.reverse(path);
        log("Path found with " + path.size() + " chambers");
        return path;
    }

    private void log(String message) {
        explorationLog.add(message);
    }

    public Set<String> getVisited() {
        return Collections.unmodifiableSet(visited);
    }

    public List<String> getExplorationLog() {
        return Collections.unmodifiableList(explorationLog);
    }

    public static void main(String[] args) {
        Cave mammoth = new Cave("Mammoth Cave", 124.0);

        Chamber entrance = new Chamber("Entrance Hall", 15, 8, 20);
        Chamber crystal = new Chamber("Crystal Gallery", 25, 12, 30);
        Chamber river = new Chamber("Underground River", 10, 5, 50);
        Chamber cathedral = new Chamber("Cathedral Room", 40, 30, 35);

        entrance.addFormation(new Formation(Formation.Type.STALACTITE, 120, 5000));
        crystal.addFormation(new Formation(Formation.Type.COLUMN, 300, 15000));
        crystal.addFormation(new Formation(Formation.Type.HELICTITE, 15, 3000));
        cathedral.addFormation(new Formation(Formation.Type.FLOWSTONE, 200, 20000));

        mammoth.addChamber(entrance);
        mammoth.addChamber(crystal);
        mammoth.addChamber(river);
        mammoth.addChamber(cathedral);

        mammoth.addPassage(new Passage("Main Corridor", entrance, crystal,
                45, 3.0, Passage.Difficulty.EASY));
        mammoth.addPassage(new Passage("Narrow Squeeze", crystal, river,
                12, 0.8, Passage.Difficulty.DIFFICULT));
        mammoth.addPassage(new Passage("Grand Gallery", river, cathedral,
                80, 5.0, Passage.Difficulty.MODERATE));

        System.out.println(mammoth);
        System.out.println("Total passage length: " + mammoth.getTotalPassageLength() + "m");

        CaveExplorer explorer = new CaveExplorer(mammoth);
        List<Chamber> path = explorer.findPath(entrance, cathedral);

        System.out.println("\nPath from Entrance to Cathedral:");
        path.forEach(c -> System.out.println("  -> " + c.getName()));

        System.out.println("\nExploration log:");
        explorer.getExplorationLog().forEach(log -> System.out.println("  " + log));
    }
}
