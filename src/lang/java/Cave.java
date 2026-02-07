package caves;

import java.util.ArrayList;
import java.util.List;

public class Cave {
    private final String name;
    private final double depthMeters;
    private final List<Chamber> chambers;
    private final List<Passage> passages;

    public Cave(String name, double depthMeters) {
        this.name = name;
        this.depthMeters = depthMeters;
        this.chambers = new ArrayList<>();
        this.passages = new ArrayList<>();
    }

    public void addChamber(Chamber chamber) {
        chambers.add(chamber);
    }

    public void addPassage(Passage passage) {
        passages.add(passage);
    }

    public int getTotalChambers() {
        return chambers.size();
    }

    public double getTotalPassageLength() {
        return passages.stream()
                .mapToDouble(Passage::getLengthMeters)
                .sum();
    }

    public String getName() {
        return name;
    }

    public double getDepthMeters() {
        return depthMeters;
    }

    public List<Chamber> getChambers() {
        return List.copyOf(chambers);
    }

    public List<Passage> getPassages() {
        return List.copyOf(passages);
    }

    @Override
    public String toString() {
        return String.format("Cave[%s, depth=%.1fm, chambers=%d, passages=%d]",
                name, depthMeters, chambers.size(), passages.size());
    }
}
